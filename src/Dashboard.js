// Dashboard.js
import React, { useState } from "react";

export default function Dashboard({ onPredict }) {
  const [hovered, setHovered] = useState(null);

  const features = [
    {
      title: "🎯 Accurate Predictions",
      text: "ML models trained on diverse student data forecast weekly coding hours with high accuracy. The system adapts to individual patterns to give precise planning insights.",
      accent: ["#FF6B6B","#FF9A8B"]
    },
    {
      title: "⚖️ Fair Team Balancing",
      text: "Ensure equitable opportunities by accounting for coding effort during team formation. Our AI-driven balancing helps create fair, high-performing teams with complementary strengths.",
      accent: ["#6D28D9","#4F46E5"]
    },
    {
      title: "📊 Data-Driven Insights",
      text: "Visualize performance and uncover what truly drives coding practice. Gain actionable insights to improve collaboration, time management, and learning outcomes.",
      accent: ["#10B981","#34D399"]
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Coding Hours Forecaster</h1>
        <p style={styles.subtitle}>for SNU Hackathons</p>
        <p style={styles.desc}>Predict coding hours to balance hackathon teams fairly and efficiently.</p>
        <button
          style={styles.button}
          onClick={() => { if (typeof onPredict === "function") onPredict(); }}
        >
          Get Your Prediction
        </button>
      </div>

      <section style={styles.features}>
        {features.map((f, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              ...styles.card,
              transform: hovered === i ? "translateY(-8px)" : "none",
              boxShadow: hovered === i ? "0 16px 40px rgba(0,0,0,0.35)" : "0 8px 24px rgba(0,0,0,0.25)"
            }}
          >
            <div style={{ ...styles.accent, background: `linear-gradient(180deg, ${f.accent[0]}, ${f.accent[1]})` }} />
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>{f.title}</h3>
              <p style={styles.cardText}>{f.text}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", padding: "80px 20px 60px", color: "#F8FAFF" },
  hero: { maxWidth: 800, margin: "0 auto", marginBottom: 60, background: "rgba(10,20,40,0.55)", padding: 36, borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" },
  title: { fontSize: 40, marginBottom: 6, fontWeight: 800 },
  subtitle: { fontSize: 18, marginBottom: 8, color: "#E0E7FF" },
  desc: { color: "#CBD5E1", marginBottom: 18 },
  button: { marginTop: 8, padding: "12px 28px", borderRadius: 10, border: "none", cursor: "pointer", background: "linear-gradient(90deg,#FB7185,#F97316)", color: "#fff", fontWeight: 700 },
  features: { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 28 },
  card: { position: "relative", flex: "1 1 320px", minWidth: 280, background: "linear-gradient(180deg, rgba(8,12,20,0.66), rgba(10,16,30,0.56))", borderRadius: 14, display: "flex", overflow: "hidden", transition: "all 0.3s ease" },
  accent: { width: 10, borderTopLeftRadius: 14, borderBottomLeftRadius: 14 },
  cardContent: { padding: 20, textAlign: "left" },
  cardTitle: { fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 },
  cardText: { color: "#dbeafe", lineHeight: 1.6 }
};
