import { useState } from "react";
import LanguageForm from "../components/LanguageForm";
import LanguageList from "../components/LanguageList";

export default function Dashboard() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>🌍 Language Admin</h2>
        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.content}>

        {/* LEFT: ADD FORM */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Add Language</h3>
          <LanguageForm onAdded={handleRefresh} />
        </div>

        {/* RIGHT: LIST */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>All Languages</h3>
          <LanguageList refresh={refresh} />
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f4f6f8",
    padding: 20,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    margin: 0,
    color: "#03228f", // brand color
  },

  logoutBtn: {
    padding: "8px 14px",
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },

  content: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: 20,
  },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  cardTitle: {
    marginBottom: 15,
    color: "#333",
  },
};