import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Afrika Ikalafe Pluriversity",
  description:
    "Enrolment terms, participant conditions, and refund policy for Afrika Ikalafe Pluriversity programmes.",
  alternates: {
    canonical: "https://womb.afrikaikalafe.org/terms",
  },
};

export default function TermsPage() {
  const lastUpdated = "9 April 2026";

  return (
    <main className="pb-24 bg-[var(--color-bg)]">
      {/* Header Section */}
      <header className="bg-[var(--color-surface)] border-b border-[var(--border-subtle)] pt-24 pb-16 text-center mb-16">
        <div className="container container--narrow">
          <span className="eyebrow inline-block mb-4">Afrika Ikalafe Pluriversity</span>
          <h1 className="mb-4 text-[var(--text-display-l)]">Terms &amp; Conditions</h1>
          <p className="text-[var(--text-body-s)] text-[var(--color-text-muted)] uppercase tracking-[var(--tracking-wide)]">
            Last updated: {lastUpdated}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container container--narrow">
        
        {/* Quick Nav */}
        <nav className="p-6 md:p-8 mb-12 bg-[var(--color-surface-alt)] border border-[var(--border-subtle)] rounded-[var(--radius-m)]">
          <p className="text-[var(--text-label)] tracking-[var(--tracking-wide)] text-[var(--color-clay)] font-medium uppercase mb-4">
            Jump to section
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 list-none p-0 m-0">
            <li><a href="#acceptance" className="text-[var(--color-text)] hover:text-[var(--color-action)] text-[var(--text-body-s)] font-medium">01. Acceptance</a></li>
            <li><a href="#enrolment" className="text-[var(--color-text)] hover:text-[var(--color-action)] text-[var(--text-body-s)] font-medium">02. Enrolment</a></li>
            <li><a href="#programme" className="text-[var(--color-text)] hover:text-[var(--color-action)] text-[var(--text-body-s)] font-medium">03. Programme Delivery</a></li>
            <li><a href="#conduct" className="text-[var(--color-text)] hover:text-[var(--color-action)] text-[var(--text-body-s)] font-medium">04. Participant Conduct</a></li>
            <li><a href="#intellectual-property" className="text-[var(--color-text)] hover:text-[var(--color-action)] text-[var(--text-body-s)] font-medium">05. Intellectual Property</a></li>
            <li><a href="#liability" className="text-[var(--color-text)] hover:text-[var(--color-action)] text-[var(--text-body-s)] font-medium">06. Liability</a></li>
            <li><a href="#refund-policy" className="text-[var(--color-text)] hover:text-[var(--color-action)] text-[var(--text-body-s)] font-medium">07. Refund Policy</a></li>
            <li><a href="#governing-law" className="text-[var(--color-text)] hover:text-[var(--color-action)] text-[var(--text-body-s)] font-medium">08. Governing Law</a></li>
          </ul>
        </nav>

        {/* Intro */}
        <div className="p-6 md:p-8 mb-16 bg-[var(--color-surface)] border-l-4 border-[var(--color-clay)] rounded-r-[var(--radius-s)] shadow-[var(--shadow-s)]">
          <p className="m-0 text-[1.125rem] leading-[1.8] text-[var(--color-text-muted)] italic font-[family-name:var(--font-display)]">
            Please read these Terms and Conditions carefully before enrolling in
            any programme offered by Afrika Ikalafe Pluriversity. By completing
            your enrolment and payment, you agree to be bound by these terms in
            full. If you do not agree, please do not proceed with enrolment.
          </p>
        </div>

        {/* Legal Sections */}
        <div className="space-y-16">
          
          {/* 1. Acceptance */}
          <section id="acceptance" className="scroll-mt-24">
            <span className="text-[var(--text-label)] font-medium text-[var(--color-clay)] tracking-[var(--tracking-wider)] uppercase mb-2 block">01</span>
            <h2 className="text-[var(--text-display-m)] mb-6 pb-4 border-b border-[var(--border-subtle)]">Acceptance of Terms</h2>
            <p className="mb-4">
              These Terms and Conditions (&quot;Terms&quot;) govern your participation in
              programmes offered by <strong>Afrika Ikalafe Pluriversity</strong>,
              a South African organisation (&quot;the Pluriversity&quot;, &quot;we&quot;, &quot;us&quot;).
            </p>
            <p className="mb-4">
              By enrolling in a programme, you confirm that you are at least 18
              years of age (or have the consent of a parent or guardian), and
              that you accept these Terms in full.
            </p>
            <p className="mb-4">
              We reserve the right to update these Terms at any time. Enrolled
              participants will be notified of material changes by email.
            </p>
          </section>

          {/* 2. Enrolment */}
          <section id="enrolment" className="scroll-mt-24">
            <span className="text-[var(--text-label)] font-medium text-[var(--color-clay)] tracking-[var(--tracking-wider)] uppercase mb-2 block">02</span>
            <h2 className="text-[var(--text-display-m)] mb-6 pb-4 border-b border-[var(--border-subtle)]">Enrolment &amp; Payment</h2>
            <p className="mb-4">
              Enrolment in a programme is confirmed only upon receipt of full
              payment (or first instalment, where a payment plan is offered) via
              our authorised payment gateway, <strong>Paystack</strong>.
            </p>
            <ul className="list-disc ml-6 space-y-2 text-[var(--color-text-muted)]">
              <li>Prices are presented in your selected regional currency. Exchange rate fluctuations are at your own risk.</li>
              <li>Payment plans (where available) require all instalments to be completed before or by the programme midpoint to maintain active participation.</li>
              <li>If a payment plan instalment fails and is not remedied within 7 days of notice, your enrolment may be suspended until outstanding amounts are settled.</li>
              <li>Enrolment is personal and non-transferable to another individual without prior written consent from the Pluriversity.</li>
            </ul>
          </section>

          {/* 3. Programme Delivery */}
          <section id="programme" className="scroll-mt-24">
            <span className="text-[var(--text-label)] font-medium text-[var(--color-clay)] tracking-[var(--tracking-wider)] uppercase mb-2 block">03</span>
            <h2 className="text-[var(--text-display-m)] mb-6 pb-4 border-b border-[var(--border-subtle)]">Programme Delivery</h2>
            <p className="mb-4">
              The Pluriversity will make reasonable efforts to deliver the
              programme as described, including scheduled live sessions, guest
              presenters, and online resources.
            </p>
            <ul className="list-disc ml-6 space-y-2 text-[var(--color-text-muted)]">
              <li>Sessions are delivered online via designated platforms. Stable internet access is your responsibility.</li>
              <li>Session recordings (where made available) are for enrolled participants only and must not be shared or redistributed.</li>
              <li>We reserve the right to modify guest presenter lineups, session formats, or scheduling due to unforeseen circumstances. Where significant changes occur, enrolled participants will be notified promptly.</li>
              <li>Force majeure events (including natural disaster, prolonged illness of the programme lead, or internet infrastructure failure) may result in rescheduling. No refund obligation arises from rescheduling alone; if the programme cannot be delivered at all, the Refund Policy below applies.</li>
            </ul>
          </section>

          {/* 4. Conduct */}
          <section id="conduct" className="scroll-mt-24">
            <span className="text-[var(--text-label)] font-medium text-[var(--color-clay)] tracking-[var(--tracking-wider)] uppercase mb-2 block">04</span>
            <h2 className="text-[var(--text-display-m)] mb-6 pb-4 border-b border-[var(--border-subtle)]">Participant Conduct</h2>
            <p className="mb-4">
              Afrika Ikalafe Pluriversity is a sacred learning space grounded in
              African healing traditions. Participants are expected to engage
              with respect, cultural sensitivity, and integrity.
            </p>
            <p className="mb-4 font-medium">The following will result in immediate removal without refund:</p>
            <ul className="list-disc ml-6 space-y-2 text-[var(--color-text-muted)]">
              <li>Discriminatory, abusive, or harassing behaviour toward faculty, guest presenters, or fellow participants</li>
              <li>Recording sessions without express written permission</li>
              <li>Sharing access credentials, recordings, or programme materials with non-enrolled individuals</li>
              <li>Use of programme content for commercial purposes without written authorisation</li>
            </ul>
          </section>

          {/* 5. Intellectual Property */}
          <section id="intellectual-property" className="scroll-mt-24">
            <span className="text-[var(--text-label)] font-medium text-[var(--color-clay)] tracking-[var(--tracking-wider)] uppercase mb-2 block">05</span>
            <h2 className="text-[var(--text-display-m)] mb-6 pb-4 border-b border-[var(--border-subtle)]">Intellectual Property</h2>
            <p className="mb-4">
              All programme content &mdash; including curriculum, session materials,
              recordings, written resources, and brand assets &mdash; is the
              intellectual property of Afrika Ikalafe Pluriversity and/or the
              individual contributors (guest presenters and faculty).
            </p>
            <p className="mb-4">
              Enrolled participants are granted a limited, non-exclusive,
              non-transferable licence to access programme content for personal
              learning purposes only. This licence does not permit reproduction,
              redistribution, or commercial use of any kind.
            </p>
            <p className="mb-4">
              Personal reflections, creative work, and contributions made by
              participants during the programme remain the intellectual property
              of the participant. By sharing within the programme space, you
              grant the Pluriversity a non-exclusive licence to reference or
              quote your contributions (anonymously, unless you consent otherwise)
              for educational and promotional purposes.
            </p>
          </section>

          {/* 6. Liability */}
          <section id="liability" className="scroll-mt-24">
            <span className="text-[var(--text-label)] font-medium text-[var(--color-clay)] tracking-[var(--tracking-wider)] uppercase mb-2 block">06</span>
            <h2 className="text-[var(--text-display-m)] mb-6 pb-4 border-b border-[var(--border-subtle)]">Limitation of Liability</h2>
            <p className="mb-4">
              Participation in healing-focused programmes is voluntary.
              Afrika Ikalafe Pluriversity&apos;s programmes are educational in nature
              and do not constitute medical, psychological, or clinical
              treatment. If you are experiencing a mental or physical health
              crisis, please seek professional medical support.
            </p>
            <p className="mb-4">
              To the maximum extent permitted by law, the Pluriversity&apos;s total
              liability to any participant shall not exceed the amount paid by
              that participant for the relevant programme.
            </p>
            <p className="mb-4">
              We are not liable for any indirect, incidental, or consequential
              losses arising from your participation in our programmes.
            </p>
          </section>

          {/* 7. REFUND POLICY (Highlighted Box) */}
          <section id="refund-policy" className="scroll-mt-24 bg-[var(--color-surface)] border border-[var(--border-medium)] rounded-[var(--radius-l)] p-8 md:p-12 shadow-[var(--shadow-m)]">
            <span className="pill pill--accent mb-6 font-medium tracking-[var(--tracking-wider)]">
              07 &mdash; Refund Policy
            </span>
            <h2 className="text-[var(--text-display-m)] mt-4 mb-4">Cancellation &amp; Refund Policy</h2>
            <p className="text-[var(--text-body-l)] text-[var(--color-text-muted)] mb-8">
              We understand that circumstances change. The following refund
              schedule applies to all programme enrolments. All requests must be
              submitted in writing to <strong className="text-[var(--color-text)]">admin@afrikaikalafe.org</strong> with your name and order reference.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse text-left min-w-[600px]">
                <thead>
                  <tr>
                    <th className="text-[var(--text-label)] font-medium tracking-[var(--tracking-wide)] text-[var(--color-clay)] uppercase py-4 border-b border-[var(--border-strong)]">Cancellation window</th>
                    <th className="text-[var(--text-label)] font-medium tracking-[var(--tracking-wide)] text-[var(--color-clay)] uppercase py-4 border-b border-[var(--border-strong)]">Refund</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-body-s)]">
                  <tr>
                    <td className="py-4 border-b border-[var(--border-subtle)] text-[var(--color-text-muted)]">More than 14 days before programme start</td>
                    <td className="py-4 border-b border-[var(--border-subtle)]"><span className="text-[var(--color-sage)] font-medium tracking-[var(--tracking-wide)] uppercase text-[var(--text-label)]">Full refund</span></td>
                  </tr>
                  <tr>
                    <td className="py-4 border-b border-[var(--border-subtle)] text-[var(--color-text-muted)]">7&ndash;14 days before programme start</td>
                    <td className="py-4 border-b border-[var(--border-subtle)]">
                      <span className="text-[var(--color-ochre)] font-medium mb-1 inline-block tracking-[var(--tracking-wide)] uppercase text-[var(--text-label)]">50% refund</span>
                      <br />
                      <span className="text-[var(--color-text-muted)] italic">or full credit toward a future cohort</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 border-b border-[var(--border-subtle)] text-[var(--color-text-muted)]">Less than 7 days before programme start</td>
                    <td className="py-4 border-b border-[var(--border-subtle)]">
                      <span className="text-[var(--color-clay)] font-medium mb-1 inline-block tracking-[var(--tracking-wide)] uppercase text-[var(--text-label)]">No refund</span>
                      <br />
                      <span className="text-[var(--color-text-muted)] italic">Credit transfer to next cohort considered at our discretion</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 border-b-0 text-[var(--color-text-muted)]">After programme start date</td>
                    <td className="py-4 border-b-0">
                      <span className="text-[var(--color-clay)] font-medium tracking-[var(--tracking-wide)] uppercase text-[var(--text-label)]">No refund</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <div className="bg-[var(--color-surface-alt)] p-5 rounded-[var(--radius-s)] border border-[rgba(200,135,58,0.2)] border-l-4 border-l-[var(--color-ochre)]">
                <p className="m-0 text-[var(--text-body-s)] text-[var(--color-text-muted)]">
                  <strong className="text-[var(--color-text)]">Programme cancellation by us:</strong> In the unlikely event
                  that Afrika Ikalafe Pluriversity cancels a cohort before it
                  commences, enrolled participants will receive a <strong>full refund</strong> within 14 business days, or the option
                  to transfer their enrolment to the next available cohort.
                </p>
              </div>
              <div className="bg-[var(--color-surface-alt)] p-5 rounded-[var(--radius-s)] border border-[var(--border-subtle)]">
                <p className="m-0 text-[var(--text-body-s)] text-[var(--color-text-muted)]">
                  <strong className="text-[var(--color-text)]">Deferral requests:</strong> If you are unable to continue
                  due to documented medical or compassionate circumstances, please
                  contact us directly. Deferral to a future cohort will be considered
                  on a case-by-case basis.
                </p>
              </div>
              <div className="bg-[var(--color-surface-alt)] p-5 rounded-[var(--radius-s)] border border-[var(--border-subtle)]">
                <p className="m-0 text-[var(--text-body-s)] text-[var(--color-text-muted)]">
                  <strong className="text-[var(--color-text)]">Payment plans:</strong> Where enrolment was made via an
                  instalment plan, the refund calculation is based on the total
                  programme fee, not the amount paid to date.
                </p>
              </div>
            </div>
          </section>

          {/* 8. Governing Law */}
          <section id="governing-law" className="scroll-mt-24">
            <span className="text-[var(--text-label)] font-medium text-[var(--color-clay)] tracking-[var(--tracking-wider)] uppercase mb-2 block">08</span>
            <h2 className="text-[var(--text-display-m)] mb-6 pb-4 border-b border-[var(--border-subtle)]">Governing Law</h2>
            <p className="mb-4">
              These Terms are governed by and construed in accordance with the
              laws of the Republic of South Africa. Any disputes arising from
              these Terms shall be subject to the jurisdiction of the South
              African courts.
            </p>
            <p className="mb-4">
              For participants accessing our programmes from outside South Africa,
              nothing in these Terms limits your rights under the mandatory
              consumer protection laws of your own country.
            </p>
          </section>
        </div>

        <hr className="my-16 border-t border-[var(--border-subtle)]" />

        {/* Contact Box */}
        <div className="bg-[var(--color-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-l)] p-8 text-center shadow-[var(--shadow-s)]">
          <h3 className="text-[var(--text-display-m)] mb-4">Questions about these Terms?</h3>
          <p className="text-[var(--color-text-muted)] text-[var(--text-body)] m-0 leading-loose">
            Reach us at{" "}
            <a href="mailto:admin@afrikaikalafe.org" className="text-[var(--color-ochre)] font-medium hover:text-[var(--color-clay)] hover:underline">
              admin@afrikaikalafe.org
            </a>{" "}
            or call{" "}
            <a href="tel:+27824803878" className="text-[var(--color-ochre)] font-medium hover:text-[var(--color-clay)] hover:underline">
              +27 (0) 82 480 3878
            </a>.
            <br />
            We are committed to responding within 5 business days.
          </p>
        </div>

      </div>
    </main>
  );
}
