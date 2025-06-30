import React, { useEffect, useState } from "react";
import { checkHeading, replaceHeadingStarts } from "../helper";

export default function Answers({ ans, index, totalResult }) {
  const [isHeading, setIsHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  useEffect(() => {
    // Check if it's a heading (surrounded by **text**)
    if (checkHeading(ans)) {
      setIsHeading(true);
      setAnswer(replaceHeadingStarts(ans));
    }
    // Remove single trailing asterisks
    else if (ans && ans.endsWith("*")) {
      setAnswer(ans.slice(0, -1));
    }
  }, [ans]);

  return (
    <div
      className={`
      ${isHeading ? "font-semibold text-lg mb-2" : "py-1"}
      ${index === 0 && totalResult > 1 ? "pt-0" : ""}
    `}
    >
      {answer}
    </div>
  );
}