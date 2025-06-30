import React, { useState } from "react";

export default function MainContainer() {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 md:px-8">
        <div className="flex justify-start">
          <div className="bg-zinc-800 p-4 rounded-2xl max-w-[90%] md:max-w-lg text-zinc-100">
            Hello! How can I assist you today?
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-blue-600 p-4 rounded-2xl max-w-[90%] md:max-w-lg text-white">
            What is React JS?
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-zinc-800 p-4 rounded-2xl max-w-[90%] md:max-w-lg text-zinc-100">
            React JS is a JavaScript library for building user interfaces. It's
            maintained by Facebook and a community of developers.
          </div>
        </div>
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 p-4 rounded-2xl max-w-[90%] md:max-w-lg text-zinc-100">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bg-zinc-900 border-t border-zinc-700 p-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto flex items-center gap-3"
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-grow bg-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border border-zinc-700 rounded-xl px-4 py-2 transition duration-200"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!question.trim() || isLoading}
            className={`px-4 py-2 rounded-lg transition duration-200 ${
              !question.trim() || isLoading
                ? "bg-zinc-700 text-zinc-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isLoading ? "..." : "Ask"}
          </button>
        </form>
      </div>
    </div>
  );
}
