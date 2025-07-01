import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import { FiCopy, FiCheck } from "react-icons/fi";
import "katex/dist/katex.min.css";

export default function Answers({ ans, index }) {
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState({});
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (typeof ans === "string") {
      let cleanAnswer = ans;
      cleanAnswer = cleanAnswer.replace(/^\*\*|\*\*$/g, ""); // Remove surrounding **
      cleanAnswer = cleanAnswer.replace(/\*\*(.*?)\*\*/g, "$1"); // Remove all ** pairs
      setAnswer(cleanAnswer.trim());
    } else {
      setAnswer(String(ans || ""));
    }
  }, [ans]);

  const copyToClipboard = async (text, type = "answer", codeIndex = null) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "code" && codeIndex !== null) {
        setCodeCopied((prev) => ({ ...prev, [codeIndex]: true }));
        setTimeout(() => {
          setCodeCopied((prev) => ({ ...prev, [codeIndex]: false }));
        }, 2000);
      } else {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  };

  const CodeBlock = ({ inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "text";
    const codeString = String(children).replace(/\n$/, "");
    const codeIndex = `${index}-${Math.random()}`;

    if (!inline && codeString.length > 0) {
      return (
        <div className="relative group my-4">
          <div className="flex justify-between items-center bg-gray-800 px-4 py-2 rounded-t-lg border-b border-gray-700">
            <span className="text-sm text-gray-300 font-medium capitalize">
              {language === "text" ? "Code" : language}
            </span>
            <button
              onClick={() => copyToClipboard(codeString, "code", codeIndex)}
              className="opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1 text-xs text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
              title="Copy code"
            >
              {codeCopied[codeIndex] ? (
                <>
                  <FiCheck className="w-3 h-3" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <FiCopy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="relative">
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                borderRadius: "0 0 0.5rem 0.5rem",
                fontSize: "0.875rem",
                lineHeight: "1.5",
                padding: "1rem",
                background: "#1e1e1e",
              }}
              showLineNumbers={codeString.split("\n").length > 5}
              wrapLines={true}
              wrapLongLines={true}
              {...props}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        </div>
      );
    }

    // Inline code
    return (
      <code
        className="bg-gray-700 text-red-300 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-600"
        {...props}
      >
        {children}
      </code>
    );
  };

  const CopyButton = () => (
    <div className="flex justify-end mt-3 pt-2 border-t border-gray-700">
      <button
        onClick={() => copyToClipboard(answer)}
        className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-all duration-200"
        title="Copy entire answer"
      >
        {copied ? (
          <>
            <FiCheck className="w-3 h-3" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <FiCopy className="w-3 h-3" />
            <span>Copy answer</span>
          </>
        )}
      </button>
    </div>
  );

  // Custom components for better styling
  const components = {
    code: CodeBlock,

    h1: ({ children }) => (
      <h1 className="text-2xl font-bold text-white mb-4 mt-6 pb-2 border-b border-gray-600">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="text-xl font-semibold text-gray-100 mb-3 mt-5">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="text-lg font-medium text-gray-200 mb-2 mt-4">
        {children}
      </h3>
    ),

    h4: ({ children }) => (
      <h4 className="text-base font-medium text-gray-300 mb-2 mt-3">
        {children}
      </h4>
    ),

    p: ({ children }) => (
      <p className="text-gray-100 mb-3 leading-relaxed">{children}</p>
    ),

    ul: ({ children }) => (
      <ul className="list-disc ml-6 text-gray-100 mb-4 space-y-1">
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="list-decimal ml-6 text-gray-100 mb-4 space-y-1">
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li className="text-gray-100 leading-relaxed">{children}</li>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-700 rounded-r-lg mb-4 italic text-gray-200">
        {children}
      </blockquote>
    ),

    table: ({ children }) => (
      <div className="overflow-x-auto mb-4 rounded-lg border border-gray-600">
        <table className="min-w-full border-collapse">{children}</table>
      </div>
    ),

    thead: ({ children }) => <thead className="bg-gray-700">{children}</thead>,

    tbody: ({ children }) => <tbody className="bg-gray-800">{children}</tbody>,

    tr: ({ children }) => (
      <tr className="border-b border-gray-600 hover:bg-gray-750 transition-colors">
        {children}
      </tr>
    ),

    th: ({ children }) => (
      <th className="border-r border-gray-600 px-4 py-3 text-left text-gray-200 font-semibold">
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td className="border-r border-gray-600 px-4 py-3 text-gray-200">
        {children}
      </td>
    ),

    a: ({ children, href }) => (
      <a
        href={href}
        className="text-blue-400 hover:text-blue-300 underline transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),

    strong: ({ children }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),

    em: ({ children }) => <em className="italic text-gray-200">{children}</em>,

    hr: () => <hr className="border-gray-600 my-6" />,

    // Math expressions styling
    div: ({ className, children, ...props }) => {
      if (className?.includes("math-display")) {
        return (
          <div
            className="my-4 p-4 bg-gray-700 rounded-lg overflow-x-auto"
            {...props}
          >
            {children}
          </div>
        );
      }
      return (
        <div className={className} {...props}>
          {children}
        </div>
      );
    },
  };

  if (!answer || answer.trim() === "") {
    return null;
  }

  return (
    <div className="relative">
      <div className="markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
          components={components}
        >
          {answer}
        </ReactMarkdown>
      </div>
      <CopyButton />

      <style jsx>{`
        .markdown-content {
          color: #f1f5f9;
        }

        .markdown-content .katex {
          color: #e2e8f0;
        }

        .markdown-content .katex-display {
          margin: 1rem 0;
          padding: 1rem;
          background-color: #374151;
          border-radius: 0.5rem;
          overflow-x: auto;
        }

        .markdown-content pre {
          margin: 0;
          padding: 0;
          background: transparent;
        }

        .markdown-content code {
          font-family: "Fira Code", "Monaco", "Cascadia Code", "Roboto Mono",
            monospace;
        }
      `}</style>
    </div>
  );
}
