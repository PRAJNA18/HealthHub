import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/users/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log("Logged in successfully:", data);
      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error.response.data.message);
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        {/* Left side - Sign In */}
        <div className="w-full md:w-1/2 p-12 bg-white flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            Sign In
          </h2>
          <form onSubmit={handleLogin} className="mt-8">
            <div className="mb-6">
              <label className="block text-lg text-gray-700">Username</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Username"
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <input type="checkbox" id="rememberMe" className="mr-2" />
                <label htmlFor="rememberMe" className="text-sm text-gray-700">
                  Remember Me
                </label>
              </div>
              <button className="text-sm text-pink-500 hover:underline">
                Forgot Password
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-3 text-white bg-gradient-to-r from-pink-500 to-pink-400 rounded-md hover:from-pink-600 hover:to-pink-500"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>

        {/* Right side - Welcome */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-r from-pink-500 to-pink-400 text-white flex-col justify-center items-center">
          <h2 className="text-3xl font-bold">Welcome to HealthHub</h2>
          <p className="mt-4 text-lg">Don't have an account?</p>
          <button
            onClick={handleSignupClick}
            className="mt-6 px-6 py-3 bg-white text-pink-500 font-semibold rounded-md hover:bg-gray-100"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
