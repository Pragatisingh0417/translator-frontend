import { useState } from "react";
import axios from "axios";

export default function LanguageForm({ onAdded }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [locale, setLocale] = useState("");
  const [flag, setFlag] = useState("");

  const addLanguage = async () => {
    if (!name || !code || !locale || !flag) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://language-backend-f9qf.onrender.com/api/languages",
        { name, code, locale, flag }, // ✅ FIXED (locale added)
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear inputs
      setName("");
      setCode("");
      setLocale("");
      setFlag("");

      onAdded();

    } catch (err) {
  const msg = err.response?.data?.msg || "Error adding language";
  alert(msg);
}
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>➕ Add Language</h3>

      <input
        style={styles.input}
        placeholder="Language Name (e.g. Spanish)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="Code (e.g. es)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="Locale (e.g. es_ES)"
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="Flag URL"
        value={flag}
        onChange={(e) => setFlag(e.target.value)}
      />

      <button style={styles.button} onClick={addLanguage}>
        Add Language
      </button>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
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