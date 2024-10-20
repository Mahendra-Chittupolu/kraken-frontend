import React, { useState } from "react";
import "./ChatAssistant.css";

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "assistant" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      // Add user message to the chat
      setMessages([...messages, { text: input, sender: "user" }]);

      // Prepare the API request body
      const requestBody = {
        query: input, // Send the user input as "query"
      };

      // Send POST request to the API endpoint
      try {
        const response = await fetch("http://146.190.123.50:4000/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        // Add assistant response to the chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.response, sender: "assistant" },
        ]);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Sorry, something went wrong.", sender: "assistant" },
        ]);
        console.error("API Request failed:", error);
      }

      // Clear input field after sending message
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-toggle" onClick={toggleChatWindow}>
        {isOpen ? "Close" : "Chat"}
      </div>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h4>Chat Assistant</h4>
            <button onClick={toggleChatWindow} className="close-btn">
              x
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.sender}`}>
                {message.sender === "assistant" ? (
                  // Use dangerouslySetInnerHTML for assistant responses
                  <div
                    dangerouslySetInnerHTML={{
                      __html: message.text.replace(/\n/g, "<br/>"),
                    }}
                  />
                ) : (
                  // Render user messages as normal text
                  <span>{message.text}</span>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="chat-input-container">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="chat-input"
            />
            <button type="submit" className="send-btn">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
