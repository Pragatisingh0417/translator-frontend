import { useEffect, useState } from "react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        "https://language-backend-f9qf.onrender.com/api/auth/users"
      );
      setUsers(res.data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold mb-4">All Users</h3>

      <div className="space-y-3">
        {users.map((u) => (
          <div
            key={u._id}
            className="border rounded-lg p-3 flex justify-between"
          >
            <div>
              <p className="font-medium">{u.name}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
            </div>

            <div className="text-sm text-gray-400">
              {u.gender}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}