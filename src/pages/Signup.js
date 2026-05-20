import { useState } from "react";
import axios from "axios";

export default function Signup({ switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState(""); // ✅ FIXED

  const signup = async () => {
    if (!name || !email || !password || !dob || !gender) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "https://api.mothertonguetranslator.com/api/auth/signup",
        { name, email, password, dob, gender }
      );

      alert("Signup successful");
      switchToLogin();

    } catch (err) {
      alert("Signup failed");
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <input
          style={styles.input}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          type="date" // ✅ better UX
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        {/* ✅ Dropdown instead of text */}
        <select
          style={styles.input}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input
          style={styles.input}
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

        <button style={styles.button} onClick={signup}>
          Signup
        </button>

        <p style={{ marginTop: 10 }}>
          Already have an account?{" "}
          <span style={styles.link} onClick={switchToLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f6f8",
  },

  card: {
    background: "#fff",
    padding: 25,
    borderRadius: 12,
    width: 320,
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  title: {
    marginBottom: 15,
    color: "#03228f",
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
    border: "1px solid #ccc",
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