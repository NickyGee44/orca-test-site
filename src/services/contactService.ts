/**
 * Contact service for managing contact form submissions
 */

import type { ContactSubmission } from "../types/content";

const CONTACT_SUBMISSIONS_KEY = "orca_contact_submissions";
const CONTACT_API_ENDPOINT = "/api/contact";

export interface ContactLeadPayload {
  name: string;
  company: string;
  email: string;
  phone?: string;
  role?: string;
  freightModes?: string[];
  approximateSpend?: string;
  message?: string;
  /**
   * Honeypot field. Should be empty for humans.
   * Bots often fill hidden fields; server treats non-empty as spam.
   */
  website?: string;
  /**
   * Optional Cloudflare Turnstile token.
   * Only verified if server has TURNSTILE_SECRET_KEY configured.
   */
  turnstileToken?: string;
}

/**
 * Get all contact submissions
 */
export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const stored = localStorage.getItem(CONTACT_SUBMISSIONS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading contact submissions:", error);
  }
  return [];
}

/**
 * Save contact submission
 */
export async function saveContactSubmission(
  submission: Omit<ContactSubmission, "id" | "submittedAt" | "status">,
  options?: { website?: string; turnstileToken?: string }
): Promise<{ success: boolean; error?: string; id?: string }> {
  try {
    // First: attempt to send to serverless API (Azure Functions / Netlify / etc.)
    // If it fails (local dev), we fall back to localStorage persistence.
    try {
      const payload: ContactLeadPayload = {
        name: submission.name,
        company: submission.company,
        email: submission.email,
        phone: submission.phone,
        role: submission.role,
        freightModes: submission.freightModes,
        approximateSpend: submission.approximateSpend,
        message: submission.message,
        website: options?.website,
        turnstileToken: options?.turnstileToken
      };

      const resp = await fetch(CONTACT_API_ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });

      // If API responded, treat 200/202 as success
      if (!resp.ok) {
        const data = await resp.json().catch(() => null);
        // Include useful debugging info without exposing secrets
        throw new Error(
          data?.error ? `api_error:${data.error}` : `api_http_${resp.status}`
        );
      }
    } catch (apiError) {
      console.warn("Contact API unavailable, falling back to localStorage:", apiError);
    }

    const submissions = await getContactSubmissions();
    
    const newSubmission: ContactSubmission = {
      ...submission,
      id: `contact-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: "new"
    };

    submissions.unshift(newSubmission);
    localStorage.setItem(CONTACT_SUBMISSIONS_KEY, JSON.stringify(submissions));
    
    return { success: true, id: newSubmission.id };
  } catch (error) {
    console.error("Error saving contact submission:", error);
    return { success: false, error: "Failed to save submission" };
  }
}

/**
 * Update submission status
 */
export async function updateSubmissionStatus(
  id: string,
  status: ContactSubmission["status"],
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const submissions = await getContactSubmissions();
    const submission = submissions.find(s => s.id === id);
    
    if (!submission) {
      return { success: false, error: "Submission not found" };
    }

    submission.status = status;
    if (notes !== undefined) {
      submission.notes = notes;
    }

    localStorage.setItem(CONTACT_SUBMISSIONS_KEY, JSON.stringify(submissions));
    // In production: await fetch(`/api/contact/${id}`, { method: 'PUT', body: JSON.stringify(submission) });
    
    return { success: true };
  } catch (error) {
    console.error("Error updating submission:", error);
    return { success: false, error: "Failed to update submission" };
  }
}

/**
 * Delete submission
 */
export async function deleteSubmission(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const submissions = await getContactSubmissions();
    const filtered = submissions.filter(s => s.id !== id);
    localStorage.setItem(CONTACT_SUBMISSIONS_KEY, JSON.stringify(filtered));
    // In production: await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    return { success: true };
  } catch (error) {
    console.error("Error deleting submission:", error);
    return { success: false, error: "Failed to delete submission" };
  }
}
