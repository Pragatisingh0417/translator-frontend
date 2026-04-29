import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isSignup, setIsSignup] = useState(false);

  const role = localStorage.getItem("role"); // ✅ get role

  // NOT LOGGED IN
  if (!token) {
    return isSignup ? (
      <Signup switchToLogin={() => setIsSignup(false)} />
    ) : (
      <Login
        setToken={setToken}
        switchToSignup={() => setIsSignup(true)}
      />
    );
  }

  // LOGGED IN → ROLE BASED
  if (role === "admin") {
    return <Dashboard />;
  } else {
    return <Profile />;
  }
}

export default App;