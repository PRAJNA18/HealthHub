import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation
import Card from "../components/Card";
import AddSymptom from "../components/AddSymptom";

function Dashboard() {
  const [data, setData] = useState([]); // State for storing cards data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    localStorage.removeItem("userInfo"); // Clear user info from localStorage
    navigate("/"); // Redirect to the login page
  };

  const handleDelete = (index) => {
    setData(data.filter((items, id) => id !== index));
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        console.log("Fetching cards...");
        const jsobj = localStorage.getItem("userInfo");
        const userId = JSON.parse(jsobj)._id;

        // API call with userId as a query parameter
        const response = await axios.post(
          "http://localhost:4000/api/users/cards",
          { userId }
        );

        setData(response.data.reverse()); // Update the state with the fetched data
      } catch (err) {
        setError(err.message); // Handle any errors
      } finally {
        setLoading(false); // Set loading to false after the API call is done
      }
    };

    fetchCards(); // Call the function to fetch data
  }, []); // Empty dependency array to run only once on mount

  if (loading) return <p>Loading...</p>; // Show a loading message while fetching
  if (error) return <p>Error: {error}</p>; // Show an error message if there's an error

  const name = JSON.parse(localStorage.getItem("userInfo")).name;

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-100 p-8 font-poppins">
      {/* Logout Button positioned at the top right */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300"
      >
        Logout
      </button>

      {/* Centered Content */}
      <div className="w-full max-w-2xl text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Health Dashboard</h1>
        <h3 className="text-2xl font-medium mb-8">{"Welcome, " + name}</h3>
      </div>

      {/* Cards Section */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        <AddSymptom />
        {data.map((item, index) => (
          <Card
            key={index} // Using index as key for simplicity; consider using a unique ID if available
            symptoms={item.symptoms}
            tests={item.tests}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
