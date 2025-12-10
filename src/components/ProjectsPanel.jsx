import React from "react";

export default function ProjectsPanel({ open, onClose }) {
  if (!open) return null;

  const projects = [
    {
      title: "HR Management Web Application",
      tech: "React, Node.js, SQL, REST APIs",
      description:
        "Built modules for resume storage, editing, uploading, candidate filtering, recruiter dashboards, and optimized SQL queries.",
      github: "https://github.com/karimafsal",
    },
    {
      title: "Voice Pathology Detection System",
      tech: "Python, CNN, Signal Processing",
      description:
        "Detects voice disorders using CNN-based analysis of voice & EGG spectrograms.",
      github: "https://github.com/karimafsal",
    },
    {
      title: "Automated Canteen Ordering System",
      tech: "HTML, CSS, JavaScript, PHP/MySQL",
      description:
        "A fast online canteen ordering system with menu management and admin panel.",
      github: "https://github.com/karimafsal",
    },
  ];

  return (
    <div className="mac-window">
      {/* Header */}
      <div className="mac-header">
        <div className="mac-buttons">
          <button className="mac-btn red" onClick={onClose}>
            ×
          </button>
          <button className="mac-btn yellow">–</button>
          <button className="mac-btn green">+</button>
        </div>

        <span className="mac-title">Projects</span>
      </div>

      {/* Content */}
      <div className="mac-content">
        {projects.map((p, i) => (
          <div key={i} className="project-card">
            <h3>{p.title}</h3>
            <p className="tech">{p.tech}</p>
            <p className="desc">{p.description}</p>

            <a className="github-link" href={p.github} target="_blank">
              View GitHub →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
