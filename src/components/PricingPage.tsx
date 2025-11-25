import React from "react";

interface PricingPageProps {
  onNavigate: (page: string) => void;
}

export default function PricingPage({ onNavigate }: PricingPageProps) {
  const handleSelectPlan = (planId: string) => {
    console.log("Selected plan:", planId);
    onNavigate("auth");
  };

  const cardStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 240,
    background: "#ffffff",
    borderRadius: 20,
    border: "1px solid #e0f0ee",
    boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
    padding: "20px 18px",
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: 16,
    width: "100%",
    padding: "10px 16px",
    borderRadius: 999,
    border: "none",
    background:
      "linear-gradient(135deg, #1AB0A8 0%, #76E5D3 50%, #1AB0A8 100%)",
    color: "#ffffff",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(26,176,168,0.35)",
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "20px 4px 40px",
        fontFamily: "system-ui, sans-serif",
        color: "#123",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 10 }}>
        LifeZinc Plans
      </h1>
      <p style={{ marginBottom: 6, color: "#4a6765" }}>
        Your first 5 journal entries are free. After that, keep your healing journey going
        with our Monthly or Yearly plan.
      </p>
      <p style={{ marginBottom: 24, fontSize: 13, color: "#6c8480" }}>
        All payments are handled securely by Stripe. LifeZinc never sees your card details.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "stretch",
        }}
      >
        <div style={cardStyle}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: 4 }}>Free</h2>
          <p style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>
            $0 <span style={{ fontSize: 13, fontWeight: 400 }}>/ forever</span>
          </p>
          <ul style={{ paddingLeft: 18, fontSize: 14, color: "#4a6765" }}>
            <li>First 5 journal entries free</li>
            <li>Basic emotional reflections</li>
            <li>Faith-Friendly Mode (optional)</li>
          </ul>
          <button
            style={buttonStyle}
            onClick={() => handleSelectPlan("free")}
          >
            Use Free Plan
          </button>
        </div>

        <div style={{ ...cardStyle, borderColor: "#1AB0A8" }}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: 4 }}>Monthly</h2>
          <p style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>
            $9 <span style={{ fontSize: 13, fontWeight: 400 }}>/ month</span>
          </p>
          <ul style={{ paddingLeft: 18, fontSize: 14, color: "#4a6765" }}>
            <li>Unlimited journaling after your first 5 entries</li>
            <li>Deeper guided prompts</li>
            <li>Save favorites &amp; reframes</li>
            <li>Priority feature updates</li>
          </ul>
          <button
            style={buttonStyle}
            onClick={() => handleSelectPlan("monthly")}
          >
            Get Monthly Plan
          </button>
        </div>

        <div style={cardStyle}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: 4 }}>Yearly</h2>
          <p style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>
            $89{" "}
            <span style={{ fontSize: 13, fontWeight: 400 }}>/ year</span>
          </p>
          <ul style={{ paddingLeft: 18, fontSize: 14, color: "#4a6765" }}>
            <li>Everything in Monthly</li>
            <li>Best value for long-term use</li>
            <li>Ideal for families &amp; students</li>
          </ul>
          <button
            style={buttonStyle}
            onClick={() => handleSelectPlan("yearly")}
          >
            Get Yearly Plan
          </button>
        </div>
      </div>
    </div>
  );
}
