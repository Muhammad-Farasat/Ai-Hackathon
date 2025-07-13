// NEW: Import the GoogleGenerativeAI class
import { GoogleGenerativeAI } from '@google/generative-ai';

// NEW: Initialize the Google AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getVoiceActionFromGemini = async (command) => {
  try {
    // 1. Get the generative model
    // We specify the model and a generation confi  g to force JSON output
    const model = genAI.getGenerativeModel({
      model: "gemini-1.0-pro", // The powerful and free-to-use model
      generationConfig: {
        responseMimeType: "application/json", // This is the key for JSON Mode
      },
    });

    // 2. Define the prompt
    // The prompt is slightly simpler now, as we don't need to over-explain the JSON structure.
    // Gemini knows from the `responseMimeType` that it MUST return JSON.
    const prompt = `
You are a voice assistant for an e-commerce website.
Based on the voice command, determine the user's intent.
The possible actions are "navigate", "click", or "speak".

- For navigation, provide a URL path (e.g., "/cart", "/products/123").
- For clicks, provide the elementId of the button or link (e.g., "add-to-cart-btn").
- If the command is unclear or a general question, use the "speak" action to reply.

Return a JSON object with this exact schema:
{
  "action": "navigate" | "click" | "speak",
  "path": string | null,
  "elementId": string | null,
  "message": string | null
}

Voice Command: "${command}"
`;

    // 3. Generate the content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text();

    // 4. Parse the JSON text directly
    // No need for regex, as Gemini's JSON mode guarantees valid JSON output.
    const json = JSON.parse(jsonText);
    return json;

  } catch (err) {
    console.error("🔥 Gemini API Error:", err);
    // Return a fallback response in case of an API error
    return {
      action: "speak",
      path: null,
      elementId: null,
      message: "Sorry, I'm having a little trouble right now. Please try again.",
    };
  }
};

// NEW: Chatbot function for conversational responses
export const getChatbotResponse = async (message, conversationHistory = []) => {
  try {
    // Check if API key exists
    console.log("🔍 Checking environment variables...");
    console.log("All env vars:", Object.keys(process.env).filter(key => key.includes('GEMINI')));
    
    if (!process.env.GEMINI_API_KEY) {
      console.error("❌ GEMINI_API_KEY is not set in environment variables");
      console.error("Available env vars:", Object.keys(process.env));
      return "I'm sorry, my configuration is incomplete. Please contact support.";
    }

    console.log("🔑 Using Gemini API key:", process.env.GEMINI_API_KEY.substring(0, 10) + "...");

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // Create context-aware prompt
    const prompt = `
You are a friendly and helpful AI assistant for an e-commerce clothing store called "URBANFABRIC". 
You help customers with product inquiries, shopping assistance, and general questions.

Context about the store:
- We sell clothing for Men, Women, and Kids
- We have categories like casual wear, formal wear, sportswear
- We offer various sizes and have a shopping cart system
- We provide voice navigation and assistance

Please respond in a natural, conversational way as if you're talking to a real person.
Keep responses concise but helpful. You can ask follow-up questions if needed.

Previous conversation context:
${conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

Current user message: "${message}"

Please respond naturally:
`;

    console.log("📤 Sending request to Gemini API...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    console.log("✅ Gemini API response received:", responseText.substring(0, 100) + "...");
    return responseText;

  } catch (err) {
    console.error("🔥 Chatbot Gemini API Error Details:");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Error stack:", err.stack);
    
    // Check for specific error types
    if (err.message.includes("API_KEY")) {
      return "I'm sorry, there's an issue with my API configuration. Please check your Gemini API key.";
    } else if (err.message.includes("quota") || err.message.includes("rate")) {
      return "I'm sorry, I've reached my usage limit. Please try again later.";
    } else if (err.message.includes("network") || err.message.includes("fetch")) {
      return "I'm sorry, I'm having network connectivity issues. Please check your internet connection.";
    } else {
      return "I'm sorry, I'm having trouble understanding right now. Please try again.";
    }
  }
};