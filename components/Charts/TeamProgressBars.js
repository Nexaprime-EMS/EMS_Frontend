"use client";

import React, { useState } from "react";

const TEAMS = [
  { name: "Development Team", performance: 92 },
  { name: "Design Team", performance: 95 },
  { name: "Marketing Team", performance: 86 },
  { name: "HR Team", performance: 90 },
  { name: "Finance Team", performance: 88 },
];

export default function TeamProgressBars() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px", width: "100%", padding: "8px 0" }}>
      {TEAMS.map((team, idx) => {
        const isHovered = hoveredIdx === idx;
        return (
          <div
            key={team.name}
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
                {team.name}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#2563EA",
                }}
              >
                {team.performance}%
              </span>
            </div>

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
                  width: `${team.performance}%`,
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
