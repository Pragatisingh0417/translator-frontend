import { useEffect, useState } from "react";
import axios from "axios";

export default function LanguageList({ refresh }) {
  const [languages, setLanguages] = useState([]);

  const fetchLanguages = async () => {
    const res = await axios.get(
      "https://language-backend-f9qf.onrender.com/api/languages"
    );
    setLanguages(res.data);
  };

  const deleteLanguage = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://language-backend-f9qf.onrender.com/api/languages/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchLanguages();
    } catch (err) {
      alert("Delete failed");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, [refresh]);

  return (
    <div>
      {/* HEADER */}
      <div style={styles.header}>
        <h3 style={styles.title}>🌍 Languages</h3>
        <span style={styles.count}>{languages.length} total</span>
      </div>

      {languages.length === 0 && (
        <p style={{ color: "#777" }}>No languages yet</p>
      )}

      {/* GRID */}
      <div style={styles.grid}>
        {languages.map((lang) => (
          <div key={lang._id} style={styles.card}>
            
            {/* FLAG */}
            <img src={lang.flag} alt="" style={styles.flag} />

            {/* NAME */}
            <h4 style={styles.name}>{lang.name}</h4>

            {/* CODE BADGE */}
            <span style={styles.code}>{lang.code}</span>

            {/* LOCALE */}
            <p style={styles.locale}>
              {lang.locale || "No locale"}
            </p>

            {/* ACTIONS */}
            <button
              onClick={() => deleteLanguage(lang._id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  title: {
    margin: 0,
    color: "#03228f",
  },

  count: {
    fontSize: 14,
    color: "#666",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 18,
  },

  card: {
    background: "#fff",
    borderRadius: 14,
    padding: 18,
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "0.2s",
  },

  flag: {
    width: 45,
    marginBottom: 10,
  },

  name: {
    margin: "8px 0 4px",
  },

  code: {
    display: "inline-block",
    padding: "4px 8px",
    background: "#eef2ff",
    color: "#03228f",
    borderRadius: 6,
    fontSize: 12,
    marginBottom: 6,
  },

  locale: {
    fontSize: 12,
    color: "#777",
    marginBottom: 12,
  },

  deleteBtn: {
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
  },
};