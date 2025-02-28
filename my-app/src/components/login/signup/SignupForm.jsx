// import { useState } from "react";
// import API from "../../../api/api";

// const SignupForm = ({onSignupSuccess}) => {
//     const [userDetails, setUserDetails] = useState({
//         username: "",
//         password: "",
//         email: "",
//         firstName: "",
//         middleName: "",
//         lastName: "",
//         suffix: "",
//         role: "member",
//         birthday: "",
//     });

//     const [profileImage, setProfileImage] = useState(null);

//     const handleFileChange = (e) => {
//       setProfileImage(e.target.files[0]);
//     }

//     const handleChange = (e) => {
//         setUserDetails({
//             ...userDetails, 
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSignup = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append("user", new Blob([JSON.stringify(userDetails)], {type: "application/json"}));
//         if (profileImage) {
//           formData.append("file", profileImage);
//         }

//         try {
//           const response = await API.post('/user/signup', formData, {
//             headers: {"Content-Type": "multipart/form-data"},
//           });

//           alert(response.data);

//           onSignupSuccess();

//           setUserDetails({
//             username: "",
//             password: "",
//             email: "",
//             firstName: "",
//             middleName: "",
//             lastName: "",
//             suffix: "",
//             role: "user",
//             birthday: "",
//           });
//           setProfileImage(null);  
//         } catch (error) {
//           console.error("Signup Error", error);
//           alert(error.response?.data || "Signup Failed!");
//         }
//     }

//     return (
//         <form onSubmit={handleSignup}>
//             <h3 className="text-lg font-semibold mb-2">Account Details</h3>
//             <input type="text" placeholder="Username" name="username" onChange={handleChange} value={userDetails.username} required className="w-full p-2 mb-2 border rounded" />
//             <input type="password" placeholder="Password" name="password" onChange={handleChange} value={userDetails.password} className="w-full p-2 mb-2 border rounded" required />
//             <input type="text" placeholder="First Name" name="firstName" onChange={handleChange} value={userDetails.firstName} className="w-full p-2 mb-2 border rounded" required />
//             <input type="text" placeholder="Middle Name" name="middleName" onChange={handleChange} value={userDetails.middleName} className="w-full p-2 mb-2 border rounded"  />
//             <input type="text" placeholder="Last Name" name="lastName" onChange={handleChange} value={userDetails.lastName} className="w-full p-2 mb-2 border rounded" required />
//             <input type="text" placeholder="Suffix (Jr, Sr, etc.)" name="suffix" onChange={handleChange} value={userDetails.suffix} className="w-full p-2 mb-2 border rounded"  />
//             <input type="date" name="birthday" onChange={handleChange} className="w-full p-2 mb-2 border rounded" value={userDetails.birthday} required />
//             <input type="email" placeholder="Email" name="email" onChange={handleChange} className="w-full p-2 mb-2 border rounded" value={userDetails.email} required />

//             {/* New File Input for Profile Image */}
//             <h3 className="text-lg font-semibold mt-4 mb-2">Profile Image</h3>
//             <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 mb-2 border rounded" />

//             <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
//               Sign Up
//             </button>
//           </form>
//     );
// }

// export default SignupForm;







import { useState } from "react";
import API from "../../../api/api";
import { toast } from "../../../utils/toast";
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@mui/joy"

const SignupForm = () => {
  // const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
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
  };

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // if (userDetails.password ==! confirmPassword) {
    //   toast("Password do not match", "", "error")
    // }

    const formData = new FormData();
    formData.append("user", new Blob([JSON.stringify(userDetails)], { type: "application/json" }));
    if (profileImage) {
      formData.append("file", profileImage);
    }

    try {
      const response = await API.post('/user/signup', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast(response.data, "", "success");
      // onSignupSuccess();
      navigate('/');

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
      toast(error.response?.data || "Signup Failed!", "", "error");
    }
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-blue-300 to-green-600 flex justify-center items-center">
      <form onSubmit={handleSignup} className="relative mx-3 w-[750px] p-[20px_35px] bg-white bg-opacity-13 backdrop-blur-sm border-2 border-white/10 rounded-md shadow-[0_0_3px_#6c746c]">
        <h3 className="text-left text-2xl font-medium text-[#45c44b] pb-2">Register</h3>
        <Divider />

        {/* First Group: Account Details */}
        <div className="flex mt-3">
          <div className="w-full grid gap-2">
            <div className="w-full pr-2">
              <label htmlFor="firstName" className="block text-xs font-normal text-[#6c746c]">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                value={userDetails.firstName}
                id="firstName"
                className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
                required
              />
            </div>

            <div className="w-full pr-2">
              <label htmlFor="middleName" className="block text-xs font-normal text-[#6c746c]">Middle Name</label>
              <input
                type="text"
                placeholder="Middle Name"
                name="middleName"
                onChange={handleChange}
                value={userDetails.middleName}
                id="middleName"
                className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
              />
            </div>

            <div className="w-full pr-2">
              <label htmlFor="lastName" className="block text-xs font-normal text-[#6c746c]">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
                value={userDetails.lastName}
                id="lastName"
                className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
                required
              />
            </div>

            <div className="w-full pr-2">
              <label htmlFor="suffix" className="block text-xs font-normal text-[#6c746c]">Suffix (Jr, Sr, etc.)</label>
              <input
                type="text"
                placeholder="Suffix"
                name="suffix"
                onChange={handleChange}
                value={userDetails.suffix}
                id="suffix"
                className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
              />
            </div>

            <div className="w-full pr-2">
              <label htmlFor="birthday" className="block text-xs font-normal text-[#6c746c]">Birthday</label>
              <input
                type="date"
                name="birthday"
                onChange={handleChange}
                value={userDetails.birthday}
                id="birthday"
                className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
                required
              />
            </div>
          </div>

          {/* Second Group: Profile Image */}
          <div className="w-full">
            <div className="w-full pl-2">
              <label htmlFor="email" className="block text-xs font-normal text-[#6c746c]">Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={userDetails.email}
                id="email"
                className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
                required
              />
            </div>
            <div className="w-full pl-2 pt-2">
              <label htmlFor="username" className="block text-xs font-normal text-[#6c746c]">Username</label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                value={userDetails.username}
                id="username"
                className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
                required
              />
            </div>

            <div className="w-full pl-2 pt-2">
              <label htmlFor="password" className="block text-xs font-normal text-[#6c746c]">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={userDetails.password}
                placeholder="Password"
                id="password"
                className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
                required
              />
            </div>
            {/* <div className="w-full pl-2 pt-2">
              <label htmlFor="password" className="block text-xs font-normal text-[#6c746c]">Password</label>
              <input
                type="password"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                id="confirmpassword"
                className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
                required
              />
            </div> */}
            <div className="pl-2 pt-2">
              <label htmlFor="profileImage" className="block text-xs font-normal text-[#6c746c]">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="profileImage"
                className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-between">
          <div className="text-xs text-center mt-6">
            <p>Already have an account?
              <Link to={"/login"} className="text-green-700"> Log in here.</Link>
            </p>
          </div>
          <button
            type="submit"
            className="mt-[15px] w-40 py-2 border bg-[#45c44b] text-[#f0f0f0] text-sm font-semibold rounded-full cursor-pointer duration-300 hover:bg-green-400 hover:duration-300"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
