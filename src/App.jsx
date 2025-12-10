import React, { useState } from "react";
import CanvasScene from "./components/CanvasScene.jsx";
import UIOverlay from "./components/UIOverlay.jsx";
import Terminal from "./components/Terminal.jsx";
import ProjectsPanel from "./components/ProjectsPanel.jsx";

// Preload the GLB correctly (MUST be inside component folder or index)
import { useGLTF } from "@react-three/drei";
useGLTF.preload("/assets/models/laptop.glb");

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  const handleNavClick = (section) => {
    setActiveSection(section);

    // ABOUT → open terminal
    if (section === "about") {
      setShowTerminal(true);
      setShowProjects(false); // hide projects if open
    }

    // PROJECTS → show project panel
    else if (section === "projects") {
      setShowProjects(true);
      setShowTerminal(false); // hide terminal
    }

    // SKILLS / CONTACT etc → close everything
    else {
      setShowTerminal(false);
      setShowProjects(false);
    }
  };

  return (
    <div className="app-root">
      <UIOverlay onNavClick={handleNavClick} />

      {/* 3D Scene */}
      <CanvasScene activeSection={activeSection} />

      {/* About Terminal */}
      <Terminal open={showTerminal} onClose={() => setShowTerminal(false)} />

      {/* Projects Panel */}
      <ProjectsPanel
        open={showProjects}
        onClose={() => setShowProjects(false)}
      />
    </div>
  );
}

export default App;
