import React from "react";
import { FiTrash } from "react-icons/fi";

export default function History({
  conversations,
  currentConversationId,
  loadConversation,
  deleteConversation,
  createNewConversation,
}) {
  return (
    <div className="bg-zinc-900 border-r border-zinc-700 w-64 overflow-y-auto hidden md:block">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-zinc-100">Conversations</h2>
          <button
            onClick={createNewConversation}
            className="text-blue-500 hover:text-blue-400 text-sm cursor-pointer"
          >
            New
          </button>
        </div>
        <ul className="space-y-2 mt-4">
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              className={`flex items-center justify-between p-3 rounded-lg hover:bg-zinc-700 transition duration-200 cursor-pointer ${
                currentConversationId === conversation.id
                  ? "bg-zinc-700"
                  : "bg-zinc-800"
              }`}
              onClick={() => loadConversation(conversation.id)}
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
      </div>
    </div>
  );
}
