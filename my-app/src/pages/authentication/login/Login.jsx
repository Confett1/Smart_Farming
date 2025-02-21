import { useState } from "react";
import LoginForm from "../../../components/login/signup/loginForm";
import SignupForm from "../../../components/login/signup/SignupForm";

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-[95vh] bg-gray-100">
      <div className="bg-gray-200 p-7 rounded-xl shadow-lg w-120">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        {!isSignUp ? (
          <LoginForm />
        ) : (
          <SignupForm />
        )}

        <p className="text-center mt-4">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Login here" : "Sign up here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;