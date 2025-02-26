import { useState } from "react";
import API from "../../../api/api";

const SignupForm = ({onSignupSuccess}) => {
    const [userDetails, setUserDetails] = useState({
        username: "",
        password: "",
        email: "",
        firstName: "",
        middleName: "",
        lastName: "",
        suffix: "",
        role: "member",
        birthday: "",
    });

    const [profileImage, setProfileImage] = useState(null);

    const handleFileChange = (e) => {
      setProfileImage(e.target.files[0]);
    }

    const handleChange = (e) => {
        setUserDetails({
            ...userDetails, 
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("user", new Blob([JSON.stringify(userDetails)], {type: "application/json"}));
        if (profileImage) {
          formData.append("file", profileImage);
        }
  
        try {
          const response = await API.post('/user/signup', formData, {
            headers: {"Content-Type": "multipart/form-data"},
          });

          alert(response.data);
          
          onSignupSuccess();
  
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
          setProfileImage(null);  
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
            <input type="text" placeholder="First Name" name="firstName" onChange={handleChange} value={userDetails.firstName} className="w-full p-2 mb-2 border rounded" required />
            <input type="text" placeholder="Middle Name" name="middleName" onChange={handleChange} value={userDetails.middleName} className="w-full p-2 mb-2 border rounded"  />
            <input type="text" placeholder="Last Name" name="lastName" onChange={handleChange} value={userDetails.lastName} className="w-full p-2 mb-2 border rounded" required />
            <input type="text" placeholder="Suffix (Jr, Sr, etc.)" name="suffix" onChange={handleChange} value={userDetails.suffix} className="w-full p-2 mb-2 border rounded"  />
            <input type="date" name="birthday" onChange={handleChange} className="w-full p-2 mb-2 border rounded" value={userDetails.birthday} required />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} className="w-full p-2 mb-2 border rounded" value={userDetails.email} required />

            {/* New File Input for Profile Image */}
            <h3 className="text-lg font-semibold mt-4 mb-2">Profile Image</h3>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 mb-2 border rounded" />
            
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
              Sign Up
            </button>
          </form>
    );
}

export default SignupForm;