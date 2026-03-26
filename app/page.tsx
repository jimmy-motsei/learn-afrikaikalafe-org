import RegionSelector from "@/components/RegionSelector";

const GATHERINGS = [
  { number: "01", month: "Month TBC", title: "The Root — Origins & Belonging", presenter: "TBC" },
  { number: "02", month: "Month TBC", title: "The Story — Oral Tradition & Memory", presenter: "TBC" },
  { number: "03", month: "Month TBC", title: "The Body — Literature & the Physical Self", presenter: "TBC" },
  { number: "04", month: "Month TBC", title: "The Land — Place, Displacement & Home", presenter: "TBC" },
  { number: "05", month: "Month TBC", title: "The Voice — Language, Power & Identity", presenter: "TBC" },
  { number: "06", month: "Month TBC", title: "The Future — Afrofuturism & Imagination", presenter: "TBC" },
  { number: "07", month: "Month TBC", title: "The Return — Synthesis & Community", presenter: "Dr Motsei (Convenor)" },
];

export default function HomePage() {
  return (
    <>
      {/* ======================================================
          NAV
      ====================================================== */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "var(--color-sand)",
          borderBottom: "var(--border-subtle)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "var(--space-m)",
            paddingBottom: "var(--space-m)",
          }}
        >
          <span className="logo-placeholder">Afrika Ikalafe</span>

          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-xl)" }}>
            <a
              href="#programme"
              style={{
                fontSize: "var(--text-body-s)",
                color: "var(--color-text-muted)",
                letterSpacing: "var(--tracking-wide)",
                textTransform: "uppercase",
              }}
            >
              Programme
            </a>
            <a
              href="#presenters"
              style={{
                fontSize: "var(--text-body-s)",
                color: "var(--color-text-muted)",
                letterSpacing: "var(--tracking-wide)",
                textTransform: "uppercase",
              }}
            >
              Presenters
            </a>
            <a
              href="#join"
              className="btn btn--primary"
              style={{ padding: "var(--space-s) var(--space-l)" }}
            >
              Join the Gathering
            </a>
          </div>
        </div>
      </nav>

      {/* ======================================================
          HERO
      ====================================================== */}
      <section
        style={{
          backgroundColor: "var(--color-ivory)",
          paddingTop: "var(--space-4xl)",
          paddingBottom: "var(--space-3xl)",
        }}
      >
        <div className="container container--narrow" style={{ textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: "var(--space-l)" }}>
            A Literary Gathering Programme
          </p>

          <h1
            style={{
              marginBottom: "var(--space-l)",
              letterSpacing: "var(--tracking-tight)",
            }}
          >
            Afrika Ikalafe
          </h1>

          <p
            style={{
              fontSize: "var(--text-body-l)",
              color: "var(--color-text-muted)",
              lineHeight: "var(--leading-loose)",
              maxWidth: "560px",
              marginInline: "auto",
              marginBottom: "var(--space-2xl)",
            }}
          >
            Seven gatherings. Multiple voices. One sustained conversation about
            African literature, identity, and the stories we carry.
            Convened by Dr Motsei — open to readers and thinkers across the continent and diaspora.
          </p>

          <div
            style={{
              display: "flex",
              gap: "var(--space-m)",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a href="#join" className="btn btn--primary">
              Join the Gathering
            </a>
            <a href="#programme" className="btn btn--ghost">
              See the Programme
            </a>
          </div>

          <div
            style={{
              display: "flex",
              gap: "var(--space-xl)",
              justifyContent: "center",
              marginTop: "var(--space-3xl)",
              flexWrap: "wrap",
            }}
          >
            {[
              { value: "7", label: "Gatherings" },
              { value: "5", label: "Regions" },
              { value: "Online", label: "Live + Recorded" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-display-m)",
                    fontWeight: "var(--font-weight-light)",
                    color: "var(--color-clay)",
                    letterSpacing: "var(--tracking-tight)",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontSize: "var(--text-body-s)",
                    color: "var(--color-text-muted)",
                    letterSpacing: "var(--tracking-wide)",
                    textTransform: "uppercase",
                    marginTop: "var(--space-xs)",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          WHAT IS AFRIKA IKALAFE
      ====================================================== */}
      <section
        style={{
          backgroundColor: "var(--color-bg)",
          paddingTop: "var(--space-3xl)",
          paddingBottom: "var(--space-3xl)",
        }}
      >
        <div className="container container--narrow" style={{ textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: "var(--space-m)" }}>
            About the programme
          </p>
          <h2 style={{ marginBottom: "var(--space-l)" }}>
            A space for the African literary imagination
          </h2>
          <p
            style={{
              fontSize: "var(--text-body-l)",
              color: "var(--color-text-muted)",
              lineHeight: "var(--leading-loose)",
              marginBottom: "var(--space-l)",
            }}
          >
            Afrika Ikalafe is a year-long gathering programme that brings writers,
            readers, scholars, and storytellers into sustained conversation.
            Each gathering is anchored by a theme and led by a featured presenter —
            thinkers from across the continent and diaspora whose work illuminates a
            different dimension of African literary life.
          </p>
          <p
            style={{
              fontSize: "var(--text-body)",
              color: "var(--color-text-muted)",
              lineHeight: "var(--leading-loose)",
            }}
          >
            The community lives on Telegram — a quiet, intentional space for between-gathering
            reading, reflection, and dialogue.
          </p>
        </div>
      </section>

      {/* ======================================================
          PROGRAMME — 7 GATHERINGS
      ====================================================== */}
      <section
        id="programme"
        style={{
          backgroundColor: "var(--color-surface-alt)",
          paddingTop: "var(--space-3xl)",
          paddingBottom: "var(--space-3xl)",
        }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--space-m)" }}>
              Seven gatherings
            </p>
            <h2>The Programme</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "var(--space-l)",
            }}
          >
            {GATHERINGS.map((g) => (
              <div
                key={g.number}
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderRadius: "var(--radius-l)",
                  padding: "var(--space-xl)",
                  border: "var(--border-subtle)",
                  boxShadow: "var(--shadow-s)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-m)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-m)" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-display-m)",
                      fontWeight: "var(--font-weight-light)",
                      color: "var(--color-ochre)",
                      opacity: 0.6,
                      lineHeight: 1,
                    }}
                  >
                    {g.number}
                  </span>
                  <span
                    style={{
                      fontSize: "var(--text-label)",
                      color: "var(--color-text-muted)",
                      letterSpacing: "var(--tracking-wider)",
                      textTransform: "uppercase",
                    }}
                  >
                    {g.month}
                  </span>
                </div>
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "var(--font-weight-light)",
                    fontSize: "var(--text-heading)",
                    lineHeight: "var(--leading-snug)",
                    color: "var(--color-text)",
                  }}
                >
                  {g.title}
                </h4>
                <p
                  style={{
                    fontSize: "var(--text-body-s)",
                    color: "var(--color-text-muted)",
                    fontStyle: g.presenter === "TBC" ? "italic" : "normal",
                  }}
                >
                  {g.presenter === "TBC" ? "Presenter to be announced" : g.presenter}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          PRESENTERS — PLACEHOLDER
      ====================================================== */}
      <section
        id="presenters"
        style={{
          backgroundColor: "var(--color-ivory)",
          paddingTop: "var(--space-3xl)",
          paddingBottom: "var(--space-3xl)",
        }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--space-m)" }}>
              The voices
            </p>
            <h2>Presenters</h2>
            <p
              style={{
                fontSize: "var(--text-body)",
                color: "var(--color-text-muted)",
                marginTop: "var(--space-m)",
                fontStyle: "italic",
                fontFamily: "var(--font-display)",
              }}
            >
              Full presenter lineup and portraits coming soon.
            </p>
          </div>

          {/* Placeholder grid — replace with real presenter cards once photos arrive from Kgali */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "var(--space-l)",
              maxWidth: "900px",
              marginInline: "auto",
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--space-m)",
                }}
              >
                <div
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "var(--radius-round)",
                    backgroundColor: "var(--color-sand-deep)",
                    border: "var(--border-subtle)",
                  }}
                />
                <p
                  style={{
                    fontSize: "var(--text-body-s)",
                    color: "var(--color-text-muted)",
                    fontStyle: "italic",
                    fontFamily: "var(--font-display)",
                    textAlign: "center",
                  }}
                >
                  Coming soon
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "var(--space-2xl)" }}>
            <span className="pill">
              Presenter portraits pending · Google Drive link awaited from Kgali
            </span>
          </div>
        </div>
      </section>

      {/* ======================================================
          CONVENOR
      ====================================================== */}
      <section
        className="section--inverse"
        style={{
          paddingTop: "var(--space-3xl)",
          paddingBottom: "var(--space-3xl)",
        }}
      >
        <div className="container container--narrow" style={{ textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: "var(--space-m)" }}>
            Convened by
          </p>
          <h2 style={{ marginBottom: "var(--space-l)" }}>Dr Motsei</h2>
          <p
            style={{
              fontSize: "var(--text-body-l)",
              color: "var(--color-inverse-text)",
              lineHeight: "var(--leading-loose)",
              opacity: 0.8,
            }}
          >
            [Convenor biography to be added — placeholder pending Dr Motsei&apos;s approval]
          </p>
        </div>
      </section>

      {/* ======================================================
          PRICING — REGION SELECTOR
      ====================================================== */}
      <section
        id="join"
        style={{
          backgroundColor: "var(--color-bg)",
          paddingTop: "var(--space-3xl)",
          paddingBottom: "var(--space-3xl)",
        }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--space-m)" }}>
              Join the gathering
            </p>
            <h2 style={{ marginBottom: "var(--space-l)" }}>Choose your region</h2>
            <p
              style={{
                fontSize: "var(--text-body)",
                color: "var(--color-text-muted)",
                maxWidth: "480px",
                marginInline: "auto",
                lineHeight: "var(--leading-base)",
              }}
            >
              We use geographic pricing to make the programme accessible wherever you are.
              Select your region to see local pricing and payment options.
            </p>
          </div>

          <RegionSelector />

          <p
            style={{
              textAlign: "center",
              fontSize: "var(--text-body-s)",
              color: "var(--color-text-muted)",
              marginTop: "var(--space-xl)",
              fontStyle: "italic",
              fontFamily: "var(--font-display)",
            }}
          >
            ⚠️ Checkout links will go live once Lemon Squeezy setup is complete.
          </p>
        </div>
      </section>

      {/* ======================================================
          COMMUNITY — TELEGRAM
      ====================================================== */}
      <section
        style={{
          backgroundColor: "var(--color-surface-alt)",
          paddingTop: "var(--space-2xl)",
          paddingBottom: "var(--space-2xl)",
        }}
      >
        <div className="container container--narrow" style={{ textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: "var(--space-m)" }}>
            Between gatherings
          </p>
          <h3 style={{ marginBottom: "var(--space-l)" }}>
            The community lives on Telegram
          </h3>
          <p
            style={{
              fontSize: "var(--text-body)",
              color: "var(--color-text-muted)",
              lineHeight: "var(--leading-loose)",
              marginBottom: "var(--space-xl)",
            }}
          >
            A quiet, intentional space for reading, reflection, and dialogue between sessions.
            All programme members are welcomed into the Telegram community on enrolment.
          </p>
          <a href="#join" className="btn btn--ghost">
            Join to get access
          </a>
        </div>
      </section>

      {/* ======================================================
          FOOTER
      ====================================================== */}
      <footer
        style={{
          backgroundColor: "var(--color-earth)",
          color: "var(--color-sand)",
          paddingTop: "var(--space-2xl)",
          paddingBottom: "var(--space-2xl)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--space-l)",
            textAlign: "center",
          }}
        >
          <span className="logo-placeholder logo-placeholder--reversed">
            Afrika Ikalafe
          </span>
          <p
            style={{
              fontSize: "var(--text-body-s)",
              color: "var(--color-muted)",
              maxWidth: "400px",
              lineHeight: "var(--leading-base)",
            }}
          >
            A literary gathering programme open to readers and thinkers across Africa and the diaspora.
          </p>
          <div
            style={{
              display: "flex",
              gap: "var(--space-xl)",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[
              { label: "Instagram", href: "https://www.instagram.com/afrikaikalafe/" },
              { label: "X / Twitter", href: "https://x.com/AfrikaIkalafe" },
              { label: "Facebook", href: "https://facebook.com/afrikaikalafe" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "var(--text-body-s)",
                  color: "var(--color-muted)",
                  letterSpacing: "var(--tracking-wide)",
                  textTransform: "uppercase",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <p
            style={{
              fontSize: "var(--text-label)",
              color: "var(--color-muted)",
              letterSpacing: "var(--tracking-wide)",
            }}
          >
            © 2026 Afrika Ikalafe · Built by Maru Online
          </p>
        </div>
      </footer>
    </>
  );
}
