import React from "react";

export default function PrivacyPage({ onNavigate }: { onNavigate: (page: string) => void }) {
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
        Privacy Policy
      </h1>

      <p><strong>Effective Date:</strong> January 2025</p>
      <p><strong>Last Updated:</strong> January 2025</p>

      <h2>1. Introduction</h2>
      <p>
        LifeZinc ("we," "us," "our") is an emotional-wellness journaling companion
        designed to help people process feelings, reflect, and receive supportive
        guidance. Your privacy is extremely important to us. This Privacy Policy
        explains what information we collect, how we use it, and how we protect it.
      </p>

      <h2>2. What Information We Collect</h2>

      <h3>A. Information You Provide</h3>
      <ul>
        <li>Journal entries you write inside the app</li>
        <li>Emotion selections and reflection prompts</li>
        <li>Account details such as name, email, and password</li>
        <li>Preferences like faith-friendly mode or issue categories</li>
      </ul>

      <h3>B. Automatically Collected Information</h3>
      <ul>
        <li>Device type, browser, operating system</li>
        <li>App usage data (pages visited, actions taken)</li>
        <li>Cookies for login and performance</li>
      </ul>

      <p>We do <strong>not</strong> collect phone contacts, photos, microphone data, or advertising identifiers.</p>

      <h2>3. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Provide journaling and emotional reflections</li>
        <li>Personalize your experience</li>
        <li>Improve LifeZinc and its features</li>
        <li>Maintain security</li>
      </ul>

      <p>We <strong>do not</strong> sell or share your information for advertising.</p>

      <h2>4. Your Journals Are Private</h2>
      <p>
        Your journal entries remain private unless you choose to share them. We
        do not read or analyze your journals outside of the automated tools that
        generate supportive reflections inside the app.
      </p>

      <h2>5. When We Share Information</h2>
      <p>We only share information to comply with the law, prevent harm, or work with trusted service providers.</p>

      <h2>6. Data Security</h2>
      <p>
        We use industry-standard encryption and security practices to protect
        your information.
      </p>

      <h2>7. Your Choices</h2>
      <ul>
        <li>Delete your journal entries any time</li>
        <li>Disable faith-friendly mode</li>
        <li>Uninstall the app</li>
        <li>Request account deletion</li>
      </ul>

      <h2>8. Children's Privacy</h2>
      <p>
        LifeZinc is not intended for children under 13. Teens 13–17 should use
        the app with guardian guidance.
      </p>

      <h2>9. Contact Us</h2>
      <p>Email: <strong>support@lifezinc.com</strong></p>

      <h2>10. Changes to This Policy</h2>
      <p>
        We may update this policy occasionally and will post updates on this page.
      </p>

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
