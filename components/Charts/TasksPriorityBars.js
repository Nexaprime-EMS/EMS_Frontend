"use client";

import React, { useState } from "react";

const PRIORITIES = [
  { label: "High", value: 30, color: "#F0434D" },
  { label: "Medium", value: 50, color: "#2563EA" },
  { label: "Low", value: 20, color: "#06966B" },
];

export default function TasksPriorityBars() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "22px", width: "100%", padding: "12px 0" }}>
      {PRIORITIES.map((item, idx) => {
        const isHovered = hoveredIdx === idx;
        return (
          <div
            key={item.label}
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
                {item.label}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: item.color,
                }}
              >
                {item.value}%
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
                  width: `${item.value}%`,
                  height: "100%",
                  backgroundColor: item.color,
                  borderRadius: "999px",
                  transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease",
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
