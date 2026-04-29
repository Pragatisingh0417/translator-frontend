import { useState } from "react";
import axios from "axios";

export default function Login({ setToken, switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const login = async () => {
  try {
    const res = await axios.post(
      "https://language-backend-f9qf.onrender.com/api/auth/login",
      { email, password }
    );

    const { token, role } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    setToken(token);

    // 👉 REDIRECT BASED ON ROLE
    if (role === "admin") {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/profile";
    }

  } catch (err) {
    alert("Login failed");
  }
};
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        <h2 style={styles.title}>Login</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={login}>
          Login
        </button>

        {/* 🔁 Switch to Signup */}
        <p style={{ marginTop: 12 }}>
          Don’t have an account?{" "}
          <span style={styles.link} onClick={switchToSignup}>
            Signup
          </span>
        </p>

      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    background: "#fff",
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: 300,
    textAlign: "center",
  },
  title: {
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14,
  },
  button: {
    width: "100%",
    padding: 10,
    background: "#03228f",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold",
  },
  link: {
    color: "#03228f",
    cursor: "pointer",
    fontWeight: "bold",
  },
};