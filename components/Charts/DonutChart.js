"use client";

import React, { useState } from "react";

export default function DonutChart({
  data = [],
  centerValue = null,
  centerLabel = null,
  size = 200,
  strokeWidth = 24,
  legendLayout = "bottom-grid", // 'bottom-grid' | 'right-list' | 'bottom-list'
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  const slices = data.map((item, idx) => {
    const percent = totalValue > 0 ? (item.value / totalValue) * 100 : 0;
    const priorPercent = data
      .slice(0, idx)
      .reduce((sum, prev) => sum + (totalValue > 0 ? (prev.value / totalValue) * 100 : 0), 0);
    const strokeDasharray = `${(percent / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((priorPercent / 100) * circumference);
    return { ...item, percent, strokeDasharray, strokeDashoffset };
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Base circle background */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
          />

          {/* Slices */}
          {slices.map((item, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <circle
                key={item.label}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={item.strokeDasharray}
                strokeDashoffset={item.strokeDashoffset}
                strokeLinecap="butt"
                style={{
                  transformOrigin: "center",
                  transform: "rotate(-90deg)",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  opacity: hoveredIdx !== null && !isHovered ? 0.7 : 1,
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            );
          })}
        </svg>

        {/* Center label & value if present */}
        {centerValue !== null && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontSize: "26px",
                fontWeight: 700,
                color: "#1F2937",
                lineHeight: 1.1,
              }}
            >
              {centerValue}
            </span>
            {centerLabel && (
              <span
                style={{
                  fontSize: "11px",
                  color: "#6A7589",
                  marginTop: "2px",
                  fontWeight: 500,
                }}
              >
                {centerLabel}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Legends */}
      {legendLayout === "bottom-grid" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px 24px",
            marginTop: "20px",
            width: "100%",
            maxWidth: "260px",
          }}
        >
          {data.map((item, idx) => (
            <div
              key={item.label}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "12px",
                color: hoveredIdx === idx ? "#1F2937" : "#4B5563",
                cursor: "pointer",
                fontWeight: hoveredIdx === idx ? 600 : 400,
                transition: "all 0.15s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: item.color,
                    flexShrink: 0,
                  }}
                />
                <span>{item.label}</span>
              </div>
              <span style={{ fontWeight: 600, color: "#1F2937", marginLeft: "8px" }}>
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      )}

      {legendLayout === "right-list" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          {data.map((item, idx) => (
            <div
              key={item.label}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                fontSize: "12px",
                color: hoveredIdx === idx ? "#1F2937" : "#4B5563",
                cursor: "pointer",
                fontWeight: hoveredIdx === idx ? 600 : 400,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "70px" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: item.color,
                    flexShrink: 0,
                  }}
                />
                <span>{item.label}</span>
              </div>
              <span style={{ fontWeight: 600, color: "#1F2937" }}>{item.value}%</span>
            </div>
          ))}
        </div>
      )}

      {legendLayout === "bottom-list" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          {data.map((item, idx) => (
            <div
              key={item.label}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                color: hoveredIdx === idx ? "#1F2937" : "#4B5563",
                cursor: "pointer",
                fontWeight: hoveredIdx === idx ? 600 : 400,
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: item.color,
                }}
              />
              <span>{item.label}</span>
              <span style={{ fontWeight: 600, color: "#1F2937" }}>{item.value}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
