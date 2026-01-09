import { useState } from "react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { usePageContent } from "../hooks/usePageContent";
import { trackDemoRequest, trackCTAClick } from "../utils/analytics";
import { saveContactSubmission } from "../services/contactService";
import type { ContactInfoSection, TestimonialSection } from "../types/content";

export function ContactPage() {
  usePageMetadata({
    title: "Contact Orca – Book a Freight Audit Demo",
    description:
      "Share a bit about your freight network and goals, and we'll follow up with a focused Orca demo tailored to your profile."
  });

  const { getSection, isLoading: contentLoading } = usePageContent({
    pageId: "contact"
  });

  // Get sections with safe defaults
  const hero = getSection<{ title: string; description: string }>("hero", { title: "", description: "" });
  const whatHappensNext = getSection<string[]>("whatHappensNext", []);
  const contactInfo = getSection<ContactInfoSection>("contactInfo", {});
  const testimonial = getSection<TestimonialSection>("testimonial", { quote: "", author: "", company: "" });

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    email: "",
    phone: "",
    freightModes: "",
    approximateSpend: "",
    message: ""
  });
  // Honeypot field for spam protection (should remain empty for humans)
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    trackDemoRequest("contact_page");
    trackCTAClick("Request demo", "contact_form");

    const result = await saveContactSubmission({
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone || undefined,
      role: formData.role || undefined,
      freightModes: formData.freightModes ? formData.freightModes.split(",").map(m => m.trim()) : undefined,
      approximateSpend: formData.approximateSpend || undefined,
      message: formData.message || "Demo request from contact form"
    }, { website: honeypot });

    if (result.success) {
      setSubmitMessage({ type: "success", text: "Thank you! We'll be in touch soon." });
      // Reset form
      setFormData({
        name: "",
        company: "",
        role: "",
        email: "",
        phone: "",
        freightModes: "",
        approximateSpend: "",
        message: ""
      });
      setHoneypot("");
    } else {
      setSubmitMessage({ type: "error", text: result.error || "Failed to submit. Please try again." });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      <section className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
          {hero.title || "Book a demo"}
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
          {hero.description || "Tell us a bit about your network and goals. We'll follow up with a focused walkthrough of Orca tailored to your freight profile."}
        </p>
      </section>

      <div className="mx-auto max-w-2xl">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)]">
          <form onSubmit={handleSubmit} className="space-y-4 glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel sm:p-8">
            {/* Honeypot spam field: hidden from humans, bots often fill */}
            <div className="hidden">
              <label className="block mb-1 text-xs font-medium text-slate-300">
                Website
              </label>
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-300">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-300">
                  Company *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-cyan-400"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-300">
                  Role
                </label>
                <input
                  type="text"
                  placeholder="e.g., VP Logistics, Director Finance"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-300">
                  Work email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-cyan-400"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-slate-300">
                Phone (optional)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-slate-300">
                Freight modes *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., LTL, FTL, parcel, ocean/air"
                value={formData.freightModes}
                onChange={(e) => setFormData({ ...formData, freightModes: e.target.value })}
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-slate-300">
                Approximate annual freight spend
              </label>
              <select
                value={formData.approximateSpend}
                onChange={(e) => setFormData({ ...formData, approximateSpend: e.target.value })}
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-cyan-400"
              >
                <option value="">Select range</option>
                <option value="Under $1M">Under $1M</option>
                <option value="$1M - $10M">$1M - $10M</option>
                <option value="$10M - $50M">$10M - $50M</option>
                <option value="$50M - $100M">$50M - $100M</option>
                <option value="Over $100M">Over $100M</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-slate-300">
                Additional context
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your current freight audit process, pain points, or goals..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full resize-none rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-cyan-400"
              />
            </div>
            {submitMessage && (
              <div
                className={`rounded-md px-4 py-2 text-sm ${
                  submitMessage.type === "success"
                    ? "bg-green-500/10 text-green-300 border border-green-500/30"
                    : "bg-red-500/10 text-red-300 border border-red-500/30"
                }`}
              >
                {submitMessage.text}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-button bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-orca-glow-cyan transition hover:shadow-orca-glow-purple disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Request demo"}
            </button>
            <p className="text-[11px] text-slate-500">
              We&apos;ll only use your information to follow up about Orca. No
              spam, no endless nurture sequences.
            </p>
          </form>

          <div className="space-y-6">
            {whatHappensNext.length > 0 && (
            <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-5 shadow-orca-panel">
              <h2 className="mb-3 text-base font-semibold text-slate-50">
                What happens next?
              </h2>
              <ul className="space-y-2 text-xs text-slate-300">
                  {whatHappensNext.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-0.5 text-cyan-400">{idx + 1}.</span>
                      <span>{step}</span>
                </li>
                  ))}
              </ul>
            </div>
            )}
            {(contactInfo.email || contactInfo.supportEmail || contactInfo.phone) && (
            <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-5 shadow-orca-panel">
              <h2 className="mb-3 text-base font-semibold text-slate-50">
                Other ways to reach us
              </h2>
              <div className="space-y-3 text-xs text-slate-300">
                  {contactInfo.email && (
                <div>
                  <div className="mb-1 font-medium text-slate-400">Email</div>
                  <a
                        href={`mailto:${contactInfo.email}`}
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                        {contactInfo.email}
                  </a>
                </div>
                  )}
                  {contactInfo.supportEmail && (
                <div>
                  <div className="mb-1 font-medium text-slate-400">Support</div>
                  <a
                        href={`mailto:${contactInfo.supportEmail}`}
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                        {contactInfo.supportEmail}
                  </a>
                </div>
                  )}
                  {contactInfo.phone && (
                <div>
                  <div className="mb-1 font-medium text-slate-400">Phone</div>
                  <a
                        href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                        {contactInfo.phone}
                  </a>
                </div>
                  )}
                  {contactInfo.address && (
                    <div>
                      <div className="mb-1 font-medium text-slate-400">Address</div>
                      <div className="text-slate-300">{contactInfo.address}</div>
                    </div>
                  )}
              </div>
            </div>
            )}
            {testimonial && testimonial.quote && (
            <div className="rounded-tile border border-slate-800/70 bg-slate-950/60 p-4">
              <p className="mb-2 text-xs italic text-slate-300">
                  &quot;{testimonial.quote}&quot;
              </p>
              <p className="text-[11px] text-slate-400">
                  — {testimonial.author}{testimonial.company ? `, ${testimonial.company}` : ""}
              </p>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
