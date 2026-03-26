"use client";

import { useState } from "react";

type Tier = {
  id: string;
  name: string;
  price: string;
  installments: string;
  description: string;
  checkoutUrl: string;
};

type Region = {
  id: string;
  label: string;
  flag: string;
  currency: string;
  note: string;
  tiers: Tier[];
};

const REGIONS: Region[] = [
  {
    id: "south-africa",
    label: "South Africa",
    flag: "🇿🇦",
    currency: "ZAR",
    note: "Priced in South African Rand",
    tiers: [
      {
        id: "sa-seed",
        name: "Seed",
        price: "R 1,200",
        installments: "or 3 × R 420",
        description: "Access to all 7 gatherings (recordings included)",
        checkoutUrl: "#",
      },
      {
        id: "sa-root",
        name: "Root",
        price: "R 2,400",
        installments: "or 3 × R 840",
        description: "All gatherings + curated reading materials + community circle",
        checkoutUrl: "#",
      },
      {
        id: "sa-canopy",
        name: "Canopy",
        price: "R 4,500",
        installments: "or 3 × R 1,575",
        description: "All gatherings + materials + mentorship access + patron recognition",
        checkoutUrl: "#",
      },
    ],
  },
  {
    id: "rest-of-africa",
    label: "Rest of Africa",
    flag: "🌍",
    currency: "USD",
    note: "Priced in USD · accessible from anywhere on the continent",
    tiers: [
      {
        id: "roa-seed",
        name: "Seed",
        price: "$ 45",
        installments: "or 3 × $16",
        description: "Access to all 7 gatherings (recordings included)",
        checkoutUrl: "#",
      },
      {
        id: "roa-root",
        name: "Root",
        price: "$ 90",
        installments: "or 3 × $32",
        description: "All gatherings + curated reading materials + community circle",
        checkoutUrl: "#",
      },
      {
        id: "roa-canopy",
        name: "Canopy",
        price: "$ 160",
        installments: "or 3 × $56",
        description: "All gatherings + materials + mentorship access + patron recognition",
        checkoutUrl: "#",
      },
    ],
  },
  {
    id: "uk-europe",
    label: "UK & Europe",
    flag: "🇬🇧",
    currency: "GBP / EUR",
    note: "Priced in USD at a diaspora-adjusted rate",
    tiers: [
      {
        id: "uke-seed",
        name: "Seed",
        price: "$ 75",
        installments: "or 3 × $26",
        description: "Access to all 7 gatherings (recordings included)",
        checkoutUrl: "#",
      },
      {
        id: "uke-root",
        name: "Root",
        price: "$ 150",
        installments: "or 3 × $52",
        description: "All gatherings + curated reading materials + community circle",
        checkoutUrl: "#",
      },
      {
        id: "uke-canopy",
        name: "Canopy",
        price: "$ 280",
        installments: "or 3 × $98",
        description: "All gatherings + materials + mentorship access + patron recognition",
        checkoutUrl: "#",
      },
    ],
  },
  {
    id: "north-america",
    label: "North America",
    flag: "🇺🇸",
    currency: "USD",
    note: "Priced in USD",
    tiers: [
      {
        id: "na-seed",
        name: "Seed",
        price: "$ 75",
        installments: "or 3 × $26",
        description: "Access to all 7 gatherings (recordings included)",
        checkoutUrl: "#",
      },
      {
        id: "na-root",
        name: "Root",
        price: "$ 150",
        installments: "or 3 × $52",
        description: "All gatherings + curated reading materials + community circle",
        checkoutUrl: "#",
      },
      {
        id: "na-canopy",
        name: "Canopy",
        price: "$ 280",
        installments: "or 3 × $98",
        description: "All gatherings + materials + mentorship access + patron recognition",
        checkoutUrl: "#",
      },
    ],
  },
  {
    id: "rest-of-world",
    label: "Rest of World",
    flag: "🌐",
    currency: "USD",
    note: "Priced in USD · open to all wherever you are",
    tiers: [
      {
        id: "row-seed",
        name: "Seed",
        price: "$ 60",
        installments: "or 3 × $21",
        description: "Access to all 7 gatherings (recordings included)",
        checkoutUrl: "#",
      },
      {
        id: "row-root",
        name: "Root",
        price: "$ 120",
        installments: "or 3 × $42",
        description: "All gatherings + curated reading materials + community circle",
        checkoutUrl: "#",
      },
      {
        id: "row-canopy",
        name: "Canopy",
        price: "$ 220",
        installments: "or 3 × $77",
        description: "All gatherings + materials + mentorship access + patron recognition",
        checkoutUrl: "#",
      },
    ],
  },
];

