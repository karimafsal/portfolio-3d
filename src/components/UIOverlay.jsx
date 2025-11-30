import React from "react";

export default function UIOverlay({ onNavClick }) {
  return (
    <div className="ui">
      <h1 className="title">Karim Afsal</h1>
      <p className="subtitle">Full-Stack Developer</p>

      <div className="nav">
        <button className="nav-btn" onClick={() => onNavClick("about")}>
          About
        </button>
        <button className="nav-btn" onClick={() => onNavClick("projects")}>
          Projects
        </button>
        <button className="nav-btn" onClick={() => onNavClick("skills")}>
          Skills
        </button>
        <button className="nav-btn" onClick={() => onNavClick("contact")}>
          Contact
        </button>
      </div>
    </div>
  );
}
