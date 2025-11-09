// App.js
import React, { useState } from "react";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Footer from "./Footer";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState("login");

  // Handlers
  const handleLogin = async (email, password) => {
  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const err = await response.text();
      alert(err);
      return;
    }

    setIsLoggedIn(true);
    setCurrentView("dashboard");
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong during login.");
  }
};

  const handleSignup = async (name, email, password) => {
  try {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const err = await response.text();
      alert(err);
      return;
    }

    setIsLoggedIn(true);
    setCurrentView("dashboard");
  } catch (error) {
    console.error("Signup error:", error);
    alert("Something went wrong during signup.");
  }
};

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView("login");
  };

  const handleSubmitForm = async (formData) => {
  try {
    const response = await fetch("http://127.0.0.1:5000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert(`🎯 Predicted Value: ${data.prediction}`);
    setCurrentView("dashboard");
  } catch (error) {
    console.error("Error fetching prediction:", error);
    alert("Something went wrong while connecting to the prediction API.");
  }
};


  return (
    <div style={appStyles}>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onShowLogin={() => setCurrentView("login")}
        onShowSignup={() => setCurrentView("signup")}
        hideAuth={currentView === "form" || currentView === "dashboard"}
      />

      <main style={styles.main}>
        {currentView === "login" && (
          <Login
            onLogin={handleLogin}
            onSwitchToSignup={() => setCurrentView("signup")}
          />
        )}
        {currentView === "signup" && (
          <Signup
            onSignup={handleSignup}
            onSwitchToLogin={() => setCurrentView("login")}
          />
        )}
        {currentView === "dashboard" && (
          <Dashboard onPredict={() => setCurrentView("form")} />
        )}
        {currentView === "form" && (
          <FormPage
            onSubmit={handleSubmitForm}
            onCancel={() => setCurrentView("dashboard")}
          />
        )}
      </main>

      {currentView === "dashboard" && <Footer />}
    </div>
  );
}

/* ---------------- Login Page ---------------- */
function Login({ onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={styles.center}>
      <form
        style={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          onLogin();
        }}
      >
        <h2 style={styles.heading}>Login</h2>

        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          type="email"
          placeholder="you@school.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label style={styles.label}>Password</label>
        <input
          style={styles.input}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button style={styles.btn} type="submit">
          Login
        </button>
        <p style={{ marginTop: 8 }}>
          No account?{" "}
          <a style={styles.link} onClick={onSwitchToSignup}>
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}

/* ---------------- Signup Page ---------------- */
function Signup({ onSignup, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div style={styles.center}>
      <form
        style={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          if (password === confirm) onSignup();
          else alert("Passwords do not match!");
        }}
      >
        <h2 style={styles.heading}>Sign Up</h2>

        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          type="email"
          placeholder="you@school.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label style={styles.label}>Password</label>
        <input
          style={styles.input}
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label style={styles.label}>Confirm Password</label>
        <input
          style={styles.input}
          type="password"
          placeholder="Confirm your password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button style={styles.btn} type="submit">
          Create Account
        </button>
        <p style={{ marginTop: 8 }}>
          Have an account?{" "}
          <a style={styles.link} onClick={onSwitchToLogin}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

/* ---------------- Form Page (With Dropdowns) ---------------- */
function FormPage({ onSubmit, onCancel }) {
  const hobbyColumns = [
    "Badminton",
    "Coding",
    "Cricket",
    "Dance",
    "Debate",
    "Football",
    "Gym",
    "Hackathons",
    "Painting",
    "Robotics",
    "Writing",
  ];

  const clubColumns = [
    "Coding Club",
    "Cultural Club",
    "Drama Club",
    "Entrepreneurship Cell",
    "Literary Club",
    "Music Club",
    "Robotics Club",
    "Sports Club",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    collegeYear: "",
    hobbytop1: "",
    clubtop1: "",
    readsbooks: "Yes",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div style={formStyles.container}>
      <form onSubmit={handleSubmit} style={formStyles.form}>
        <h2 style={formStyles.heading}>Student Details Form</h2>

        <label style={formStyles.label}>Full Name</label>
        <input
          style={formStyles.input}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label style={formStyles.label}>Email</label>
        <input
          style={formStyles.input}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label style={formStyles.label}>Student ID</label>
        <input
          style={formStyles.input}
          type="number"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          required
        />

        <label style={formStyles.label}>College Year</label>
        <select
          style={formStyles.input}
          name="collegeYear"
          value={formData.collegeYear}
          onChange={handleChange}
          required
        >
          <option value="">Select Year</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>

        <label style={formStyles.label}>Top Hobby</label>
        <select
          style={formStyles.input}
          name="hobbytop1"
          value={formData.hobbytop1}
          onChange={handleChange}
          required
        >
          <option value="">Select Hobby</option>
          {hobbyColumns.map((hobby) => (
            <option key={hobby} value={hobby}>
              {hobby}
            </option>
          ))}
        </select>

        <label style={formStyles.label}>Top Club</label>
        <select
          style={formStyles.input}
          name="clubtop1"
          value={formData.clubtop1}
          onChange={handleChange}
          required
        >
          <option value="">Select Club</option>
          {clubColumns.map((club) => (
            <option key={club} value={club}>
              {club}
            </option>
          ))}
        </select>

        <label style={formStyles.label}>Do you read books?</label>
        <select
          style={formStyles.input}
          name="readsbooks"
          value={formData.readsbooks}
          onChange={handleChange}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <button style={formStyles.button} type="submit">
          Submit & Get Prediction
        </button>
        <button
          type="button"
          style={{ ...formStyles.button, background: "#64748b" }}
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

/* ---------------- Styles ---------------- */
const appStyles = {
  minHeight: "100vh",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2070&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  margin: 0,
};

const styles = {
  main: { minHeight: "calc(100vh - 120px)" },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    transform: "translateY(-50px)",
  },
  form: {
    background: "rgba(255,255,255,0.96)",
    padding: 30,
    borderRadius: 14,
    minWidth: 360,
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
  },
  heading: { fontSize: 22, fontWeight: 700, marginBottom: 16, color: "#000" },
  label: { fontWeight: 600, color: "#000" },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 14,
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    fontSize: 14,
    color: "#000",
  },
  btn: {
    padding: "10px 16px",
    borderRadius: 8,
    background: "#ff6b35",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
  link: { color: "#0b57d0", cursor: "pointer" },
};

const formStyles = {
  container: {
    minHeight: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2070&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins, sans-serif",
  },
  form: {
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: "30px 40px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    width: "400px",
  },
  heading: { textAlign: "center", color: "#004aad", marginBottom: "20px" },
  label: { fontWeight: 600, color: "#000" },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    marginTop: "20px",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#004aad",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
