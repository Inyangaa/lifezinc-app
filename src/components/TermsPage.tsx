import React from "react";

export default function TermsPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div style={{
      maxWidth: "900px",
      margin: "0 auto",
      padding: "40px 20px",
      fontFamily: "system-ui, sans-serif",
      lineHeight: 1.7,
      color: "#123",
    }}>

      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 20 }}>
        Terms of Service
      </h1>

      <p><strong>Effective Date:</strong> January 2025</p>
      <p><strong>Last Updated:</strong> January 2025</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to LifeZinc! These Terms of Service ("Terms") describe how you may
        use the LifeZinc website and app ("Services"). By using LifeZinc, you
        agree to these Terms. If you do not agree, please stop using the app.
      </p>

      <h2>2. What LifeZinc Is (and Isn't)</h2>
      <p>LifeZinc is an emotional-wellness journaling companion that helps you reflect and process emotions.</p>
      <p><strong>LifeZinc is not</strong> a medical service, therapy provider, or crisis hotline.</p>

      <h2>3. Using LifeZinc</h2>
      <ul>
        <li>Use the app responsibly.</li>
        <li>Do not misuse or harm the app.</li>
        <li>Do not attempt unauthorized access.</li>
        <li>You are responsible for your password and account.</li>
      </ul>

      <h2>4. Your Content</h2>
      <p>You keep ownership of all journal entries and content you create in LifeZinc.</p>
      <p>
        You allow us to store and process your content only to provide app
        features. We do not sell your data.
      </p>

      <h2>5. Our Content and Technology</h2>
      <p>
        All LifeZinc designs, logos, and features belong to us. You may not copy,
        reverse engineer, or resell them.
      </p>

      <h2>6. Safety and Wellness Disclaimer</h2>
      <p>
        LifeZinc provides supportive tools only. It does not provide diagnosis,
        treatment, or professional therapy.
      </p>

      <h2>7. Third-Party Services</h2>
      <p>
        We may link to external resources for your convenience. We do not control
        or guarantee these services.
      </p>

      <h2>8. Termination</h2>
      <p>
        We may suspend or terminate accounts that violate these Terms. You may
        stop using LifeZinc at any time.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        LifeZinc is provided "as-is" and "as available." We are not liable for
        damages arising from using or being unable to use the app.
      </p>

      <h2>10. Changes to These Terms</h2>
      <p>
        We may update these Terms occasionally. Continued use of LifeZinc means
        you accept the new Terms.
      </p>

      <h2>11. Contact Us</h2>
      <p>Email: <strong>support@lifezinc.com</strong></p>

      <button
        onClick={() => onNavigate("home")}
        style={{
          marginTop: 30,
          padding: "12px 24px",
          borderRadius: 999,
          background: "#1AB0A8",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        Back to Home
      </button>
    </div>
  );
}
