/**
 * Authentication service for admin dashboard
 * Uses simple password authentication with JWT-like token stored in localStorage
 * In production, this should be replaced with proper server-side authentication
 */

const ADMIN_TOKEN_KEY = "orca_admin_token";
const ADMIN_TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export interface AdminSession {
  token: string;
  expiresAt: number;
}

/**
 * Simple password hash (for MVP - in production use proper bcrypt)
 * Password is stored in environment variable ADMIN_PASSWORD
 * For now, we'll use a simple comparison (in production, hash should be in env var)
 */
function hashPassword(password: string): string {
  // Simple hash for MVP - in production use proper hashing
  return btoa(password).split("").reverse().join("");
}

/**
 * Verify password against stored hash
 * In production, this should call a Netlify Function to verify
 */
export async function verifyPassword(password: string): Promise<boolean> {
  // For MVP, check against environment variable or default
  // In production, this should call /api/auth/login Netlify Function
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "orca2024";
  const hashedInput = hashPassword(password);
  const hashedStored = hashPassword(adminPassword);
  
  return hashedInput === hashedStored;
}

/**
 * Create admin session token
 */
function createToken(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return btoa(`${timestamp}-${random}`).replace(/[^a-zA-Z0-9]/g, "");
}

/**
 * Login and create session
 */
export async function login(password: string): Promise<{ success: boolean; error?: string }> {
  const isValid = await verifyPassword(password);
  
  if (!isValid) {
    return { success: false, error: "Invalid password" };
  }

  const session: AdminSession = {
    token: createToken(),
    expiresAt: Date.now() + ADMIN_TOKEN_EXPIRY
  };

  localStorage.setItem(ADMIN_TOKEN_KEY, JSON.stringify(session));
  return { success: true };
}

/**
 * Logout and clear session
 */
export function logout(): void {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const sessionStr = localStorage.getItem(ADMIN_TOKEN_KEY);
  if (!sessionStr) return false;

  try {
    const session: AdminSession = JSON.parse(sessionStr);
    const now = Date.now();
    
    if (now > session.expiresAt) {
      logout();
      return false;
    }

    return true;
  } catch {
    logout();
    return false;
  }
}

/**
 * Get current session token
 */
export function getSessionToken(): string | null {
  if (!isAuthenticated()) return null;
  
  const sessionStr = localStorage.getItem(ADMIN_TOKEN_KEY);
  if (!sessionStr) return null;

  try {
    const session: AdminSession = JSON.parse(sessionStr);
    return session.token;
  } catch {
    return null;
  }
}
