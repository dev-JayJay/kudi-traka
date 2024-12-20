// import React, { useState } from "react";
// import "./chat.css";
// import axios from "axios";

// export const ChatWithMisa = () => {
//   const [text, setText] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [response, setResponse] = useState(null);

//   const handleTextChange = (e) => {};

//   const handleSaveTransaction = async () => {
//     if (!text.trim()) return; // Prevent sending empty text

//     // Add the user's message to the chat
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { type: "user", text },
//     ]);

//     try {
//       const { data } = await axios.post(
//         "http://localhost:5000/save-transaction",
//         { text }
//       );
//       setResponse(data);
//       setText("");
//     } catch (error) {
//       alert(error.response?.data?.message || "Error saving transaction.");
//     }
//   };
//   const formattedDate = new Date(response?.transaction?.date).toLocaleString(
//     "en-US",
//     {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour12: true,
//     }
//   );
//   return (
//     <div>
//       <div className="chat-wrapper">
//         {/* <div className="text">{response ? <p>{text}</p> : ''}</div> */}
//         <div className="text">
//           {messages.map((message, index) => (
//             <div key={index} className={message.type}>
//               <p>{message.text}</p>
//             </div>
//           ))}
//         </div>
//         <div>
//           {response && (
//             <div style={{ marginTop: "20px" }} className="response">
//               {response.message && <p>{response.message}</p>}
//               {response.transaction && (
//                 <table border="1" style={{ width: "100%", marginTop: "10px" }}>
//                   <thead>
//                     <tr>
//                       <th>Type</th>
//                       <th>Amount</th>
//                       <th>Charges</th>
//                       <th>Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>{response.transaction?.type}</td>
//                       <td>{response.transaction?.amount}</td>
//                       <td>{response.transaction?.charges}</td>
//                       <td>{formattedDate}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               )}
//               {response.summary && (
//                 <div>
//                   <h3>Summary</h3>
//                   <p>Total Amount: {response.summary.totalAmount}</p>
//                   <p>Total Charges: {response.summary.totalCharges}</p>
//                   <h4>Transactions by Type:</h4>
//                   <ul>
//                     {Object.entries(response.summary.types).map(
//                       ([type, amount]) => (
//                         <li key={type}>
//                           {type}: {amount}
//                         </li>
//                       )
//                     )}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//         <div className="inputWrapper">
//           <input
//             type="text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//           />
//           <button onClick={handleSaveTransaction}>send</button>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./chat.css";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { planAmount } from "../../redux/payment-planSlices";

// const socket = io("https://kudi-traka-backend.vercel.app/");
// const socket = io("http://localhost:5000");
const socket = io("https://kudi.aibauchi.com.ng");

export const ChatWithMisa = ({ authenticated }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const amount = useSelector((state) => state.planAmount.amount);
  console.log(`checking the plan amount ${amount}`);
  const [role, setRole] = useState(authenticated ? "user" : "admin");
  const [userId, setUserId] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messagePercentage, setMessagePercentage] = useState(100);
  const messagesEndRef = useRef(null);

  const newMessageSound = useRef(new Audio("/notificationBack.wav"));

  useEffect(() => {
    if (amount > 0) {
      setMessagePercentage(amount);
    }
    if (role === "admin") {
      socket.emit("register_admin");
    }

    socket.on("new_user_message", (data) => {
      setMessages((prev) => [...prev, { ...data, sender: "user" }]);
      newMessageSound.current.play();
    });

    socket.on("receive_response", (data) => {
      setMessages((prev) => [...prev, { ...data, sender: "admin" }]);
      newMessageSound.current.play();
    });

    return () => {
      socket.off("new_user_message");
      socket.off("receive_response");
    };
  }, [amount]); // role

  useEffect(() => {
    const username = localStorage.getItem("username");
    setUserId(username);
    // Scroll to the bottom of the message container
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleRegisterUser = (userId) => {
    if (!userId) {
      alert("Please enter a user ID");
      return;
    }
    socket.emit("register", { userId });
    alert(`Registered as user with ID: ${userId}`);
    enqueueSnackbar({
      variant: "success",
      message: `Registred with ID ${userId}`,
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = { text: newMessage };

    if (role === "user") {
      socket.emit("user_message", { userId, message: newMessage });
      setMessages((prev) => [...prev, { ...messageData, sender: "user" }]);
      newMessageSound.current.play();

      setMessagePercentage((prevPercentage) => prevPercentage - 5);
      console.log(
        `User send a message here is his new percentage ${messagePercentage}%`
      );
    } else if (role === "admin") {
      socket.emit("admin_message", { message: newMessage });
      setMessages((prev) => [...prev, { ...messageData, sender: "admin" }]);
      newMessageSound.current.play();
    }

    setNewMessage("");
  };

  if (!localStorage.getItem("authenticated")) {
    navigate(`/login`);
  }

  return (
    <div className="allWrapper">
      {/* <h1>Chat with MISA</h1> */}
      {role === "user" && (
        <div className="infoNav">
          <div className="userIdWrapper">
            <label>
              {/* USER: */}
              {userId}
              {/* <input
              type="text"
              value={userId}
              // onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your unique ID"
              style={{ marginLeft: "10px" }}
            /> */}
            </label>
            {/* <button onClick={handleRegisterUser} style={{ marginLeft: "10px" }}>
            Register
            </button> */}
          </div>
          <h1>Chat with MISA</h1>
          <div className="barContainer">
            <div className="barWapper">
              <div
                className="bar"
                style={{
                  height: `${messagePercentage}%`,
                }}
              >
                <p
                  className="line"
                  style={{
                    top: "30px",
                    display: messagePercentage <= 0 ? "none" : "block",
                  }}
                ></p>
                <p
                  className="line"
                  style={{
                    top: "50px",
                    display: messagePercentage <= 0 ? "none" : "block",
                  }}
                ></p>
                <p
                  className="line"
                  style={{
                    top: "70px",
                    display: messagePercentage <= 0 ? "none" : "block",
                  }}
                ></p>
              </div>
            </div>
            <span>{`${messagePercentage}%`}</span>
          </div>
        </div>
      )}
      {/* <h2>Messages</h2> */}
      <div className="messageWrapper">
        <div className="messageList">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <strong>{msg.sender === "admin" ? "Misa AI :" : ""}</strong>{" "}
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="inputWrapper" style={{ margin: `10px 0 0 0` }}>
          {messagePercentage === 0 ? (
            <div>
              <p
                style={{
                  color: `#fff`,
                  fontWeight: `500`,
                  textAlign: `center`,
                  padding: `10px 0`,
                }}
              >
                you have exhausted your message credit click the button below to
                purchase new credit!
              </p>
              <button
                style={{
                  color: `#fff`,
                  fontWeight: `600`,
                  fontSize: `15px`,
                  width: `30%`,
                  backgroundColor: `#7f8505`,
                  cursor: `pointer`,
                  borderRadius: `10px`,
                }}
                onClick={()=> {
                  dispatch(planAmount(0));
                  navigate(`/payment-plan`);
                }}
              >
                Buy Misa Credits
              </button>
            </div>
          ) : (
            <>
              <input
                type="text"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
