import React, { useState } from "react";
import axios from "axios";
import { useAppContext } from "../contexts/appContext";

const personas = ["friendly", "teacher", "sarcastical", "Doctor"];

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const { persona, setPersona } = useAppContext();

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/chat`,
        {
          message: userInput,
          persona,
        },
        {
          withCredentials: true,
        }
      );

      const botMessage = { sender: "bot", text: res.data.bot };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.log(error.message);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error getting response from bot." },
      ]);
    }

    setUserInput("");
  };
  const handleNewChat = () => {
    setMessages([]);
    setUserInput("");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Multi-Persona Chatbot
      </h2>

      <div className="mb-4">
        <label className="mr-2 font-medium">Select Persona:</label>
        <select
          className="border rounded p-1"
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
        >
          {personas.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleNewChat}
        className="mb-2 ml-auto block bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
      >
        Clear Chat
      </button>

      <div className="h-80 overflow-y-auto border p-4 bg-gray-100 rounded mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block p-2 rounded-lg max-w-xs ${
                msg.sender === "user"
                  ? "bg-blue-300 text-black"
                  : "bg-green-300 text-black"
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
          className="border p-2 flex-grow rounded"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export { ChatPage };
