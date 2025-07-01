import React, { useState, useEffect, useRef } from "react";
import { URL } from "../constants";
import Answers from "./Answers";

export default function MainContainer({
  setShowMobileMenu,
  conversations,
  setConversations,
  currentConversationId,
  setCurrentConversationId,
}) {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever result changes
  useEffect(() => {
    scrollToBottom();
  }, [result, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (currentConversationId) {
      const conversation = conversations.find(
        (c) => c.id === currentConversationId
      );
      if (conversation) {
        setResult(conversation.history);
      }
    } else {
      setResult([]);
    }
  }, [currentConversationId, conversations]);

  const updateConversationTitle = (id, newTitle) => {
    const updatedConversations = conversations.map((c) =>
      c.id === id ? { ...c, title: newTitle } : c
    );
    setConversations(updatedConversations);
    localStorage.setItem("conversations", JSON.stringify(updatedConversations));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);

    try {
      const payload = {
        contents: [
          {
            parts: [
              {
                text: question,
              },
            ],
          },
        ],
      };

      if (!currentConversationId) {
        const newConversation = {
          id: Date.now().toString(),
          title: question,
          history: [],
          createdAt: new Date().toISOString(),
        };
        const updatedConversations = [newConversation, ...conversations];
        setConversations(updatedConversations);
        localStorage.setItem(
          "conversations",
          JSON.stringify(updatedConversations)
        );
        setCurrentConversationId(newConversation.id);
      }

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      let dataString = data?.candidates[0]?.content.parts[0].text;
      dataString = dataString
        .split("* ")
        .map((item) => item.trim())
        .filter(Boolean);

      const newResult = [
        ...result,
        { type: "q", text: question },
        { type: "a", text: dataString },
      ];

      setResult(newResult);
      setQuestion("");

      const updatedConversations = conversations.map((c) => {
        if (c.id === currentConversationId) {
          const title = c.history.length === 0 ? question : c.title;
          return {
            ...c,
            title,
            history: newResult,
          };
        }
        return c;
      });

      setConversations(updatedConversations);
      localStorage.setItem(
        "conversations",
        JSON.stringify(updatedConversations)
      );
    } catch (error) {
      console.error("Error:", error);
      setResult((prevResult) => [
        ...prevResult,
        { type: "q", text: question },
        { type: "a", text: ["Sorry, something went wrong. Please try again."] },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="md:hidden p-4">
        <button
          onClick={() => setShowMobileMenu(true)}
          className="text-zinc-400 hover:text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 md:px-8">
        {currentConversationId && (
          <div className="mb-4">
            <input
              type="text"
              value={
                conversations.find((c) => c.id === currentConversationId)
                  ?.title || ""
              }
              onChange={(e) =>
                updateConversationTitle(currentConversationId, e.target.value)
              }
              className="bg-transparent text-xl font-bold text-white focus:outline-none focus:border-b focus:border-blue-500 w-full"
            />
          </div>
        )}

        <div className="flex justify-start">
          <div className="bg-zinc-800 p-4 rounded-2xl max-w-[90%] md:max-w-lg text-zinc-100">
            Hello! How can I assist you today?
          </div>
        </div>

        <ul>
          {result.map((item, index) => {
            if (item.type === "q") {
              return (
                <div className="flex justify-end mb-4" key={index}>
                  <div className="bg-blue-600 p-4 rounded-2xl max-w-[90%] rounded-tr-none md:max-w-2xl text-white shadow-sm">
                    {item.text}
                  </div>
                </div>
              );
            } else {
              const answers = Array.isArray(item.text)
                ? item.text
                : [item.text];
              return (
                <div className="flex justify-start w-full mb-4" key={index}>
                  <div className="bg-zinc-800 p-4 rounded-2xl max-w-[90%] rounded-tl-none md:max-w-2xl text-zinc-100 shadow-sm space-y-2">
                    {answers.map((ansItem, ansIndex) => (
                      <Answers
                        key={ansIndex}
                        ans={ansItem}
                        totalResult={answers.length}
                        index={ansIndex}
                      />
                    ))}
                  </div>
                </div>
              );
            }
          })}
          {/* Empty div to act as scroll anchor */}
          <div ref={messagesEndRef} />
        </ul>

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 p-4 rounded-2xl max-w-[90%] rounded-tl-none md:max-w-lg text-zinc-100">
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
            onKeyDown={handleKeyDown}
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
