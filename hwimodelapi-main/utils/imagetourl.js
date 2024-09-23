import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import axios from "axios";

// Initialize the Bedrock client
const client = new BedrockRuntimeClient({
  region: "us-east1", // Replace with your AWS region
  credentials: {
    accessKeyId: "",
    secretAccessKey: "", // Replace with your AWS Secret Access Key
  },
});

// Define the model ID and parameters
const modelId = "anthropic.claude-3-sonnet-20240229-v1:0";
const modelParams = {
  max_tokens: 2048,
  temperature: 0.1,
  top_k: 250,
  top_p: 1,
  stop_sequences: ["\n\nHuman"],
};

// Define the input prompt with an image URL

function createBody(base64image) {
  const prompt = `Assume you are a doctor therefore extract the relevant medical reports from the image and send in a json format`;

  // Construct the request body
  const body = {
    anthropic_version: "bedrock-2023-05-31",
    system: "You are an honest and responsible bot",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "image/jpeg", // Adjust this based on your image type
              data: base64image,
            },
          },
        ],
      },
    ],
    ...modelParams,
  };

  return body;
}

// Function to invoke the Claude model
async function invokeClaude(img_url) {
  try {
    const res = await axios.get(img_url, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(res.data, "binary");
    const base64Image = imageBuffer.toString("base64");
    const command = new InvokeModelCommand({
      modelId: modelId,
      body: JSON.stringify(createBody(base64Image)),
    });

    const response = await client.send(command);
    const result = JSON.parse(Buffer.from(response.body).toString("utf-8"))
      .content[0].text;
    return result;
  } catch (error) {
    console.error("Error invoking Claude model:", error);
  }
}

// Invoke the function
export default invokeClaude;
