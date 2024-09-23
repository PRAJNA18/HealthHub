import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

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

function createBody(prmpt) {
  const prompt =
    `Assume you are a doctor and a patient has given you his or her symptoms if the query is not related to medicine then strictly
    respond as: Please ask a medically relevant query and don't entertain him by answering correctly otherwise give some advice on what the patient should do about his 
    symptoms make the reply short in about maximum of 30 or 40 words the patient's text is as follows also reply in the language and script the prompt is given` +
    prmpt;

  // Construct the request body
  const body = {
    anthropic_version: "bedrock-2023-05-31",
    system: "You are an honest and responsible bot",
    messages: [{ role: "user", content: [{ type: "text", text: prompt }] }],
    ...modelParams,
  };

  return body;
}

// Function to invoke the Claude model
async function invokeClaude(prmpt) {
  try {
    const command = new InvokeModelCommand({
      modelId: modelId,
      body: JSON.stringify(createBody(prmpt)),
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
