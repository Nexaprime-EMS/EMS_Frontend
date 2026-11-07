"use client";

import React, { useState } from "react";

const DATA = [
  { month: "Jan", leaves: 22 },
  { month: "Feb", leaves: 38 },
  { month: "Mar", leaves: 18 },
  { month: "Apr", leaves: 44 },
  { month: "May", leaves: 40 },
  { month: "Jun", leaves: 58 },
  { month: "Jul", leaves: 68 },
  { month: "Aug", leaves: 28 },
  { month: "Sep", leaves: 42 },
  { month: "Oct", leaves: 24 },
  { month: "Nov", leaves: 52 },
  { month: "Dec", leaves: 72 },
];

export default function LeaveTrendBarChart() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const chartHeight = 220;
  const chartWidth = 560;
  const padLeft = 40;
  const padBottom = 30;
  const padTop = 20;
  const padRight = 15;

  const innerWidth = chartWidth - padLeft - padRight;
  const innerHeight = chartHeight - padTop - padBottom;
  const barWidth = 24;

  const maxY = 80;
  const yTicks = [80, 60, 40, 20, 0];

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
          const h = (item.leaves / maxY) * innerHeight;
          const y = padTop + innerHeight - h;

          const isHovered = hoveredIdx === idx;

          return (
            <g
              key={item.month}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={x - 4}
                y={padTop}
                width={barWidth + 8}
                height={innerHeight}
                fill="transparent"
              />

              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={h}
                rx={3}
                fill={isHovered ? "#2563EA" : "#70A3F8"}
                style={{
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  transformOrigin: `${x + barWidth / 2}px ${padTop + innerHeight}px`,
                  transform: isHovered ? "scaleY(1.03)" : "scaleY(1)",
                }}
              />

              {/* Month label */}
              <text
                x={x + barWidth / 2}
                y={chartHeight - 6}
                textAnchor="middle"
                fontSize="10"
                fill={isHovered ? "#1F2937" : "#4B5563"}
                fontWeight={isHovered ? "600" : "400"}
                fontFamily="inherit"
              >
                {item.month}
              </text>
            </g>
          );
        })}
      </svg>

      {hoveredIdx !== null && (
        <div
          style={{
            position: "absolute",
            top: `${padTop + innerHeight - (DATA[hoveredIdx].leaves / maxY) * innerHeight - 10}px`,
            left: `${padLeft + (hoveredIdx / (DATA.length - 1)) * (innerWidth - 20)}px`,
            transform: "translate(-50%, -100%)",
            background: "#1F2937",
            color: "#FEFEFE",
            padding: "6px 10px",
            borderRadius: "6px",
            fontSize: "11px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            zIndex: 10,
          }}
        >
          {DATA[hoveredIdx].month}: {DATA[hoveredIdx].leaves} leaves
        </div>
      )}
    </div>
  );
}
