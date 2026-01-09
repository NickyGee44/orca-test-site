import { usePageMetadata } from "../hooks/usePageMetadata";

export function TermsPage() {
  usePageMetadata({
    title: "Terms of Service – Orca",
    description:
      "Orca's terms of service outlining the terms and conditions for using our platform."
  });

  return (
    <div className="space-y-8 sm:space-y-12">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-400 sm:text-base">
          Last updated: {new Date().getFullYear()}
        </p>
      </section>

      <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel sm:p-8">
        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-slate-300">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-50">
              Agreement to Terms
            </h2>
            <p>
              By accessing or using Orca's freight audit and analytics
              platform ("Service"), you agree to be bound by these Terms of
              Service ("Terms"). If you disagree with any part of these terms,
              you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-50">
              Use of Service
            </h2>
            <p>You agree to use the Service only for lawful purposes and in
            accordance with these Terms. You agree not to:</p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Attempt to gain unauthorized access to the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-50">
              Service Availability
            </h2>
            <p>
              We strive to maintain high availability of our Service but do not
              guarantee uninterrupted access. We reserve the right to modify,
              suspend, or discontinue the Service at any time with or without
              notice.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-50">
              Intellectual Property
            </h2>
            <p>
              The Service and its original content, features, and functionality
              are owned by Orca and are protected by international copyright,
              trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-50">
              Limitation of Liability
            </h2>
            <p>
              Orca shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use of or
              inability to use the Service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-50">
              Contact Us
            </h2>
            <p>
              If you have questions about these Terms, please contact us at{" "}
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

