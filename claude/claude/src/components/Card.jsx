import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Card = ({ symptoms, tests, onDelete }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handler function for the button click
  const submitHandler = () => {
    localStorage.removeItem("symptoms");
    localStorage.setItem("symptoms", symptoms);
    console.log(localStorage.getItem("symptoms"));
    navigate("/upload"); // Navigate to the upload page
  };

  // Handler function for delete button click
  const deleteHandler = () => {
    onDelete(); // Call the delete function passed via props
  };

  return (
    <div className="relative w-80 h-96 p-6 bg-white border border-gray-300 shadow-lg rounded-lg text-gray-800 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300">
      {/* Delete button positioned at the top-right corner */}
      <button
        onClick={deleteHandler}
        className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full shadow-md transition-colors duration-300 hover:bg-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div>
        <h2 className="text-2xl font-bold mb-4">Diagnostic Event</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-1">Symptoms</h3>
          <p className="text-lg">{symptoms}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-1">Tests</h3>
          <p className="text-lg">{tests}</p>
        </div>
      </div>
      <div className="flex flex-col space-y-4 mb-4">
        <button
          onClick={submitHandler} // Attach submitHandler to button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Upload Report
        </button>
      </div>
    </div>
  );
};

export default Card;
