import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddSymptom = () => {
  const [symptomInput, setSymptomInput] = useState("");
  const [symptomsList, setSymptomsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading indicator

    const commaSeparatedString = symptomsList.join(", ");
    var jsobj = localStorage.getItem("userInfo");
    const userId = JSON.parse(jsobj)._id;

    try {
      await axios.post("http://localhost:4000/api/users/addsymptoms", {
        commaSeparatedString,
        userId,
      });
      console.log(commaSeparatedString);
      // Navigate to the dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Add a new symptom to the list
  const addSymptom = () => {
    if (symptomInput.trim()) {
      setSymptomsList([...symptomsList, symptomInput]);
      setSymptomInput(""); // Clear input field
    }
  };

  // Remove a symptom from the list
  const removeSymptom = (index) => {
    setSymptomsList(symptomsList.filter((_, i) => i !== index));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-lg p-8 bg-white shadow-md rounded-lg text-gray-900 flex flex-col items-center space-y-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Add Symptoms</h2>
        <form onSubmit={submitHandler} className="w-full space-y-4">
          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-700">
              New Symptom
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a symptom"
              />
              <button
                type="button"
                onClick={addSymptom}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Add
              </button>
            </div>
          </div>
          <ul className="list-none p-0 space-y-2">
            {symptomsList.map((symptom, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-100 text-gray-800 p-3 rounded-lg shadow-sm"
              >
                <span>{symptom}</span>
                <button
                  type="button"
                  onClick={() => removeSymptom(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-300"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
              </div>
            ) : (
              "Get Test Recommendation"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSymptom;
