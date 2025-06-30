import React from "react";
import { FiTrash } from "react-icons/fi";

export default function History() {
  const conversations = [
    "Getting started with React",
    "CSS best practices",
    "JavaScript interview questions",
  ];

  return (
    <div className="bg-zinc-900 border-r border-zinc-700 w-64 overflow-y-auto hidden md:block">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-zinc-100">Conversations</h2>
        <ul className="space-y-2 mt-4">
          {conversations.map((title, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-zinc-800 p-3 rounded-lg hover:bg-zinc-700 transition duration-200 cursor-pointer"
            >
              <span className="text-zinc-200 truncate">{title}</span>
              <button
                className="text-zinc-400 hover:text-red-500 transition duration-200 cursor-pointer"
                onClick={() => console.log("Delete", title)}
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
