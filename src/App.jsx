import React, { useState, useEffect } from "react";
import MainContainer from "./components/MainContainer";
import History from "./components/History";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";

function App() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);

  useEffect(() => {
    const savedConversations =
      JSON.parse(localStorage.getItem("conversations")) || [];
    setConversations(savedConversations);

    if (savedConversations.length > 0) {
      setCurrentConversationId(savedConversations[0].id);
    }
  }, []);

  const createNewConversation = () => {
    const newConversation = {
      id: Date.now().toString(),
      title: "New Conversation",
      history: [],
      createdAt: new Date().toISOString(),
    };

    const updatedConversations = [newConversation, ...conversations];
    setConversations(updatedConversations);
    localStorage.setItem("conversations", JSON.stringify(updatedConversations));
    setCurrentConversationId(newConversation.id);
  };

  const loadConversation = (id) => {
    const conversation = conversations.find((c) => c.id === id);
    if (conversation) {
      setCurrentConversationId(id);
    }
  };

  const deleteConversation = (id) => {
    const updatedConversations = conversations.filter((c) => c.id !== id);
    setConversations(updatedConversations);
    localStorage.setItem("conversations", JSON.stringify(updatedConversations));

    if (currentConversationId === id) {
      setCurrentConversationId(null);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <History
          conversations={conversations || []}
          currentConversationId={currentConversationId}
          loadConversation={loadConversation}
          deleteConversation={deleteConversation}
          createNewConversation={createNewConversation}
        />

        {showMobileMenu && (
          <MobileMenu
            conversations={conversations || []}
            currentConversationId={currentConversationId}
            loadConversation={loadConversation}
            deleteConversation={deleteConversation}
            createNewConversation={createNewConversation}
            onClose={() => setShowMobileMenu(false)}
          />
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          <MainContainer
            setShowMobileMenu={setShowMobileMenu}
            conversations={conversations}
            setConversations={setConversations}
            currentConversationId={currentConversationId}
            setCurrentConversationId={setCurrentConversationId}
            createNewConversation={createNewConversation}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
