import { useState } from "react";
import LanguageForm from "../components/LanguageForm";
import LanguageList from "../components/LanguageList";
import UserList from "../components/UserList";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [refresh, setRefresh] = useState(false);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-center">
              Welcome to Language Translator App <br /> Admin Dashboard
            </h2>
            
          </div>
          
          
        );

      case "add":
        return <LanguageForm onAdded={() => setRefresh(!refresh)} />;

      case "list":
        return <LanguageList refresh={refresh} />;

      case "users":
        return <UserList />;

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-60 bg-[#03228f] text-white flex flex-col p-5">

        <h2 className="text-xl font-bold mb-6">🌍 Admin</h2>

        <SidebarItem label="Dashboard" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
        <SidebarItem label="Add Language" active={activeTab === "add"} onClick={() => setActiveTab("add")} />
        <SidebarItem label="All Languages" active={activeTab === "list"} onClick={() => setActiveTab("list")} />
        <SidebarItem label="Users" active={activeTab === "users"} onClick={() => setActiveTab("users")} />

        <button
          onClick={logout}
          className="mt-auto text-red-400 hover:text-red-500 text-left"
        >
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6 max-w-5xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
}

function SidebarItem({ label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-lg cursor-pointer mb-2 transition ${
        active
          ? "bg-white text-[#03228f] font-semibold"
          : "hover:bg-white/10"
      }`}
    >
      {label}
    </div>
  );
}