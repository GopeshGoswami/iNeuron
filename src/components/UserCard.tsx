import React, { useEffect, useState } from "react";
import { User } from "../type";
import axios from "axios";

interface Props {
  user: User;
}

const UserCard: React.FC<Props> = ({ user }) => {
  const [deleting, setDeleting] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user); // state to hold updated user object
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://blue-journalist-bbrpv.ineuron.app:4000/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const now = new Date().toISOString(); // Get the current time in ISO format
      const data = { firstName, lastName, age, phoneNumber, updatedNow: now }; // Add the "updatedNow" field to the form data
      const response = await axios.patch(
        `https://blue-journalist-bbrpv.ineuron.app:4000/user/${user._id}`,
        data
      );
      console.log(response.data);
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleLabelClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const deleteUser = async () => {
    setDeleting(!deleting);
    try {
      const response = await axios.delete(
        `https://blue-journalist-bbrpv.ineuron.app:4000/user/${user._id}`
      );
      fetchData();
      setDeleting(!deleting);
      console.log(response);
      console.log(`${user._id} with name ${user.firstName} got deleted`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg flex rounded overflow-hidden shadow-lg mx-auto my-4 ">
      {/* Daisyui Card */}
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://th.bing.com/th/id/OIP.67L5j42RhP-kzVp9pumCTAHaNK?pid=ImgDet&rs=1"
            alt="Album"
            className=" h-full w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl text-white mb-10">
            {user.firstName} {user.lastName}
          </h2>

          <p className="text-white text-base">
            Phone: {user.phoneNumber}
            <br />
            Age: {user.age}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Created: {new Date(user.createdAt).toLocaleString()}
            <br />
            Updated: {new Date(user.updatedAt).toLocaleString()}
          </p>

          <div className="gap-4 justify-end flex flex-row">
            <label htmlFor="my-modal-6" className="btn btn-success">
              Update
            </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <div className="p-4">
                  <h2 className="text-lg font-medium mb-4">Update User</h2>
                  <div className="flex flex-col mb-4">
                    <label className="text-gray-600">First Name:</label>
                    <input
                      type="text"
                      name="firstName"
                      className="input"
                      value={firstName}
                      onChange={handleFirstNameChange}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="text-gray-600">Last Name:</label>
                    <input
                      type="text"
                      name="lastName"
                      className="input"
                      value={lastName}
                      onChange={handleLastNameChange}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="text-gray-600">Age:</label>
                    <input
                      type="number"
                      name="age"
                      className="input"
                      value={age}
                      onChange={handleAgeChange}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="text-gray-600">Phone Number:</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      className="input"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                    />
                  </div>
                  {/* <button >Update</button> */}
                </div>
                <div className="modal-action">
                  <label
                    htmlFor="my-modal-6"
                    onClick={handleSubmit}
                    className="btn-success btn"
                  >
                    Update
                  </label>
                </div>
              </div>
            </div>
            <button className="btn btn-error" onClick={deleteUser}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
