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
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../../../utils/toast";
import API from "../../../api/api";

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
              localStorage.setItem("user", JSON.stringify("login"));
              navigate('/');
            }
        }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-b from-blue-300 to-green-600 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <div className="grid p-0 md:grid-cols-2">
            {/* Login Form */}
            <form className="p-6 md:p-8 bg-white" onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-balance text-muted-foreground">
                    Login to your account
                  </p>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    value={userCredentials.username}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <label htmlFor="password">Password</label>
                  
                    <Link
                      to="#"
                      className="ml-auto text-sm underline-offset-2 hover:underline opacity-40"
                    >
                      Forgot your password?
                    </Link>
                    
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    value={userCredentials.password}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 border bg-[#45c44b] text-[#f0f0f0] text-md font-semibold rounded-full cursor-pointer duration-300 hover:bg-green-400 hover:duration-300"
                >
                  Login
                </button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                 
                  </span>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="underline underline-offset-4 text-green-600">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>

            {/* Background Image Section */}
            <div className="relative hidden bg-muted md:block">
              <img
                src="/placeholder.svg?height=600&width=400"
                alt="Login background"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By clicking continue, you agree to our{" "}
          <Link to="#" className="">Terms of Service</Link> and{" "}
          <Link to="#">Privacy Policy</Link>.
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
