import React, { useState } from "react";

const Monitoring = () => {
  const [formData, setFormData] = useState({
    daily_steps: "",
    exercise_duration_minutes: "",
    calories_burned: "",
    total_sleep_hours: "",
    resting_heart_rate: "",
    temperature: "",
    caloric_Intake: "",
    protein_Intake: "",
    water_Intake: "",
    SPO2Level: "",
  });

  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const apiUrl = "http://localhost:4000/get-suggestions";

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await res.json();
      const jsobj = JSON.parse(result);
      setResponse(jsobj);
    } catch (error) {
      setResponse({ error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex flex-wrap w-full max-w-6xl bg-white rounded-lg shadow-md">
        <header className="w-full p-8 bg-blue-500 text-white rounded-t-lg">
          <h1 className="text-3xl font-semibold text-center">
            RealTime Health Monitoring 
          </h1>
        </header>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-4">Input Your Data</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label
                  htmlFor={key}
                  className="block text-lg font-medium text-gray-700"
                >
                  {key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                  :
                </label>
                <input
                  type="number"
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 p-8 bg-blue-50 flex flex-col items-center justify-center">
          {isLoading && (
            <p className="text-xl text-gray-700">Generating suggestions...</p>
          )}
          {response && !isLoading && (
            <div className="text-gray-700 space-y-4">
              <h2 className="text-2xl font-bold text-center mb-4">
                Your Lifestyle Score
              </h2>
              <p className="text-center text-lg">
                Score:{" "}
                <span className="font-semibold">{response.score}/10</span>
              </p>
              <p className="text-center text-lg">{response.message}</p>

              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Recommendations</h3>
                <ul className="list-disc list-inside space-y-2 text-lg">
                  {response.recommendations &&
                    response.recommendations.map((recommendation, index) => (
                      <li key={index}>
                        {recommendation.action}
                        <br />
                        <strong>Details:</strong> {recommendation.details}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
          {response?.error && !isLoading && (
            <p className="text-xl text-red-600">{response.error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
