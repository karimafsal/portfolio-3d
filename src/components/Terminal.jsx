import React, { useEffect, useState, useRef } from "react";

const aboutMeText = `
> Loading About...

> Name: Karim Afsal
> Role: Full-Stack Developer
> Specialities: React, Three.js, Blender 3D, IC Development
> Location: India
> Experience: Building 3D interactive web experiences
> Passion: Coding, 3D design, portfolio building

> About Me:
I'm a passionate full-stack developer who loves building modern,
interactive, visually appealing web apps.


> Type "help" to view available commands.
`;

export default function Terminal({ open, onClose }) {
  const [displayText, setDisplayText] = useState("");
  const [typedCommand, setTypedCommand] = useState("");
  const [output, setOutput] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showPrompt, setShowPrompt] = useState(false);

  const hiddenInput = useRef(null);

  // Auto typing the intro
  useEffect(() => {
    if (!open) return;

    setDisplayText("");
    setTypedCommand("");
    setOutput([]);
    setShowPrompt(false);

    const typeSound = new Audio("/assets/sounds/typewriter.mp3");
    typeSound.volume = 0.4;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(aboutMeText.slice(0, i + 1));

      const char = aboutMeText[i];
      if (char && char !== " " && char !== "\n") {
        typeSound.currentTime = 0;
        typeSound.play();
      }

      i++;
      if (i >= aboutMeText.length) {
        clearInterval(interval);
        setShowPrompt(true); // show CLI only after typing ends
        setTimeout(() => hiddenInput.current?.focus(), 50); // focus invisible input
      }
    }, 35);

    return () => clearInterval(interval);
  }, [open]);

  // Handle typing
  const handleTyping = (e) => {
    setTypedCommand(e.target.value);
  };

  // Execute commands
  const runCommand = (cmd) => {
    let response = "";

    switch (cmd) {
      case "help":
        response = `
Available commands:
- resume  → Open resume
- clear   → Clear terminal
- help    → Show commands
        `;
        break;

      case "resume":
        window.open("/assets/resume/KARIM_AFSAL_RESUME.pdf", "_blank");
        response = `Opening resume...`;
        break;

      case "clear":
        setOutput([]);
        return;

      case "":
        response = "";
        break;

      default:
        response = `Unknown command: ${cmd}`;
        break;
    }

    setOutput((prev) => [...prev, `> ${cmd}`, response]);
  };

  // Handle enter + history
  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = typedCommand.trim().toLowerCase();

      if (cmd) setHistory([...history, cmd]);
      setHistoryIndex(-1);

      runCommand(cmd);

      setTypedCommand("");
      e.target.value = "";
    }

    // Arrow up
    if (e.key === "ArrowUp") {
      if (!history.length) return;

      const newIndex =
        historyIndex === -1 ? history.length - 1 : historyIndex - 1;

      if (newIndex >= 0) {
        setHistoryIndex(newIndex);
        setTypedCommand(history[newIndex]);
        hiddenInput.current.value = history[newIndex];
      }
    }

    // Arrow down
    if (e.key === "ArrowDown") {
      if (historyIndex === -1) return;

      const newIndex = historyIndex + 1;

      if (newIndex < history.length) {
        setHistoryIndex(newIndex);
        setTypedCommand(history[newIndex]);
        hiddenInput.current.value = history[newIndex];
      } else {
        setHistoryIndex(-1);
        setTypedCommand("");
        hiddenInput.current.value = "";
      }
    }
  };

  return (
    <div className={`terminal ${open ? "" : "hidden"}`}>
      {/* Profile */}
      <img
        src="/assets/ui/profile.jpg"
        alt="profile"
        className="terminal-profile"
      />

      <div className="terminal-header">
        <span className="terminal-title">About CLI</span>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="terminal-content">
        {/* Intro */}
        <pre>{displayText}</pre>

        {/* Command outputs */}
        {output.map((line, index) => (
          <pre key={index}>{line}</pre>
        ))}

        {/* CLI prompt (only shown after auto typing ends) */}
        {showPrompt && (
          <div className="terminal-input-line">
            <span className="cli-symbol">{">"}</span>
            <span className="typed-command">{typedCommand}</span>
            <span className="cursor">█</span>

            {/* Hidden input (REAL input handler) */}
            <input
              ref={hiddenInput}
              className="hidden-terminal-input"
              onKeyDown={handleCommand}
              onChange={handleTyping}
            />
          </div>
        )}
      </div>
    </div>
  );
}
