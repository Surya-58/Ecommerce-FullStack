import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, getUsers } from "../Services/userApi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()


  const handleRegister = async() => {
    if (!name || !email || !phone || !password){
      alert("Please Fill all the fields")
      return;
    }
    const users = await getUsers()

    const existingEmail = users.find((user) => user.email === email)

    if(existingEmail){
      alert("Email already exists")
      return
    }
    const existingPhone = users.find((user)=> user.phone === phone)

    if(existingPhone){
      alert("Phone NUmber Already Exists")
      return
    }

    const user = {
      name,
      email,
      phone,
      password,
      role : "Customer"
    }

    try {
      await registerUser(user)
      alert("Registration Successful")

      setName("")
      setEmail("")
      setPhone("")
      setPassword("")

      navigate("/login")
    } catch (error) {
      console.log(error);
    }
  }

  return <div>
    <h1>Register</h1>
    <input 
    type="text"
    placeholder="Enter name"
    value={name}
    onChange={(e)=>setName(e.target.value)}
    />
    <br />
    <br />
    <input type="email"
    placeholder="Enter Email"
    value={email}
    onChange={(e)=>setEmail(e.target.value)} />
    <br />
    <br />
    <input type="text"
    placeholder="Enter Phone"
    value={phone}
    onChange={(e)=>setPhone(e.target.value)} />
    <br />
    <br />

    <input type="password"
    placeholder="Enter Password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)} />

    <button onClick={handleRegister} >Register</button>
  </div>;
};

export default Register;
