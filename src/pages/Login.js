import { useState } from "react";
import axios from "axios";

export default function Login({ setToken, switchToSignup }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  // LOGIN
  const login = async () => {

    try {

      const res = await axios.post(
        "https://api.mothertonguetranslator.com/api/auth/login",
        { email, password }
      );

      const { token, role } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setToken(token);

      // Redirect by role
      if (role === "admin") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/profile";
      }

    } catch (err) {
      alert("Login failed");
    }
  };

  // FORGOT PASSWORD
  const forgotPassword = async () => {

    try {

      const res = await axios.post(
        "https://api.mothertonguetranslator.com/api/auth/forgot-password",
        {
          email: forgotEmail,
        }
      );

      alert(res.data.msg);

      setShowForgot(false);
      setForgotEmail("");

    } catch (err) {

      alert(
        err.response?.data?.msg || "Something went wrong"
      );
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.title}>
          {showForgot ? "Forgot Password" : "Login"}
        </h2>

        {/* LOGIN FORM */}
        {!showForgot ? (
          <>
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

            {/* Forgot Password */}
            <p
              style={styles.forgot}
              onClick={() => setShowForgot(true)}
            >
              Forgot Password?
            </p>

            {/* Signup */}
            <p style={{ marginTop: 12 }}>
              Don’t have an account?{" "}
              <span
                style={styles.link}
                onClick={switchToSignup}
              >
                Signup
              </span>
            </p>
          </>
        ) : (
          <>
            {/* FORGOT PASSWORD FORM */}
            <input
              style={styles.input}
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) =>
                setForgotEmail(e.target.value)
              }
            />

            <button
              style={styles.button}
              onClick={forgotPassword}
            >
              Send Reset Link
            </button>

            <p
              style={styles.link}
              onClick={() => setShowForgot(false)}
            >
              Back to Login
            </p>
          </>
        )}

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
    width: 320,
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
    marginTop: 12,
    display: "inline-block",
  },

  forgot: {
    color: "#03228f",
    cursor: "pointer",
    marginTop: 10,
    fontSize: 14,
  },
};