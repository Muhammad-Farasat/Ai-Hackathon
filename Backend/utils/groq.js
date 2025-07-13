import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const getVoiceActionFromGroq = async (command) => {
  try {
    const prompt = `
You are a voice assistant for an e-commerce website.
Based on the voice command, return only a JSON object with the structure:
{
  "action": "navigate" | "click" | "speak",
  "path": string | null,
  "elementId": string | null,
  "message": string | null
}
Voice Command: "${command}"
`;

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192", 
      messages: [
        { role: "system", content: "You are an assistant that formats commands into valid JSON." },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" }, 
      temperature: 0.2,
    });

    const reply = completion.choices[0].message.content;
    return JSON.parse(reply);

  } catch (err) {
    console.error("🔥 Groq API Error:", err);
    return {
      action: "speak",
      path: null,
      elementId: null,
      message: "Sorry, I couldn't understand your command.",
    };
  }
};