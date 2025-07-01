import React, { useEffect, useState } from "react";
import { checkHeading, replaceHeadingStarts } from "../helper";

export default function Answers({ ans, index, totalResult }) {
  const [headingLevel, setHeadingLevel] = useState(null);
  const [answer, setAnswer] = useState(ans);

  useEffect(() => {
    if (checkHeading(ans)) {
      if (ans.startsWith("**##")) {
        setHeadingLevel(3);
        setAnswer(ans.replace(/\*\*##(.*?)\*\*/g, "$1"));
      } else if (ans.startsWith("**#")) {
        setHeadingLevel(2);
        setAnswer(ans.replace(/\*\*#(.*?)\*\*/g, "$1"));
      } else {
        setHeadingLevel(1);
        setAnswer(replaceHeadingStarts(ans));
      }
    }
    else if (ans && ans.endsWith("*")) {
      setAnswer(ans.slice(0, -1));
    } else {
      setHeadingLevel(null); 
    }
  }, [ans]);

  return (
    <div
      className={`
        ${
          headingLevel === 1
            ? "font-bold text-xl md:text-2xl mb-3 mt-4 text-white-400"
            : ""
        }
        ${
          headingLevel === 2
            ? "font-semibold text-lg md:text-xl mb-2 mt-3 text-white-300"
            : ""
        }
        ${
          headingLevel === 3
            ? "font-medium text-base md:text-lg mb-1 mt-2 text-white-200"
            : ""
        }
        ${!headingLevel ? "py-1 text-gray-100" : ""}
        ${index === 0 && totalResult > 1 ? "pt-0" : ""}
        transition-all duration-150
      `}
    >
      {answer}
    </div>
  );
}
