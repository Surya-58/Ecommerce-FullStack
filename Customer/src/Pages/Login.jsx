import React, { use, useState , useContext } from "react";
import { getUsers } from "../Services/userApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";


const Login = () => {
  
  const navigate = useNavigate();

  const {setCurrentUser} = useContext(UserContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const users = await getUsers();

    const user = users.find(
      (item) => item.email === email && item.password === password,
    );
    if(!user){
      alert("Invalid Email or Password")
      return;
    }
    setCurrentUser(user)
    localStorage.setItem("currentUser",JSON.stringify(user))
    alert("Login Successful")
    navigate("/")
    
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
