import React, { useEffect, useState } from "react";
import axios from "axios";

function Results() {
  const [data, setData] = useState(null); // State for storing cards data
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const testreports = localStorage.getItem("testresults");
        const symptoms = localStorage.getItem("symptoms");

        // API call with userId as a query parameter
        const response = await axios.post(
          "http://localhost:8443/api/v1/model/get-diagnosed",
          { symptoms, testreports }
        );
          console.log();
          setData(JSON.parse(response.data.data)); // Update the state with the fetched data
      } catch (err) {
        setError(err.message); // Handle any errors
      }
    };

    fetchCards(); // Call the function to fetch data
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {data ? (
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg space-y-4">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">
            Diagnosis Results
          </h1>

          <div className="bg-blue-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-800">Diagnosis:</h2>
            <p className="text-gray-700 mt-2">{data.diagnosis}</p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-green-800">
              Adviced Diet:
            </h2>
            <p className="text-gray-700 mt-2">{data.advicedDiet}</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-yellow-800">
              Doctor Consultation Priority:
            </h2>
            <p className="text-gray-700 mt-2">
              {data.doctorConsultationPriority}
            </p>
          </div>

          <div className="bg-purple-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-purple-800">
              Healthy Habits:
            </h2>
            <p className="text-gray-700 mt-2">{data.healthyHabits}</p>
          </div>
        </div>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}
    </div>
  );
}

export default Results;
