import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Dashboard from './Pages/Dashboard.jsx'
import Add from "./Pages/Add.jsx";
import Upload from "./Pages/Upload.jsx";
import RecordAudio from "./Pages/RecordAudio.jsx";
import Results from "./Pages/Results.jsx";
import Monitoring from "./Pages/Monitoring.jsx";
import Home from "./Pages/Home.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/addsymptom" element={<Add />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/results" element={<Results />} />
      <Route path="/virtual-doctor" element={<RecordAudio />} />
      <Route path="/monitoring" element={<Monitoring />} />
      <Route path="/home" element={<Home/>} />
    </Routes>
  );
}

export default App;
