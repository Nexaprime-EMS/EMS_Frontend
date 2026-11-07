"use client";

import React, { useState } from "react";

const DATA = [
  { month: "Jan", score: 75.2 },
  { month: "Feb", score: 81.0 },
  { month: "Mar", score: 79.5 },
  { month: "Apr", score: 86.4 },
  { month: "May", score: 85.0 },
  { month: "Jun", score: 89.2 },
  { month: "Jul", score: 87.5 },
  { month: "Aug", score: 88.0 },
  { month: "Sep", score: 91.0 },
  { month: "Oct", score: 89.8 },
  { month: "Nov", score: 92.5 },
  { month: "Dec", score: 94.0 },
];

export default function ProductivityTrendChart() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const chartHeight = 260;
  const chartWidth = 1080;
  const padLeft = 50;
  const padBottom = 35;
  const padTop = 20;
  const padRight = 30;

  const innerWidth = chartWidth - padLeft - padRight;
  const innerHeight = chartHeight - padTop - padBottom;

  const yTicks = [100, 75, 50, 25, 0];

  const points = DATA.map((item, idx) => {
    const x = padLeft + (idx / (DATA.length - 1)) * innerWidth;
    const y = padTop + ((100 - item.score) / 100) * innerHeight;
    return { x, y, ...item };
  });

  const pathD = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const cpX1 = prev.x + (pt.x - prev.x) / 3;
    const cpX2 = prev.x + ((pt.x - prev.x) * 2) / 3;
    return `${acc} C ${cpX1} ${prev.y}, ${cpX2} ${pt.y}, ${pt.x} ${pt.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${padTop + innerHeight} L ${points[0].x} ${padTop + innerHeight} Z`;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        style={{ width: "100%", height: "auto", overflow: "visible" }}
      >
        <defs>
          <linearGradient id="productivityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Y Axis Gridlines */}
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

        {/* Area fill */}
        <path d={areaD} fill="url(#productivityGradient)" />

        {/* Vertical crosshair */}
        {hoveredIdx !== null && (
          <line
            x1={points[hoveredIdx].x}
            y1={padTop}
            x2={points[hoveredIdx].x}
            y2={padTop + innerHeight}
            stroke="#3B82F6"
            strokeDasharray="3 3"
            strokeWidth={1.5}
          />
        )}

        {/* Curve stroke */}
        <path
          d={pathD}
          fill="none"
          stroke="#2563EA"
          strokeWidth={3}
          strokeLinecap="round"
        />

        {/* Interactive points & Month labels */}
        {points.map((pt, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <g
              key={pt.month}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ cursor: "pointer" }}
            >
              <circle cx={pt.x} cy={pt.y} r={16} fill="transparent" />

              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHovered ? 6 : 4}
                fill="#2563EA"
                stroke="#FEFEFE"
                strokeWidth={2.5}
                style={{ transition: "all 0.15s ease" }}
              />

              <text
                x={pt.x}
                y={chartHeight - 8}
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
            padding: "5px 12px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            zIndex: 10,
          }}
        >
          {DATA[hoveredIdx].month}: {DATA[hoveredIdx].score}% Score
        </div>
      )}
    </div>
  );
}
