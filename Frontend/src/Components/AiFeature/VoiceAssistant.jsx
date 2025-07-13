import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const VoiceAssistant = () => {
  const recognitionRef = useRef(null);
  const navigate = useNavigate();
const handleCommand = (text) => {
  const command = text.toLowerCase();
  console.log("🧠 Heard:", command);

  if (command.includes("cart")) {
    console.log("🛒 Navigating to /cart");
    navigate("/cart");
  } else if (command.includes("add to cart")) {
    const addBtn = document.querySelector("#add-to-cart-btn");
    if (addBtn) {
      addBtn.click();
      console.log("✅ Clicked: add to cart");
    } else {
      console.log("❌ Add to cart button not found");
    }
  } else if (command.includes("men") || command.includes("man")) {
    console.log("🧔 Navigating to /mens");
    navigate("/mens");
  } else if (command.includes("women") || command.includes("woman")) {
    console.log("👩 Navigating to /womens");
    navigate("/womens");
  } else if (command.includes("kids") || command.includes("kid")) {
    console.log("🧒 Navigating to /kids");
    navigate("/kids");
  } else {
    console.log("❓ No match found for:", command);
  }

  const msg = new SpeechSynthesisUtterance("Command executed");
  speechSynthesis.speak(msg);
};

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      handleCommand(transcript);
    };
    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={startListening}
        className="p-4 rounded-full bg-black text-white shadow-lg"
      >
        🎤
      </button>
    </div>
  );
};

export default VoiceAssistant;