export default function RegionSelector() {
  const [activeRegion, setActiveRegion] = useState<string>("south-africa");

  const region = REGIONS.find((r) => r.id === activeRegion) ?? REGIONS[0];

  return (
    <div>
      {/* Region tabs */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-s)",
          marginBottom: "var(--space-xl)",
          justifyContent: "center",
        }}
      >
        {REGIONS.map((r) => (
          <button
            key={r.id}
            onClick={() => setActiveRegion(r.id)}
            style={{
              padding: "var(--space-s) var(--space-l)",
              borderRadius: "var(--radius-round)",
              border: activeRegion === r.id ? "none" : "var(--border-medium)",
              backgroundColor:
                activeRegion === r.id
                  ? "var(--color-clay)"
                  : "transparent",
              color:
                activeRegion === r.id
                  ? "var(--color-ivory)"
                  : "var(--color-text-muted)",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body-s)",
              fontWeight: "var(--font-weight-medium)",
              letterSpacing: "var(--tracking-wide)",
              cursor: "pointer",
              transition: "all var(--duration-base) var(--ease-standard)",
            }}
          >
            {r.flag} {r.label}
          </button>
        ))}
      </div>

      {/* Region note */}
      <p
        style={{
          textAlign: "center",
          fontSize: "var(--text-body-s)",
          color: "var(--color-text-muted)",
          marginBottom: "var(--space-2xl)",
          fontStyle: "italic",
          fontFamily: "var(--font-display)",
        }}
      >
        {region.note}
      </p>

      {/* Tier cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "var(--space-l)",
        }}
      >
        {region.tiers.map((tier, index) => (
          <div
            key={tier.id}
            style={{
              backgroundColor:
                index === 1 ? "var(--color-clay)" : "var(--color-surface)",
              borderRadius: "var(--radius-l)",
              padding: "var(--space-xl)",
              border:
                index === 1 ? "none" : "var(--border-subtle)",
              boxShadow:
                index === 1 ? "var(--shadow-warm)" : "var(--shadow-s)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-m)",
              position: "relative",
            }}
          >
            {index === 1 && (
              <span
                className="pill pill--accent"
                style={{
                  position: "absolute",
                  top: "var(--space-m)",
                  right: "var(--space-m)",
                  fontSize: "var(--text-label)",
                }}
              >
                Most popular
              </span>
            )}

            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-display-m)",
                fontWeight: "var(--font-weight-light)",
                color: index === 1 ? "var(--color-ivory)" : "var(--color-text)",
              }}
            >
              {tier.name}
            </h4>

            <div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-display-l)",
                  fontWeight: "var(--font-weight-light)",
                  color: index === 1 ? "var(--color-ivory)" : "var(--color-text)",
                  letterSpacing: "var(--tracking-tight)",
                }}
              >
                {tier.price}
              </span>
              <p
                style={{
                  fontSize: "var(--text-body-s)",
                  color:
                    index === 1 ? "rgba(250,247,242,0.7)" : "var(--color-text-muted)",
                  marginTop: "var(--space-xs)",
                }}
              >
                {tier.installments}
              </p>
            </div>

            <p
              style={{
                fontSize: "var(--text-body-s)",
                lineHeight: "var(--leading-snug)",
                color:
                  index === 1 ? "rgba(250,247,242,0.85)" : "var(--color-text-muted)",
                flexGrow: 1,
              }}
            >
              {tier.description}
            </p>

            <a
              href={tier.checkoutUrl}
              className={index === 1 ? "btn btn--ghost" : "btn btn--primary"}
              style={
                index === 1
                  ? {
                      borderColor: "rgba(250,247,242,0.4)",
                      color: "var(--color-ivory)",
                    }
                  : {}
              }
            >
              Join this gathering
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
