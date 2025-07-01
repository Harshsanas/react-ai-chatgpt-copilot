import React from "react";
import { FiTrash, FiX } from "react-icons/fi";

export default function MobileMenu({
  conversations = [], 
  currentConversationId,
  loadConversation,
  deleteConversation,
  createNewConversation,
  onClose,
}) {
  return (
    <div className="fixed inset-0 bg-zinc-900 z-50 md:hidden">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-zinc-100">Conversations</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <button
          onClick={() => {
            createNewConversation();
            onClose();
          }}
          className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          New Conversation
        </button>

        {conversations.length === 0 ? (
          <p className="text-zinc-400 text-center py-4">No conversations yet</p>
        ) : (
          <ul className="space-y-2">
            {conversations.map((conversation) => (
              <li
                key={conversation.id}
                className={`flex items-center justify-between p-3 rounded-lg transition duration-200 cursor-pointer ${
                  currentConversationId === conversation.id
                    ? "bg-zinc-700"
                    : "bg-zinc-800"
                }`}
                onClick={() => {
                  loadConversation(conversation.id);
                  onClose();
                }}
              >
                <span className="text-zinc-200 truncate flex-1">
                  {conversation.title}
                </span>
                <button
                  className="text-zinc-400 hover:text-red-500 transition duration-200 ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(conversation.id);
                  }}
                >
                  <FiTrash className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
