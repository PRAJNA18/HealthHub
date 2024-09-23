import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

// Connect to the database
connectDB();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Filename
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

// Endpoint for handling file upload
// , upload.single('image')
app.post("/upload", upload.single("image"), async (req, res) => {
  if (req.file) {
    var imageUrl = req.file.path;
    //console.log("File uploaded to Cloudinary:", req.file.path);
    console.log("hello2");
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("File uploaded to Cloudinary:", result.secure_url);
    // Respond with the URL of the uploaded file
    console.log(result.secure_url);
    var response = await axios.post(
      `http://localhost:8443/api/v1/model/img-to-url?url=${result.secure_url}`,
      {}
    );
    console.log(response.data.data);

    res.status(200).json(response.data.data);

    // 3rd api call
    //json
  } else {
    console.log("no");
    return res.status(400).send("No file uploaded.");
  }
  return res.status(200);
});
// Initialize express app

// Routes
app.use("/api/users", userRoutes);
const client = new BedrockRuntimeClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

const modelId = "anthropic.claude-3-sonnet-20240229-v1:0";
const modelParams = {
  max_tokens: 2048,
  temperature: 0.1,
  top_k: 250,
  top_p: 1,
  stop_sequences: ["\n\nHuman"],
};

async function invokeClaude(userData) {
  const prompt = `Assume you are a Doctor. Given the following lifestyle data of a user:

    Physical Activity:
    - Daily steps: ${userData.daily_steps}
    - Exercise duration (minutes): ${userData.exercise_duration_minutes}
    - Calories burned: ${userData.calories_burned}

    Sleep:
    - Total sleep hours: ${userData.total_sleep_hours}
    - Body Temperature in deg: ${userData.temperature}

    Heart Health:
    - Resting heart rate: ${userData.resting_heart_rate}

    Blood Oxygen:
    - SPO2 level: ${userData.SPO2Level}

    Nutrition and Hydration:
    - Caloric intake: ${userData.caloric_Intake}
    - Water intake (liters): ${userData.water_Intake}
    - Protein intake (grams): ${userData.protein_Intake}

    Generate personalized suggestions to improve overall lifestyle and health based on provided user data. The output should be in JSON format, structured as key-value pairs,
    score: A value between 1 and 10 representing the current state.
    message: A short message (1-2 sentences) summarizing the current state.
    recommendations: A JSON object containing:
    recommendation: A JSON object containing:
    action: A brief actionable insight (around 20 words).
    details: Additional context or steps to take (around 30 words).
    The JSON should only have the following keys score, message, recommendation,action,details`;

  const body = {
    anthropic_version: "bedrock-2023-05-31",
    system: "You are an honest and helpful bot.",
    messages: [{ role: "user", content: [{ type: "text", text: prompt }] }],
    ...modelParams,
  };

  try {
    const command = new InvokeModelCommand({
      modelId: modelId,
      body: JSON.stringify(body),
    });

    const response = await client.send(command);
    const result = JSON.parse(Buffer.from(response.body).toString("utf-8"))
      .content[0].text;
    return result;
  } catch (error) {
    console.error("Error invoking Claude model:", error);
    throw error;
  }
}

app.post("/get-suggestions", async (req, res) => {
  try {
    const userData = req.body;
    const suggestions = await invokeClaude(userData);
    console.log(suggestions);
    //  var data = JSON.parse( suggestions);
    res.status(200).json(suggestions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

// Start server
const PORT = 4000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Optional: Add a global error handler middleware for express
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
