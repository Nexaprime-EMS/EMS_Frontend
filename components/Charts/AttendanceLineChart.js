"use client";

import React, { useState } from "react";

const DATA = [
  { month: "Jan", rate: 88.5 },
  { month: "Feb", rate: 82.0 },
  { month: "Mar", rate: 94.2 },
  { month: "Apr", rate: 84.8 },
  { month: "May", rate: 92.5 },
  { month: "Jun", rate: 86.0 },
  { month: "Jul", rate: 94.0 },
  { month: "Aug", rate: 88.0 },
  { month: "Sep", rate: 91.5 },
  { month: "Oct", rate: 89.2 },
  { month: "Nov", rate: 95.0 },
  { month: "Dec", rate: 93.4 },
];

export default function AttendanceLineChart() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const chartHeight = 220;
  const chartWidth = 560;
  const padLeft = 45;
  const padBottom = 30;
  const padTop = 20;
  const padRight = 20;

  const innerWidth = chartWidth - padLeft - padRight;
  const innerHeight = chartHeight - padTop - padBottom;

  const yTicks = [100, 75, 50, 25, 0];

  const points = DATA.map((item, idx) => {
    const x = padLeft + (idx / (DATA.length - 1)) * innerWidth;
    const y = padTop + ((100 - item.rate) / 100) * innerHeight;
    return { x, y, ...item };
  });

  const pathD = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const cpX1 = prev.x + (pt.x - prev.x) / 3;
    const cpX2 = prev.x + ((pt.x - prev.x) * 2) / 3;
    return `${acc} C ${cpX1} ${prev.y}, ${cpX2} ${pt.y}, ${pt.x} ${pt.y}`;
  }, "");

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        style={{ width: "100%", height: "auto", overflow: "visible" }}
      >
        {/* Horizontal grid lines */}
        {yTicks.map((val) => {
          const y = padTop + ((100 - val) / 100) * innerHeight;
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
                x={padLeft - 10}
                y={y + 3.5}
                textAnchor="end"
                fontSize="10"
                fill="#9CA3AF"
                fontFamily="inherit"
              >
                {val}%
              </text>
            </g>
          );
        })}

        {/* Active vertical hover crosshair */}
        {hoveredIdx !== null && (
          <line
            x1={points[hoveredIdx].x}
            y1={padTop}
            x2={points[hoveredIdx].x}
            y2={padTop + innerHeight}
            stroke="#70A3F8"
            strokeDasharray="3 3"
            strokeWidth={1.5}
          />
        )}

        {/* Trend line */}
        <path
          d={pathD}
          fill="none"
          stroke="#2563EA"
          strokeWidth={2.8}
          strokeLinecap="round"
        />

        {/* Interactive points */}
        {points.map((pt, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <g
              key={pt.month}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Invisible touch expander */}
              <circle cx={pt.x} cy={pt.y} r={14} fill="transparent" />

              {/* Point circle */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHovered ? 5.5 : 3.5}
                fill="#2563EA"
                stroke="#FEFEFE"
                strokeWidth={2}
                style={{ transition: "all 0.15s ease" }}
              />

              {/* Month label */}
              <text
                x={pt.x}
                y={chartHeight - 6}
                textAnchor="middle"
                fontSize="11"
                fill={isHovered ? "#1F2937" : "#4B5563"}
                fontWeight={isHovered ? 600 : 400}
                fontFamily="inherit"
              >
                {pt.month}
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
            top: `${points[hoveredIdx].y - 36}px`,
            left: `${points[hoveredIdx].x}px`,
            transform: "translateX(-50%)",
            background: "#1F2937",
            color: "#FEFEFE",
            padding: "5px 10px",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            zIndex: 10,
          }}
        >
          {DATA[hoveredIdx].month}: {DATA[hoveredIdx].rate}%
        </div>
      )}
    </div>
  );
}
