"use client";

import React, { useState } from "react";

const DATA = [
  { month: "Jan", segment1: 8, segment2: 4 },
  { month: "Feb", segment1: 11, segment2: 4 },
  { month: "Mar", segment1: 10, segment2: 3 },
  { month: "Apr", segment1: 9, segment2: 3 },
  { month: "May", segment1: 7, segment2: 5 },
  { month: "Jun", segment1: 15, segment2: 4 },
  { month: "Jul", segment1: 14, segment2: 4 },
  { month: "Aug", segment1: 12, segment2: 4 },
  { month: "Sep", segment1: 11, segment2: 4 },
  { month: "Oct", segment1: 16, segment2: 3 },
  { month: "Nov", segment1: 12, segment2: 4 },
  { month: "Dec", segment1: 9, segment2: 3 },
];

export default function MonthlyLeaveTrendChart() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const chartHeight = 220;
  const chartWidth = 560;
  const padLeft = 40;
  const padBottom = 30;
  const padTop = 20;
  const padRight = 15;

  const innerWidth = chartWidth - padLeft - padRight;
  const innerHeight = chartHeight - padTop - padBottom;
  const barWidth = 14;

  const maxY = 22; // max combined height
  const yTicks = [20, 15, 10, 5, 0];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        style={{ width: "100%", height: "auto", overflow: "visible" }}
      >
        {yTicks.map((val) => {
          const y = padTop + ((maxY - val) / maxY) * innerHeight;
          return (
            <g key={val}>
              <line
                x1={padLeft}
                y1={y}
                x2={chartWidth - padRight}
                y2={y}
                stroke="#E2E8F0"
                strokeDasharray={val === 0 ? "none" : "2 2"}
                strokeWidth={1}
              />
              <text
                x={padLeft - 8}
                y={y + 3.5}
                textAnchor="end"
                fontSize="10"
                fill="#9CA3AF"
                fontFamily="inherit"
              >
                {val}
              </text>
            </g>
          );
        })}

        {DATA.map((item, idx) => {
          const slotWidth = innerWidth / DATA.length;
          const x = padLeft + idx * slotWidth + (slotWidth - barWidth) / 2;
          const h1 = (item.segment1 / maxY) * innerHeight;
          const h2 = (item.segment2 / maxY) * innerHeight;

          const y1 = padTop + innerHeight - h1;
          const y2 = y1 - h2;

          const isHovered = hoveredIdx === idx;

          return (
            <g
              key={item.month}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={x - 6}
                y={padTop}
                width={barWidth + 12}
                height={innerHeight}
                fill="transparent"
              />

              {/* Lower segment (Deep blue #2563EA) */}
              <rect
                x={x}
                y={y1}
                width={barWidth}
                height={h1}
                rx={2}
                fill="#2563EA"
                style={{
                  transition: "all 0.15s ease",
                  transformOrigin: `${x + barWidth / 2}px ${padTop + innerHeight}px`,
                  transform: isHovered ? "scaleY(1.02)" : "scaleY(1)",
                }}
              />

              {/* Upper segment (Light blue #70A3F8) */}
              <rect
                x={x}
                y={y2}
                width={barWidth}
                height={h2}
                rx={2}
                fill="#70A3F8"
                style={{
                  transition: "all 0.15s ease",
                  opacity: isHovered ? 0.9 : 1,
                }}
              />

              {/* Month label */}
              <text
                x={x + barWidth / 2}
                y={chartHeight - 6}
                textAnchor="middle"
                fontSize="11"
                fill={isHovered ? "#1F2937" : "#4B5563"}
                fontWeight={isHovered ? 600 : 400}
                fontFamily="inherit"
              >
                {item.month}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating tooltip */}
      {hoveredIdx !== null && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: `${padLeft + (hoveredIdx / (DATA.length - 1)) * (innerWidth - 40)}px`,
            transform: "translate(-50%, -100%)",
            background: "#1F2937",
            color: "#FEFEFE",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "11px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            zIndex: 10,
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: "4px" }}>
            {DATA[hoveredIdx].month} Leaves
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#70A3F8" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#70A3F8" }} />
            Planned: {DATA[hoveredIdx].segment2}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#2563EA" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563EA" }} />
            Unplanned: {DATA[hoveredIdx].segment1}
          </div>
        </div>
      )}
    </div>
  );
}
