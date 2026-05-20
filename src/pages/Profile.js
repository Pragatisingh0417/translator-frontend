import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://api.mothertonguetranslator.com/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);

      } catch (err) {
        console.log(err);
        alert("Session expired. Please login again.");
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (!user) return null;

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>My Profile</h2>

        <div style={styles.avatarWrapper}>
          <div style={styles.avatar}>👤</div>
        </div>
      </div>

      {/* USER CARD */}
      <div style={styles.userCard}>
        <h3 style={styles.name}>{user.name}</h3>

        <span style={styles.badge}>
          {user.plan?.toUpperCase() || "FREE ACCOUNT"}
        </span>

        <div style={styles.details}>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>DOB:</strong> {user.dob?.slice(0, 10)}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
        </div>
      </div>

      {/* SETTINGS */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Account Settings</h4>

        <Card title="⭐ Upgrade to Premium" desc="Remove ads & unlock history" />
        <Card title="📜 Translation History" desc="View your past translations" />
      </div>

      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Support</h4>

        <Card title="❓ Help & Support" />
        <Card title="🚪 Logout" onClick={logout} danger />
      </div>
    </div>
  );
}

function Card({ title, desc, onClick, danger }) {
  return (
    <div
      onClick={onClick}
      style={{
        ...styles.card,
        ...(danger && { borderLeft: "4px solid #ff4d4f" }),
      }}
    >
      <div>
        <strong style={{ fontSize: 15 }}>{title}</strong>
        {desc && <p style={styles.desc}>{desc}</p>}
      </div>
      <span style={styles.arrow}>›</span>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Inter, sans-serif",
    background: "#f5f7fb",
    minHeight: "100vh",
  },

  loading: {
    textAlign: "center",
    marginTop: 100,
    color: "#666",
  },

  header: {
    background: "linear-gradient(135deg, #1e88e5, #42a5f5)",
    padding: "50px 20px 80px",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    textAlign: "center",
    color: "#fff",
  },

  title: {
    marginBottom: 10,
    fontWeight: 600,
  },

  avatarWrapper: {
    marginTop: 10,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: "50%",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 40,
    margin: "0 auto",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
  },

  userCard: {
    background: "#fff",
    margin: "-60px 20px 20px",
    padding: 20,
    borderRadius: 16,
    textAlign: "center",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },

  name: {
    marginBottom: 8,
  },

  badge: {
    background: "#eef2ff",
    color: "#3f51b5",
    padding: "6px 14px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
  },

  details: {
    marginTop: 15,
    fontSize: 14,
    color: "#555",
    lineHeight: "1.6",
  },

  section: {
    padding: "30px 20px ",
  },

  sectionTitle: {
    marginBottom: 10,
    color: "#777",
    fontSize: 14,
  },

  card: {
    background: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    cursor: "pointer",
    transition: "0.2s",
  },

  desc: {
    margin: 0,
    fontSize: 13,
    color: "#888",
  },

  arrow: {
    fontSize: 20,
    color: "#bbb",
  },
};