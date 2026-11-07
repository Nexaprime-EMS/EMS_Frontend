"use client";

import React, { useState } from "react";
import { Icon } from "../UI/Icons";
import MetricCard from "../UI/MetricCard";
import DonutChart from "../Charts/DonutChart";
import ProjectProgressBars from "../Charts/ProjectProgressBars";

const PROJECTS = [
  {
    name: "Website Redesign",
    manager: "Jane Cooper",
    status: "Completed",
    statusBg: "#FEFEFE",
    statusColor: "#2563EA",
    progress: "90%",
    startDate: "01 Jan 2024",
    endDate: "31 Mar 2024",
  },
  {
    name: "Mobile App Development",
    manager: "Leslie Alexander",
    status: "In Progress",
    statusBg: "#F2F6F8",
    statusColor: "#495668",
    progress: "75%",
    startDate: "15 Jan 2024",
    endDate: "15 Apr 2024",
  },
  {
    name: "ERP Integration",
    manager: "Robert Fox",
    status: "In Progress",
    statusBg: "#F2F6F8",
    statusColor: "#495668",
    progress: "60%",
    startDate: "01 Feb 2024",
    endDate: "30 Jun 2024",
  },
  {
    name: "Marketing Campaign",
    manager: "Eleanor Pena",
    status: "On Hold",
    statusBg: "#F2F6F8",
    statusColor: "#95A1B6",
    progress: "40%",
    startDate: "10 Feb 2024",
    endDate: "30 Apr 2024",
  },
  {
    name: "Data Migration",
    manager: "Cody Fisher",
    status: "On Hold",
    statusBg: "#F2F6F8",
    statusColor: "#95A1B6",
    progress: "25%",
    startDate: "20 Jan 2024",
    endDate: "20 May 2024",
  },
];

export default function ProjectReports({ navigateTo }) {
  const [projectStatus, setProjectStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const projectStatusData = [
    { label: "Completed", value: 75, color: "#2563EA" },
    { label: "In Progress", value: 17, color: "#495668" },
    { label: "On Hold", value: 8, color: "#95A1B6" },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (projectStatus !== "All Status" && p.status !== projectStatus) return false;
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
              Project Reports
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "#6A7589",
                margin: "4px 0 0 0",
              }}
            >
              Track project progress and performance
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast("Exporting Project Reports...")}
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
          <Icon name="export" size={15} color="#6A7589" />
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
            <Icon name="calendar" size={15} color="#9CA3AF" />
            <span>01 Jan 2024 - 31 Dec 2024</span>
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#495668", marginBottom: "6px" }}>
            Project Status
          </label>
          <div style={{ position: "relative" }}>
            <select
              value={projectStatus}
              onChange={(e) => setProjectStatus(e.target.value)}
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
              <option>All Status</option>
              <option>Completed</option>
              <option>In Progress</option>
              <option>On Hold</option>
            </select>
            <div style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <Icon name="chevron-down" size={14} color="#9CA3AF" />
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={() => showToast("Project reports generated!")}
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
        <MetricCard title="TOTAL PROJECTS" value="24" />
        <MetricCard title="COMPLETED" value="18" />
        <MetricCard title="IN PROGRESS" value="4" />
        <MetricCard title="ON HOLD" value="2" />
      </div>

      {/* 2 Middle Cards: Project Status Overview & Top Projects by Progress */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1.6fr",
          gap: "16px",
        }}
      >
        {/* Left: Project Status Overview Donut */}
        <div
          style={{
            backgroundColor: "#FEFEFE",
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
            padding: "20px 22px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#1F2937", marginBottom: "16px", margin: "0 0 16px 0" }}>
            Project Status Overview
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", flex: 1 }}>
            <DonutChart
              data={projectStatusData}
              centerValue="24"
              centerLabel="Projects"
              size={170}
              strokeWidth={22}
              legendLayout="right-list"
            />
          </div>
        </div>

        {/* Right: Top Projects by Progress */}
        <div
          style={{
            backgroundColor: "#FEFEFE",
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
            padding: "20px 22px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#1F2937", marginBottom: "16px", margin: "0 0 16px 0" }}>
            Top Projects by Progress
          </h2>
          <ProjectProgressBars />
        </div>
      </div>

      {/* Project Summary Table */}
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
          Project Summary
        </h2>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#6A7589", textTransform: "uppercase", letterSpacing: "0.5px" }}>PROJECT NAME</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#6A7589", textTransform: "uppercase", letterSpacing: "0.5px" }}>MANAGER</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#6A7589", textTransform: "uppercase", letterSpacing: "0.5px" }}>STATUS</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#6A7589", textTransform: "uppercase", letterSpacing: "0.5px" }}>PROGRESS</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#6A7589", textTransform: "uppercase", letterSpacing: "0.5px" }}>START DATE</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#6A7589", textTransform: "uppercase", letterSpacing: "0.5px" }}>END DATE</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((p) => (
                <tr key={p.name} style={{ borderBottom: "1px solid #E2E8F0" }} className="table-row-hover">
                  <td style={{ padding: "14px", color: "#1F2937", fontWeight: 600 }}>{p.name}</td>
                  <td style={{ padding: "14px", color: "#495668" }}>{p.manager}</td>
                  <td style={{ padding: "14px" }}>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "999px",
                        fontSize: "11px",
                        fontWeight: 600,
                        backgroundColor: p.statusBg,
                        color: p.statusColor,
                        border: "1px solid #E2E8F0",
                      }}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: "14px", color: "#2563EA", fontWeight: 600 }}>{p.progress}</td>
                  <td style={{ padding: "14px", color: "#4B5563" }}>{p.startDate}</td>
                  <td style={{ padding: "14px", color: "#4B5563" }}>{p.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "18px",
            paddingTop: "14px",
            borderTop: "1px solid #E2E8F0",
          }}
        >
          <span style={{ fontSize: "12px", color: "#95A1B6" }}>
            Showing 1 to {filteredProjects.length} of 1,248 entries
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              style={{
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #E2E8F0",
                borderRadius: "6px",
                backgroundColor: "#FEFEFE",
                cursor: "pointer",
                color: "#4B5563",
                fontSize: "12px",
              }}
            >
              &lt;
            </button>
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                style={{
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: currentPage === num ? "1px solid #2563EA" : "1px solid #E2E8F0",
                  borderRadius: "6px",
                  backgroundColor: currentPage === num ? "#2563EA" : "#FEFEFE",
                  color: currentPage === num ? "#FEFEFE" : "#4B5563",
                  fontWeight: currentPage === num ? 600 : 400,
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                {num}
              </button>
            ))}
            <span style={{ padding: "0 4px", color: "#95A1B6", fontSize: "12px" }}>...</span>
            <button
              onClick={() => setCurrentPage(250)}
              style={{
                padding: "0 8px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #E2E8F0",
                borderRadius: "6px",
                backgroundColor: "#FEFEFE",
                color: "#4B5563",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              250
            </button>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              style={{
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #E2E8F0",
                borderRadius: "6px",
                backgroundColor: "#FEFEFE",
                cursor: "pointer",
                color: "#4B5563",
                fontSize: "12px",
              }}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
