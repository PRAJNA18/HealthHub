import axios from "axios";

const API_URL = "http://localhost:8443/api/v1/model/get-diagnosed";

// Function to create the request body
function createBody(symptoms, testResults) {
  const prompt = `I am giving you the patient's symptoms as ${symptoms} and the result of his tests ${testResults}. Return only a JSON object without any other text with the following keys having appropriate data: diagnosis, advised diet, doctor consultation priority, healthy habits.`;

  return {
    anthropic_version: "bedrock-2023-05-31",
    system: "You are an honest and responsible bot",
    messages: [{ role: "user", content: [{ type: "text", text: prompt }] }],
  };
}

// Function to invoke the Claude model
async function invokeClaude(symptoms, testResults) {
  try {
    const response = await axios.post(
      API_URL,
      createBody(symptoms, testResults),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Assuming the API returns JSON directly
  } catch (error) {
    console.error("Error invoking Claude model:", error);
    throw error; // Rethrow error for further handling
  }
}

export default invokeClaude;
