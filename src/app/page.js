"use client";
import Head from "next/head";
import { useState, useEffect } from "react";
import Sidebar from "@/comps/sideBar";
import Chat from "@/comps/chat/index";

export default function Home() {
  const [conversations, setConversations] = useState({});
  const [currentConversation, setCurrentConversation] = useState("");

  useEffect(() => {
    const savedConversations =
      JSON.parse(localStorage.getItem("conversations")) || {};
    if (!savedConversations["Conversation 1"]) {
      savedConversations["Conversation 1"] = [];
      localStorage.setItem("conversations", JSON.stringify(savedConversations));
    }
    setConversations(savedConversations);
    setCurrentConversation(
      Object.keys(savedConversations)[0] || "Conversation 1"
    );
  }, []);

  const addConversation = () => {
    const newConversationName = `Conversation ${
      Object.keys(conversations).length + 1
    }`;
    const newConversations = { ...conversations, [newConversationName]: [] };
    setConversations(newConversations);
    localStorage.setItem("conversations", JSON.stringify(newConversations));
    setCurrentConversation(newConversationName);
  };

  const deleteConversation = (name) => {
    const { [name]: _, ...remainingConversations } = conversations;
    setConversations(remainingConversations);
    localStorage.setItem(
      "conversations",
      JSON.stringify(remainingConversations)
    );
    localStorage.removeItem(name);

    const nextConversation = Object.keys(remainingConversations)[0] || "";
    setCurrentConversation(nextConversation);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Head>
        <title>ChatGPT Parrot</title>
        <meta name="description" content="A simple ChatGPT-like parrot app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar
          conversations={conversations}
          currentConversation={currentConversation}
          setCurrentConversation={setCurrentConversation}
          addConversation={addConversation}
          deleteConversation={deleteConversation}
        />
        <main
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {currentConversation && (
            <Chat currentConversation={currentConversation} />
          )}
        </main>
      </div>
    </div>
  );
}
