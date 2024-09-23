import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [image, setImage] = useState(null);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true); // Show loading indicator

    try {
      const res = await axios.post("http://localhost:4000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setData(res);
      localStorage.removeItem("testresults");
      localStorage.setItem("testresults", res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const handleAnalyzeReport = (e) => {
    e.preventDefault();
    navigate("/results");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Upload a Report
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-4"
        >
          <label className="w-full text-center">
            <span className="sr-only">Choose file</span>
            <input
              type="file"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="cursor-pointer px-4 py-2 text-blue-600 bg-blue-100 rounded-lg border border-blue-300 hover:bg-blue-200 transition-colors duration-300">
              Choose File
            </div>
          </label>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin h-8 w-8 border-4 border-t-4 border-blue-600 border-solid rounded-full"></div>
          </div>
        )}
        {data && !loading && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Uploaded Successfully
            </h2>
            <button
              onClick={handleAnalyzeReport}
              className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300"
            >
              Analyze Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;
