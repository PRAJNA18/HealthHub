// Import the necessary modules
// Send the URL in the format (next line)
//localhost:8443/model/api/v1/img-to-url?url=[Enter URL Here]
import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import invokeClaude from "./utils/imagetourl.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(bodyParser.json()); // Parse incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // Parse incoming requests with URL-encoded payloads

// Define a simple route
app.get('/api/v1/model', (req, res) => {
  res.send('Hello, World!');
});

// importing api routes

import apiRouter from "./routes/api.routes.js"

// routes declaration

app.use("/api/v1/model",apiRouter)


// Define a 404 route for undefined routes
app.use((req, res) => {
  res.status(404).send('404: Page not found');
});

// Start the server
const PORT = process.env.PORT || 8443;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

