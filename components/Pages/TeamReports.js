"use client";

import React, { useState } from "react";
import { Icon } from "../UI/Icons";
import MetricCard from "../UI/MetricCard";
import TeamProgressBars from "../Charts/TeamProgressBars";

const TEAMS_DATA = [
  {
    name: "Development Team",
    members: 18,
    tasksCompleted: 142,
    performance: "92%",
  },
  {
    name: "Design Team",
    members: 12,
    tasksCompleted: 96,
    performance: "95%",
  },
  {
    name: "Marketing Team",
    members: 10,
    tasksCompleted: 82,
    performance: "86%",
  },
  {
    name: "HR Team",
    members: 8,
    tasksCompleted: 64,
    performance: "90%",
  },
  {
    name: "Finance Team",
    members: 6,
    tasksCompleted: 52,
    performance: "88%",
  },
];

export default function TeamReports({ navigateTo }) {
  const [selectedTeam, setSelectedTeam] = useState("All Teams");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredTeams = TEAMS_DATA.filter((t) => {
    if (selectedTeam !== "All Teams" && t.name !== selectedTeam) return false;
    return true;
  });

  return (
    <div
      style={{
        padding: "24px 28px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        boxSizing: "border-box",
        width: "100%",
        backgroundColor: "#F2F6F8",
      }}
    >
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "32px",
            backgroundColor: "#1F2937",
            color: "#FEFEFE",
            padding: "12px 20px",
            borderRadius: "8px",
            fontSize: "13px",
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Icon name="check-circle" size={16} color="#2563EA" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <button
            onClick={() => navigateTo && navigateTo("Rep-01")}
            title="Back to Dashboard"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 0",
              color: "#1F2937",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon name="arrow-left" size={20} color="#1F2937" />
          </button>
          <div>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#1F2937",
                margin: 0,
                letterSpacing: "-0.3px",
              }}
            >
              Team Reports
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "#6A7589",
                margin: "4px 0 0 0",
              }}
            >
              Team performance and collaboration
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast("Exporting Team Reports...")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "#FEFEFE",
            border: "1px solid #E2E8F0",
            borderRadius: "8px",
            padding: "8px 14px",
            fontSize: "13px",
            fontWeight: 500,
            color: "#4B5563",
            cursor: "pointer",
          }}
          className="button-hover"
        >
          <Icon name="export" size={15} color="#9CA3AF" />
          <span>Export</span>
        </button>
      </div>

      {/* Filter Row */}
      <div
        style={{
          backgroundColor: "#FEFEFE",
          border: "1px solid #E2E8F0",
          borderRadius: "12px",
          padding: "16px 20px",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr auto",
          gap: "16px",
          alignItems: "flex-end",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        }}
      >
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#495668", marginBottom: "6px" }}>
            Date Range
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 12px",
              borderRadius: "8px",
              border: "1px solid #E2E8F0",
              fontSize: "13px",
              color: "#1F2937",
              backgroundColor: "#FEFEFE",
            }}
          >
            <Icon name="calendar" size={15} color="#95A1B6" />
            <span>01 Jan 2024 - 31 Dec 2024</span>
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#495668", marginBottom: "6px" }}>
            Teams
          </label>
          <div style={{ position: "relative" }}>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 32px 9px 12px",
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
                fontSize: "13px",
                color: "#1F2937",
                backgroundColor: "#FEFEFE",
                appearance: "none",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option>All Teams</option>
              <option>Development Team</option>
              <option>Design Team</option>
              <option>Marketing Team</option>
              <option>HR Team</option>
              <option>Finance Team</option>
            </select>
            <div style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <Icon name="chevron-down" size={14} color="#95A1B6" />
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={() => showToast("Team report updated!")}
            style={{
              backgroundColor: "#2563EA",
              color: "#FEFEFE",
              border: "none",
              borderRadius: "8px",
              padding: "10px 24px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              boxShadow: "0 1px 3px rgba(37, 99, 234, 0.3)",
            }}
            className="primary-button-hover"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}
      >
        <MetricCard title="Total Teams" value="5" />
        <MetricCard title="Total Members" value="54" />
        <MetricCard title="Tasks Completed" value="436" />
        <MetricCard title="Avg. Team Performance" value="90.2%" />
      </div>

      {/* Team Progress Bars Card */}
      <div
        style={{
          backgroundColor: "#FEFEFE",
          border: "1px solid #E2E8F0",
          borderRadius: "12px",
          padding: "20px 24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        }}
      >
        <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#1F2937", marginBottom: "16px", margin: "0 0 16px 0" }}>
          Team Performance Overview
        </h2>
        <TeamProgressBars />
      </div>

      {/* Team Details Table */}
      <div
        style={{
          backgroundColor: "#FEFEFE",
          border: "1px solid #E2E8F0",
          borderRadius: "12px",
          padding: "20px 24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        }}
      >
        <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#1F2937", marginBottom: "16px", margin: "0 0 16px 0" }}>
          Team Summary
        </h2>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px" }}>TEAM NAME</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px" }}>MEMBERS</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px" }}>TASKS COMPLETED</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px" }}>PERFORMANCE</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.map((t) => (
                <tr key={t.name} style={{ borderBottom: "1px solid #E2E8F0" }} className="table-row-hover">
                  <td style={{ padding: "14px", color: "#1F2937", fontWeight: 600 }}>{t.name}</td>
                  <td style={{ padding: "14px", color: "#4B5563" }}>{t.members}</td>
                  <td style={{ padding: "14px", color: "#495668" }}>{t.tasksCompleted}</td>
                  <td style={{ padding: "14px", color: "#2563EA", fontWeight: 600 }}>{t.performance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
