"use client";

import React, { useState } from "react";

const PROJECTS = [
  { name: "Website Redesign", progress: 90, manager: "Jane Cooper" },
  { name: "Mobile App Development", progress: 75, manager: "Leslie Alexander" },
  { name: "ERP Integration", progress: 60, manager: "Robert Fox" },
  { name: "Marketing Campaign", progress: 40, manager: "Eleanor Pena" },
  { name: "Data Migration", progress: 25, manager: "Cody Fisher" },
];

export default function ProjectProgressBars() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px", width: "100%", padding: "6px 0" }}>
      {PROJECTS.map((proj, idx) => {
        const isHovered = hoveredIdx === idx;
        return (
          <div
            key={proj.name}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              cursor: "pointer",
              transition: "transform 0.15s ease",
              transform: isHovered ? "translateX(2px)" : "none",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: isHovered ? "#1F2937" : "#495668",
                }}
              >
                {proj.name}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#2563EA",
                }}
              >
                {proj.progress}%
              </span>
            </div>

            {/* Progress track */}
            <div
              style={{
                width: "100%",
                height: "9px",
                backgroundColor: "#E2E8F0",
                borderRadius: "999px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: `${proj.progress}%`,
                  height: "100%",
                  backgroundColor: "#2563EA",
                  borderRadius: "999px",
                  transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease",
                  opacity: isHovered ? 0.9 : 1,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
