import { FiGithub } from "react-icons/fi";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="bg-zinc-900 border-b border-zinc-700 w-full py-4 px-6 sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-zinc-100">
          AI Chat Assistant
        </h1>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Harshsanas/react-ai-chatgpt-copilot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-blue-500 transition-colors duration-200"
            aria-label="GitHub Repository"
          >
            <FiGithub className="w-6 h-6" />
          </a>
          <div className="relative">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
