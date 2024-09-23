import React, { useState } from "react";
import invokeClaude from "../invokeClaude.js"; // Adjust the path accordingly
import axios from "axios";

function RecordAudio() {
  const [transcription, setTranscription] = useState("");
  const [response, setResponse] = useState(""); // State to store Claude 3's response
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState("");

  const startRecording = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      setError("Your browser does not support Speech Recognition.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsRecording(true);
    setTranscription("");
    setError("");

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setTranscription(transcript);
      setIsRecording(false);

      try {
        // Sending the transcription to Claude 3 and getting the response
        console.log(transcript)
        const text = transcript; // Assuming transcript contains symptoms
        console.log(text);
        const result = await axios.post(
          "http://localhost:8443/api/v1/model/virtual-doctor",
          {
            text
          }
        );
        console.log(result.data.data)
        setResponse(result.data.data); // Display formatted JSON
      } catch (error) {
        setError("Failed to get a response from Claude 3.");
      }
    };

    recognition.onerror = (event) => {
      setError(`Error occurred in recognition: ${event.error}`);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  };

  const stopRecording = () => {
    if (isRecording) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Hello there! I am your Virtual Doctor<br />
        How are you feeling today?
      </h1>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-6 py-3 rounded-lg text-white font-semibold mb-6 ${
          isRecording
            ? "bg-red-600 hover:bg-red-700"
            : "bg-green-600 hover:bg-green-700"
        } transition-colors duration-300`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {transcription && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl text-center">
          <h2 className="text-2xl font-semibold mb-4">Transcription:</h2>
          <p className="text-gray-800">{transcription}</p>
        </div>
      )}
      {response && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl text-center mt-4">
          <h2 className="text-2xl font-semibold mb-4">Virtual Doctor: </h2>
          <pre className="text-gray-800 whitespace-pre-wrap">{response}</pre>
        </div>
      )}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}

export default RecordAudio;
