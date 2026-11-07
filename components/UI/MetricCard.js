"use client";

import React from "react";
import { Icon } from "./Icons";

export default function MetricCard({
  title,
  value,
  unit = null,
  trend = null, // e.g. { value: "+12.5%", isPositive: true, comparison: "vs last year" }
}) {
  return (
    <div
      style={{
        backgroundColor: "#FEFEFE",
        border: "1px solid #E2E8F0",
        borderRadius: "12px",
        padding: "18px 22px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.02)",
        transition: "box-shadow 0.2s ease, border-color 0.2s ease",
        height: "100%",
        minHeight: "106px",
      }}
      className="metric-card-hover"
    >
      <div
        style={{
          fontSize: "11px",
          fontWeight: 600,
          color: "#6A7589",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
          <span
            style={{
              fontSize: "30px",
              fontWeight: 700,
              color: "#1F2937",
              letterSpacing: "-0.5px",
              lineHeight: 1,
            }}
          >
            {value}
          </span>
          {unit && (
            <span
              style={{
                fontSize: "14px",
                fontWeight: 400,
                color: "#6A7589",
              }}
            >
              {unit}
            </span>
          )}
        </div>

        {trend && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "2px",
                padding: "2px 6px",
                borderRadius: "4px",
                fontSize: "11px",
                fontWeight: 600,
                backgroundColor: trend.isPositive ? "#D5FAE4" : "#FEE2E2",
                color: trend.isPositive ? "#06966B" : "#F0434D",
              }}
            >
              <Icon
                name={trend.isPositive ? "arrow-up" : "arrow-up"}
                size={11}
                color="currentColor"
              />
              {trend.value}
            </span>
            {trend.comparison && (
              <span
                style={{
                  fontSize: "10px",
                  color: "#95A1B6",
                  whiteSpace: "nowrap",
                }}
              >
                {trend.comparison}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
