import { useState, useEffect } from "react";
import styles from "./chat.module.css";

const Chat = ({ currentConversation }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const savedMessages =
      JSON.parse(localStorage.getItem(currentConversation)) || [];
    setMessages(savedMessages);
  }, [currentConversation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newMessage = { user: "You", text: input };
    const parrotMessage = { user: "Parrot", text: input };

    const newMessages = [...messages, newMessage, parrotMessage];
    setMessages(newMessages);
    localStorage.setItem(currentConversation, JSON.stringify(newMessages));
    setInput("");
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.user === "You" ? styles.userMessage : styles.parrotMessage
            }
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
