import React, { useState } from "react";
import axios from "axios";
import { useAppContext } from "../contexts/appContext";

const personas = ["friendly", "teacher", "sarcastic", "Doctor"];

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const { persona, setPersona } = useAppContext();

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, newMessage]);
    setUserInput("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, {
        message: userInput,
        persona,
      });

      setMessages((prev) => [...prev, { sender: "bot", text: res.data.response }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Something went wrong." }]);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Select Persona</h2>
        <div className="flex gap-3 mb-6">
          {personas.map((p) => (
            <button
              key={p}
              onClick={() => setPersona(p)}
              className={`py-1 px-4 rounded-md border ${
                persona === p
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 hover:bg-blue-100"
              } transition-all font-medium`}
            >
              {p}
            </button>
          ))}
        </div>

        {!showChat ? (
          <>
            <div className="mb-8 text-gray-700">
              <p className="mb-2">Welcome to the Multi-Persona ChatBot!</p>
              <p>Select a persona above, then click below to begin chatting.</p>
            </div>
            <button
              onClick={() => setShowChat(true)}
              className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition"
            >
              New Chat
            </button>
          </>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow p-4 mb-4 h-96 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-2 ${
                    msg.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block px-3 py-2 rounded-md ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
