import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import DeleteAccount from "./pages/DeleteAccount";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isSignup, setIsSignup] = useState(false);

  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
  <Routes>

  {/* PUBLIC ROUTES */}
  <Route path="/delete-account" element={<DeleteAccount />} />

  <Route
    path="/reset-password/:token"
    element={<ResetPassword />}
  />

  {/* NOT LOGGED IN */}
  {!token ? (
    <Route
      path="*"
      element={
        isSignup ? (
          <Signup switchToLogin={() => setIsSignup(false)} />
        ) : (
          <Login
            setToken={setToken}
            switchToSignup={() => setIsSignup(true)}
          />
        )
      }
    />
  ) : (
    <>
      {/* ADMIN */}
      {role === "admin" ? (
        <Route path="*" element={<Dashboard />} />
      ) : (
        <Route path="*" element={<Profile />} />
      )}
    </>
  )}

</Routes>
    </BrowserRouter>
  );
}

export default App;