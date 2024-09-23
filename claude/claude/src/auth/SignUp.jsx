import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/users/signup",
        {
          name,
          email,
          password,
          age,
          weight,
        }
      );
      // Store user data in local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log("Signed up successfully:", data);
      navigate("/home"); // Redirect to dashboard or home
    } catch (error) {
      console.error("Error during signup:", error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 font-poppins">
      <div className="flex shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        {/* Left side - Sign Up */}
        <div className="w-full md:w-1/2 p-12 bg-white flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            Sign Up
          </h2>
          <form onSubmit={handleSignup} className="mt-8">
            <div className="mb-4">
              <label className="block text-lg text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg text-gray-700">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Enter your age"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg text-gray-700">Weight</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Enter your weight"
                required
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-3 text-white bg-gradient-to-r from-pink-500 to-pink-400 rounded-md hover:from-pink-600 hover:to-pink-500"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <a href="/" className="text-pink-500 hover:underline">
              Login
            </a>
          </p>
        </div>

        {/* Right side - Welcome */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-r from-pink-500 to-pink-400 text-white flex-col justify-center items-center">
          <h2 className="text-3xl font-bold">Welcome to signup</h2>
          <p className="mt-4 text-lg">Join us today!</p>
          <a
            href="/"
            className="mt-6 px-6 py-3 bg-white text-pink-500 font-semibold rounded-md hover:bg-gray-100"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
