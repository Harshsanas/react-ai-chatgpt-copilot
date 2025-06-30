import React, { useState } from "react";

export default function MainContainer() {
  const [question, setQuestion] = useState("");
  return (
    <div className="col-span-4 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-8 py-4 space-y-4">
        <div className="flex justify-start">
          <div className="bg-zinc-700 p-4 rounded-2xl max-w-lg">
            Hello! How can I assist you today?
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-blue-600 p-4 rounded-2xl max-w-lg">
            What is React JS?
          </div>
        </div>

        <div className="flex justify-start">
          <div className="bg-zinc-700 p-4 rounded-2xl max-w-lg">
            React JS is a JavaScript library for building user interfaces.
          </div>
        </div>
      </div>

      <div className="bg-zinc-800 p-4 border-t border-zinc-700">
        <div className="max-w-3xl mx-auto flex items-center space-x-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything"
            className="flex-grow bg-transparent text-white placeholder-zinc-400 focus:outline-none border border-zinc-600 rounded-xl px-4 py-2"
          />
          <button
            disabled={!question.trim()}
            className={`px-4 py-2 rounded-lg transition ${
              question.trim()
                ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                : "bg-zinc-600 text-zinc-400 cursor-not-allowed"
            }`}
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}
