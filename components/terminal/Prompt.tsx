import React from "react";

// The shell prompt: vince@vitale-os:~$
const Prompt: React.FC<{ dim?: boolean }> = ({ dim }) => (
  <span className="whitespace-nowrap">
    <span className={dim ? "text-terminal-dim" : "text-terminal-green"}>vince</span>
    <span className="text-terminal-dim">@</span>
    <span className={dim ? "text-terminal-dim" : "text-terminal-blue"}>vitale-os</span>
    <span className="text-terminal-dim">:</span>
    <span className="text-terminal-amber">~</span>
    <span className="text-terminal-dim">$ </span>
  </span>
);

export default Prompt;
