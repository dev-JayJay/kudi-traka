import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import './admin.css'

// const socket = io("https://kudi-traka-backend-b4ccdze83-jay-jays-projects.vercel.app");
const socket = io("http://127.0.0.1:4040");
// const socket = io("https://kudi-traka-backend.vercel.app/");

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState("");

  useEffect(() => {
    // Register the admin when the component mounts
    socket.emit("register_admin");

    // Listen for new user messages
    socket.on("new_user_message", (data) => {
      console.log("Received message from user:", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("new_user_message");
    };
  }, []);

  const sendResponse = () => {
    if (!response.trim()) {
      alert("Please enter a response before sending.");
      return;
    }

    // Send response to the last active user
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.socketId) {
      socket.emit("admin_message", { message: response, userSocketId: lastMessage.socketId });
      setMessages((prev) => [
        ...prev,
        { text: response, sender: "admin", recipient: lastMessage.socketId },
      ]);
      setResponse("");
    } else {
      alert("No active users to respond to.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "400px", overflowY: "scroll" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: "left", marginBottom: "10px" }} className={`messageContainer ${msg.sender}`} >
            <p className="message">
              <strong className="message">{msg.sender.toUpperCase()}:</strong> {msg.text}
            </p>
          </div>
        ))}
      </div>
      <div className="input-container">
      <input
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="Type your response here..."
        style={{ width: "80%", marginRight: "10px" }}
        className="inputField"
      />
      <button onClick={sendResponse} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default AdminChat;
