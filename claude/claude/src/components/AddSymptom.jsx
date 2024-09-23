import React from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid"; // Import the Plus icon

const AddSymptom = () => {
  const navigate = useNavigate();

  // Function to handle button click
  const submitHandler = () => {
    navigate("/addsymptom");
  };

  return (
    <div className="w-80 h-96 bg-white shadow-md rounded-lg text-gray-800 transform hover:scale-105 transition-transform duration-300 flex items-center justify-center">
      <button
        className="bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex flex-col items-center justify-center w-full h-full space-y-4"
        onClick={submitHandler}
      >
        <h1 className="text-xl">Diagnose Yourself</h1>
        <PlusIcon className="h-12 w-12" />
      </button>
    </div>
  );
};

export default AddSymptom;
