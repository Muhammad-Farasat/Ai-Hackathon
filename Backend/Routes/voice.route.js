import express from "express";
// 1. CHANGE THE IMPORT
// Import the new Gemini function from its file
import { getVoiceActionFromGemini, getChatbotResponse } from "../utils/openai.js";

const router = express.Router();

router.post("/command", async (req, res) => {
  const { command } = req.body;

  // 2. CHANGE THE FUNCTION CALL
  // Call the new Gemini function instead of the old OpenAI one
  const action = await getVoiceActionFromGemini(command);
  
  // The rest of the code stays exactly the same
  res.json(action);
});

// NEW: Chatbot route for conversational responses
router.post("/chat", async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await getChatbotResponse(message, conversationHistory);
    
    res.json({ 
      success: true, 
      response,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Chatbot route error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Internal server error" 
    });
  }
});

export default router;