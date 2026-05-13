"use client";

import { useState } from "react";

export default function DeleteAccount() {
  const [email, setEmail] = useState("");
  const [submitted] = useState(false);

  const [message, setMessage] = useState("");
const [error, setError] = useState("");

const handleDeleteRequest = async (e) => {
  e.preventDefault();

  setMessage("");
  setError("");

  try {
    const res = await fetch("https://language-backend-f9qf.onrender.com/api/delete-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(data.message);
      setEmail("");
    } else {
      setError(data.message);
    }

  } catch (err) {
    setError("Something went wrong");
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        
        <h1 className="text-3xl font-bold text-center text-red-600 mb-4">
          Delete Account
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Enter your registered email address to request account deletion.
        </p>

        {submitted ? (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center">
            Your account deletion request has been submitted successfully.
          </div>
        ) : (
          <form onSubmit={handleDeleteRequest} className="space-y-5">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registered Email
              </label>

              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3 rounded-xl"
            >
              Delete My Account
            </button>
          </form>
          
        )}
        {message && (
  <div className="bg-green-100 text-green-700 p-3 rounded-lg mt-4">
    {message}
  </div>
)}

{error && (
  <div className="bg-red-100 text-red-700 p-3 rounded-lg mt-4">
    {error}
  </div>
)}

        <div className="mt-6 text-sm text-gray-500 text-center leading-6">
          <p>
            Your account and associated data will be permanently deleted within
            7 days.
          </p>

          <p className="mt-2">
            Certain legal or security records may be retained as required by
            law.
          </p>
        </div>
      </div>
    </div>
  );
}