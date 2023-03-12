import { useState, useEffect } from "react";
import axios from "axios";

const CreateUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "https://blue-journalist-bbrpv.ineuron.app:4000/user/create",
        {
          firstName,
          lastName,
          age,
          phoneNumber,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );
      console.log(response.data);
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-gray-600">First Name</label>
      <input
        type="text"
        value={firstName}
        onChange={handleFirstNameChange}
        className="input"
      />

      <label className="text-gray-600">Last Name</label>
      <input
        type="text"
        value={lastName}
        onChange={handleLastNameChange}
        className="input"
      />

      <label className="text-gray-600">Age</label>
      <input
        type="number"
        value={age}
        onChange={handleAgeChange}
        className="input"
      />

      <label className="text-gray-600">Phone Number</label>
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        className="input"
      />

      {error && <p className="text-red-500">{error}</p>}

      <div className="modal-action">
        <label htmlFor="my-modal" className="btn" onClick={handleSubmit}>
          {loading ? "Creating User..." : "Create User"}
        </label>
      </div>
    </div>
  );
};

export default CreateUser;
