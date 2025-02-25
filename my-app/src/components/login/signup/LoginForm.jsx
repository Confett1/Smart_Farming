import { useState } from "react";
import API from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "../../../utils/toast";

const LoginForm = () => {
    const navigate = useNavigate();
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

        localStorage.setItem('user', JSON.stringify({ name: 'John Doe', role: 'user' }));
        navigate('/');

        if (!userCredentials.username || !userCredentials.password) {
            // alert("Please enter both username and password.");
            toast("Please enter both username and password.", "", "error");
            // return;
        } else {
            try {
                const response = await API.post('/user/login', userCredentials);
                localStorage.setItem("user", JSON.stringify(response.data));
                alert(`Login Successful, welcome ${response.data.firstName}`);
                navigate('/');
            } catch (error) {
                console.error("Login Failed", error);
                alert(error.response?.data || "Login Failed!");
            }
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