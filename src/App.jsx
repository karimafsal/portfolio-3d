import React, { useState } from "react";
import CanvasScene from "./components/CanvasScene.jsx";
import UIOverlay from "./components/UIOverlay.jsx";
import Terminal from "./components/Terminal.jsx";
// in some init file, or top of App.jsx
import { useGLTF } from "@react-three/drei";
useGLTF.preload("/assets/models/laptop.glb");

function App() {
  const [activeSection, setActiveSection] = useState(null); // "about" | "projects" | ...
  const [showTerminal, setShowTerminal] = useState(false);

  const handleNavClick = (section) => {
    setActiveSection(section);
    if (section === "about") {
      setShowTerminal(true);
    } else {
      setShowTerminal(false);
    }
  };

  return (
    <div className="app-root">
      <UIOverlay onNavClick={handleNavClick} />
      <CanvasScene activeSection={activeSection} />
      <Terminal open={showTerminal} onClose={() => setShowTerminal(false)} />
    </div>
  );
}

export default App;
