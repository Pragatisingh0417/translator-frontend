import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {

  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPassword = async () => {

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {

      const res = await axios.post(
        `https://api.mothertonguetranslator.com/api/auth/reset-password/${token}`,
        {
          password,
        }       
      );

      alert(res.data.msg);

      // Redirect to login
      navigate("/");

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
          Reset Password
        </h2>

        <input
          style={styles.input}
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
        />

        <button
          style={styles.button}
          onClick={resetPassword}
        >
          Reset Password
        </button>

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
};