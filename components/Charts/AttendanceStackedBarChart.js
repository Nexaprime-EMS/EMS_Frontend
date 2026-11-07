"use client";

import React, { useState } from "react";

const DATA = [
  { month: "Jan", present: 88, absent: 12 },
  { month: "Feb", present: 92, absent: 8 },
  { month: "Mar", present: 90, absent: 10 },
  { month: "Apr", present: 86, absent: 14 },
  { month: "May", present: 84, absent: 16 },
  { month: "Jun", present: 88, absent: 12 },
  { month: "Jul", present: 85, absent: 15 },
  { month: "Aug", present: 86, absent: 14 },
  { month: "Sep", present: 83, absent: 17 },
  { month: "Oct", present: 91, absent: 9 },
  { month: "Nov", present: 93, absent: 7 },
];

export default function AttendanceStackedBarChart() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const chartHeight = 220;
  const chartWidth = 580;
  const padLeft = 45;
  const padBottom = 30;
  const padTop = 15;
  const padRight = 15;

  const innerWidth = chartWidth - padLeft - padRight;
  const innerHeight = chartHeight - padTop - padBottom;
  const barWidth = 14;

  const yTicks = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        style={{ width: "100%", height: "auto", overflow: "visible" }}
      >
        {/* Horizontal gridlines and Y-axis labels */}
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
                strokeWidth={val === 0 ? 1 : 1}
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

        {/* Stacked bars */}
        {DATA.map((item, idx) => {
          const slotWidth = innerWidth / DATA.length;
          const x = padLeft + idx * slotWidth + (slotWidth - barWidth) / 2;
          const presentHeight = (item.present / 100) * innerHeight;
          const absentHeight = (item.absent / 100) * innerHeight;

          const presentY = padTop + innerHeight - presentHeight;
          const absentY = padTop;

          const isHovered = hoveredIdx === idx;

          return (
            <g
              key={item.month}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Invisible touch/hover expander */}
              <rect
                x={x - 8}
                y={padTop}
                width={barWidth + 16}
                height={innerHeight}
                fill="transparent"
              />

              {/* Absent segment (Orange #F97318) - top */}
              <rect
                x={x}
                y={absentY}
                width={barWidth}
                height={absentHeight}
                rx={3}
                fill={isHovered ? "#F97318" : "#F97318"}
                style={{
                  transition: "all 0.2s ease",
                  transformOrigin: `${x + barWidth / 2}px ${padTop}px`,
                  transform: isHovered ? "scaleY(1.02)" : "scaleY(1)",
                  opacity: isHovered ? 0.9 : 1,
                }}
              />

              {/* Present segment (Blue #3B82F6) - bottom */}
              <rect
                x={x}
                y={presentY}
                width={barWidth}
                height={presentHeight}
                rx={3}
                fill={isHovered ? "#2563EA" : "#3B82F6"}
                style={{
                  transition: "all 0.2s ease",
                  transformOrigin: `${x + barWidth / 2}px ${padTop + innerHeight}px`,
                  transform: isHovered ? "scaleY(1.02)" : "scaleY(1)",
                }}
              />

              {/* Month label */}
              <text
                x={x + barWidth / 2}
                y={chartHeight - 6}
                textAnchor="middle"
                fontSize="11"
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
            {DATA[hoveredIdx].month} Attendance
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#3B82F6" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B82F6" }} />
            Present: {DATA[hoveredIdx].present}%
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#F97318" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F97318" }} />
            Absent: {DATA[hoveredIdx].absent}%
          </div>
        </div>
      )}
    </div>
  );
}
