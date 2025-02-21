import { useState } from "react";
import API from "../../../api/api";

const SignupForm = () => {
    const [userDetails, setUserDetails] = useState({
        username: "",
        password: "",
        email: "",
        firstName: "",
        middleName: "",
        lastName: "",
        suffix: "",
        role: "user",
        birthday: "",
    });

    const handleChange = (e) => {
        setUserDetails({
            ...userDetails, 
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
  
        try {
          const response = await API.post('/user/signup', userDetails);
          alert(response.data);
  
          setUserDetails({
            username: "",
            password: "",
            email: "",
            firstName: "",
            middleName: "",
            lastName: "",
            suffix: "",
            role: "user",
            birthday: "",
          });
  
        } catch (error) {
          console.error("Signup Error", error);
          alert(error.response?.data || "Signup Failed!");
        }
    }

    return (
        <form onSubmit={handleSignup}>
            <h3 className="text-lg font-semibold mb-2">Account Details</h3>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} value={userDetails.username} required className="w-full p-2 mb-2 border rounded" />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} value={userDetails.password} className="w-full p-2 mb-2 border rounded" required />
            
            <h3 className="text-lg font-semibold mt-4 mb-2">Personal Details</h3>
            <input type="text" placeholder="First Name" name="firstName" onChange={handleChange} value={userDetails.firstName} className="w-full p-2 mb-2 border rounded" required />
            <input type="text" placeholder="Middle Name" name="middleName" onChange={handleChange} value={userDetails.middleName} className="w-full p-2 mb-2 border rounded"  />
            <input type="text" placeholder="Last Name" name="lastName" onChange={handleChange} value={userDetails.lastName} className="w-full p-2 mb-2 border rounded" required />
            <input type="text" placeholder="Suffix (Jr, Sr, etc.)" name="suffix" onChange={handleChange} value={userDetails.suffix} className="w-full p-2 mb-2 border rounded"  />
            <input type="date" name="birthday" onChange={handleChange} className="w-full p-2 mb-2 border rounded" value={userDetails.birthday} required />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} className="w-full p-2 mb-2 border rounded" value={userDetails.email} required />
            
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
              Sign Up
            </button>
          </form>
    );
}

export default SignupForm;