import React, { useState } from "react";
import { FiAlignJustify, FiTrash, FiX } from "react-icons/fi";

export default function MobileMenu() {
  const [showHistory, setShowHistory] = useState(false);
  const [conversations, setConversations] = useState([
    "Getting started with React",
    "CSS best practices",
    "JavaScript interview questions",
  ]);

  const deleteConversation = (index) => {
    setConversations(conversations.filter((_, i) => i !== index));
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="bg-zinc-800 p-3 rounded-full shadow-lg border border-zinc-700 hover:scale-105 transition duration-200"
        aria-label={showHistory ? "Close history" : "Open history"}
      >
        {showHistory ? (
          <FiX className="w-5 h-5 text-zinc-300 cursor-pointer" />
        ) : (
          <FiAlignJustify className="w-5 h-5 text-zinc-300 cursor-pointer" />
        )}
      </button>

      {showHistory && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-zinc-800 rounded-lg shadow-xl border border-zinc-700 p-4 max-h-[70vh] overflow-y-auto">
          <h2 className="font-semibold text-zinc-100 mb-3">Conversations</h2>
          <ul className="space-y-2 cursor-pointer">
            {conversations.map((title, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-zinc-700 p-3 rounded-lg hover:bg-zinc-600 transition duration-200"
              >
                <span className="text-zinc-200 truncate">{title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(index);
                  }}
                  className="text-zinc-400 hover:text-red-500 transition duration-200 cursor-pointer"
                >
                  <FiTrash className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
