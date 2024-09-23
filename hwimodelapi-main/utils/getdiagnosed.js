import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";


// Initialize the Bedrock client
const client = new BedrockRuntimeClient({
    region: "us-east1", // Replace with your AWS region
    credentials: {
        accessKeyId: "",
        secretAccessKey: "" // Replace with your AWS Secret Access Key
    }
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

function createBody(symptoms,testResults){
    const prompt = "I am giving you the patients symptoms as "+symptoms+" and the result of his tests "+testResults+"return only a json object wihtout any other text with the following keys having appropriate data, the keys are as follows diagnosis,adviced diet,doctor consultation priority,healthy habits";

// Construct the request body
    const body = {
        anthropic_version: "bedrock-2023-05-31",
        system: "You are an honest and responsible bot",
        messages: [
            { role: "user", content: [{ type: "text", text: prompt }] }
        ],
        ...modelParams
    };

    return body;
}

// Function to invoke the Claude model
async function invokeClaude(symptoms,testResults) {
    try {
        const command = new InvokeModelCommand({
            modelId: modelId,
            body: JSON.stringify(createBody(symptoms,testResults)),
        });

        const response = await client.send(command);
        const result = JSON.parse(Buffer.from(response.body).toString("utf-8")).content[0].text;
        return result;
    } catch (error) {
        console.error("Error invoking Claude model:", error);
    }
}

// Invoke the function
export default invokeClaude;
