import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";
import { User } from "../type";
import CreateUser from "../components/CreateUser";

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [createUserModa, setCreateUserModa] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        "https://blue-journalist-bbrpv.ineuron.app:4000/users"
      );
      setUsers(response.data.data);
    };

    fetchUsers();
  }, []);

  return (
    <div className=" mx-auto flex flex-col bg-gray-700">
      <div className="flex flex-wrap ">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>

      <div className=" fixed bottom-0 mb-10 right-10">
        {/* The button to open modal */}
        <label htmlFor="my-modal" className="btn btn-circle text-2xl">
          +
        </label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <CreateUser />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
