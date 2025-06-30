import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function History() {
  const conversations = ["Conversation 1", "Conversation 2"];
  return (
    <div className="col-span-1 bg-zinc-800 p-4 overflow-y-auto border-r border-zinc-700">
      <h2 className="text-lg font-semibold mb-4">History</h2>
      <ul className="space-y-2">
        {conversations.map((title, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-zinc-700 p-2 rounded hover:bg-zinc-600"
          >
            <span className="truncate">{title}</span>
            <button
              className="text-zinc-400 hover:text-red-500 transition"
              onClick={() => console.log("Delete", title)}
            >
              <TrashIcon className="cursor-pointer h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
