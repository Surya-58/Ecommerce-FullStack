import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Services/userApi";
import "../Styles/Pages/register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !phone || !password) {
      alert("Please Fill all the fields");
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    try {
      const data = await registerUser(user);

      console.log("Register Response:", data);

      alert("Registration Successful");

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");

      navigate("/login");
    } catch (error) {
      console.log("Registration Error:", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Enter Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default Register;