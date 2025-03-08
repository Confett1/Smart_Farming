// import { useState } from "react";
// import API from "../../../api/api";
// import { useNavigate } from "react-router-dom";
// import { toast } from "../../../utils/toast";

// const LoginForm = () => {
//     const navigate = useNavigate();
//     const [userCredentials, setUserCredentials] = useState({
//         username: "",
//         password: "",
//     });

//     const handleChange = (e) => {
//         setUserCredentials({
//             ...userCredentials,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         if (!userCredentials.username || !userCredentials.password) {
//             // alert("Please enter both username and password.");
//             toast("Please enter both username and password.", "", "error");
//             // return;
//         } else {
//             try {
//                 const response = await API.post('/user/login', userCredentials);
//                 localStorage.setItem("user", JSON.stringify(response.data));
//                 alert(`Login Successful, welcome ${response.data.firstName}`);
//                 navigate('/');
//             } catch (error) {
//                 console.error("Login Failed", error);
//                 alert(error.response?.data || "Login Failed!");
//             }
//         }
//     }

//     return (
//         <form onSubmit={handleLogin}>
//             <input
//                 type="text"
//                 placeholder="Username"
//                 name="username"
//                 onChange={handleChange}
//                 value={userCredentials.username}
//                 className="w-full p-2 mb-2 border rounded"
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 name="password"
//                 onChange={handleChange}
//                 value={userCredentials.password}
//                 className="w-full p-2 mb-2 border rounded"
//             />
//             <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
//                 Login
//             </button>
//         </form>
//     );
// }

// export default LoginForm;



import { useState } from "react";
// import API from "../../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../../../utils/toast";
import API from "../../../api/api";

const login = [
  {
    username: "user1",
    password: "pass123",
    role: "user"
  }
]

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

        if (!userCredentials.username || !userCredentials.password) {
            // alert("Please enter both username and password.");
            toast("Please enter both username and password.", "", "error");
            return;
        } else {
            try {
                const response = await API.post('/user/login', userCredentials);
                localStorage.setItem("user", JSON.stringify(response.data));
                const toastResponse = await toast(`Login Successful, welcome ${response.data.firstName}`, "", "success");

                if (toastResponse.isConfirmed) {
                  navigate('/');
                }
                navigate('/');
            } catch (error) {
                console.error("Login Failed", error);
                toast(error.response?.data || "Login Failed!", "", "error");
            }

            if (userCredentials.username == "user1" && userCredentials.password == "pass123") {
              localStorage.setItem("user", JSON.stringify(login));
              navigate('/');
            }
        }
    }

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-blue-300 to-green-600 flex justify-center items-center">
      {/* Background Shapes */}
      {/* <div className="absolute w-[430px] h-[520px] transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-r from-[#1845ad] to-[#23a2f6] -left-[80px] -top-[80px]"></div>
        <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-r from-[#3bc928] to-[#08770e] -right-[30px] -bottom-[80px]"></div>
      </div> */}

      {/* Login Form */}
      <form onSubmit={handleLogin} className="relative w-[400px] p-[50px_35px] bg-white bg-opacity-13 backdrop-blur-sm border-2 border-white/10 rounded-md shadow-[0_0_3px_#6c746c]">
        <h3 className="text-center text-2xl font-medium text-[#45c44b]">Login Here</h3>

        <label htmlFor="username" className="block mt-[30px] text-xs font-normal text-[#6c746c]">Username</label>
        <input 
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={userCredentials.username}
          id="username" 
          className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"/>

        <label htmlFor="password" className="block mt-[14px] text-xs font-normal text-[#6c746c]">Password</label>
        <input 
          type="password"
          name="password"
          onChange={handleChange}
          value={userCredentials.password}
          placeholder="Password" 
          id="password" 
          className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"/>

        <button 
          type="submit" 
          className="mt-[15px] w-full py-2 border bg-[#45c44b] text-[#f0f0f0] text-md font-semibold rounded-full cursor-pointer duration-300 hover:bg-green-400 hover:duration-300"
        >
          Login
          </button>
        
        <div className="text-xs text-center mt-6 -mb-4">
          <p>Dont have an account yet?
            <Link to={"/register"} className="text-green-700"> Sign-up here.</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
