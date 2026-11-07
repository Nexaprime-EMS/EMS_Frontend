"use client";

import React, { useState } from "react";

const DATA = [
  { name: "Dev", performance: 92 },
  { name: "Design", performance: 86 },
  { name: "Mktg", performance: 84 },
  { name: "HR", performance: 90 },
  { name: "Fin", performance: 88 },
  { name: "IT", performance: 82 },
  { name: "Sales", performance: 86 },
];

export default function DepartmentPerformanceBarChart() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const chartHeight = 220;
  const chartWidth = 540;
  const padLeft = 45;
  const padBottom = 30;
  const padTop = 15;
  const padRight = 15;

  const innerWidth = chartWidth - padLeft - padRight;
  const innerHeight = chartHeight - padTop - padBottom;
  const barWidth = 16;

  const yTicks = [100, 75, 50, 25, 0];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        style={{ width: "100%", height: "auto", overflow: "visible" }}
      >
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

        {DATA.map((item, idx) => {
          const slotWidth = innerWidth / DATA.length;
          const x = padLeft + idx * slotWidth + (slotWidth - barWidth) / 2;
          const barH = (item.performance / 100) * innerHeight;
          const y = padTop + innerHeight - barH;

          const isHovered = hoveredIdx === idx;

          return (
            <g
              key={item.name}
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

              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                rx={3}
                fill={isHovered ? "#2563EA" : "#3B82F6"}
                style={{
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  transformOrigin: `${x + barWidth / 2}px ${padTop + innerHeight}px`,
                  transform: isHovered ? "scaleY(1.03)" : "scaleY(1)",
                }}
              />

              <text
                x={x + barWidth / 2}
                y={chartHeight - 6}
                textAnchor="middle"
                fontSize="11"
                fill={isHovered ? "#1F2937" : "#4B5563"}
                fontWeight={isHovered ? "600" : "400"}
                fontFamily="inherit"
              >
                {item.name}
              </text>
            </g>
          );
        })}
      </svg>

      {hoveredIdx !== null && (
        <div
          style={{
            position: "absolute",
            top: `${padTop + innerHeight - (DATA[hoveredIdx].performance / 100) * innerHeight - 12}px`,
            left: `${padLeft + (hoveredIdx / (DATA.length - 1)) * (innerWidth - 20)}px`,
            transform: "translate(-50%, -100%)",
            background: "#1F2937",
            color: "#FEFEFE",
            padding: "5px 10px",
            borderRadius: "6px",
            fontSize: "11px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            zIndex: 10,
          }}
        >
          {DATA[hoveredIdx].name}: {DATA[hoveredIdx].performance}%
        </div>
      )}
    </div>
  );
}
