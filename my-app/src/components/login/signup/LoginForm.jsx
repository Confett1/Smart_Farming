import { useState } from "react";
import API from "../../../api/api";

const LoginForm = () => {
    const [userCredentials, setUserCredentials] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setUserCredentials({
          ...userCredentials, 
          [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!userCredentials.username || !userCredentials.password) {
            alert("Please enter both username and password.");
            return;
        }

        try {
            const response = await API.post('/user/login', userCredentials);
            localStorage.setItem("user", JSON.stringify(response.data));
            alert(`Login Successful, welcome ${response.data.firstName}`);
        } catch (error) {
            console.error("Login Failed", error);
            alert(error.response?.data || "Login Failed!");
        }
    }

 return (
    <form onSubmit={handleLogin}>
        <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            value={userCredentials.username}
            className="w-full p-2 mb-2 border rounded"
        />
        <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={userCredentials.password}
            className="w-full p-2 mb-2 border rounded"
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Login
        </button>
    </form>
 );   
}

export default LoginForm;