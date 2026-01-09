import { usePageMetadata } from "../hooks/usePageMetadata";

export function PrivacyPage() {
  usePageMetadata({
    title: "Privacy Policy – Orca",
    description:
      "Orca's privacy policy outlining how we collect, use, and protect your data."
  });

  return (
    <div className="space-y-8 sm:space-y-12">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-400 sm:text-base">
          Last updated: {new Date().getFullYear()}
        </p>
      </section>

      <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel sm:p-8">
        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-slate-300">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-50">
              Introduction
            </h2>
            <p>
              Orca ("we," "our," or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our freight
              audit and analytics platform and visit our website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-50">
              Information We Collect
            </h2>
            <p>We collect information that you provide directly to us:</p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Contact information (name, email, phone, company)</li>
              <li>Business information (freight spend, modes, network details)</li>
              <li>Account credentials and preferences</li>
              <li>Freight data and invoices processed through our platform</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-50">
              How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Provide, operate, and maintain our freight audit services</li>
              <li>Process and audit freight invoices</li>
              <li>Generate analytics and insights</li>
              <li>Communicate with you about our services</li>
              <li>Improve our platform and develop new features</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-50">
              Data Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your
              data, including encryption, access controls, and regular security
              audits. We are SOC 2 compliant and follow best practices for data
              protection.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-50">
              Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, please contact us
              at{" "}
              <a
                href="/contact"
                className="text-cyan-400 hover:text-cyan-300"
              >
                our contact page
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

