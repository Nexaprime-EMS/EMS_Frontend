"use client";

import React, { useState } from "react";
import { Icon } from "../UI/Icons";
import MetricCard from "../UI/MetricCard";
import DonutChart from "../Charts/DonutChart";
import TasksPriorityBars from "../Charts/TasksPriorityBars";

const RECENT_TASKS = [
  {
    name: "UI Design",
    project: "Mobile App",
    assignee: "Leslie Alexander",
    priority: "High",
    priorityColor: "#F0434D",
    status: "Completed",
    statusBg: "#FEFEFE",
    statusColor: "#2563EA",
    dueDate: "10 Jan 2024",
  },
  {
    name: "API Integration",
    project: "ERP Implementation",
    assignee: "Robert Fox",
    priority: "High",
    priorityColor: "#F0434D",
    status: "In Progress",
    statusBg: "#F2F6F8",
    statusColor: "#495668",
    dueDate: "12 Jan 2024",
  },
  {
    name: "Content Writing",
    project: "Marketing Campaign",
    assignee: "Eleanor Pena",
    priority: "Medium",
    priorityColor: "#2563EA",
    status: "In Progress",
    statusBg: "#F2F6F8",
    statusColor: "#495668",
    dueDate: "15 Jan 2024",
  },
  {
    name: "Database Setup",
    project: "Data Migration",
    assignee: "Cody Fisher",
    priority: "Low",
    priorityColor: "#495668",
    status: "Completed",
    statusBg: "#FEFEFE",
    statusColor: "#2563EA",
    dueDate: "18 Jan 2024",
  },
  {
    name: "Testing",
    project: "Website Redesign",
    assignee: "Jane Cooper",
    priority: "High",
    priorityColor: "#F0434D",
    status: "Overdue",
    statusBg: "#FEFEFE",
    statusColor: "#F0434D",
    dueDate: "05 Jan 2024",
  },
];

export default function TaskReports({ navigateTo }) {
  const [taskStatus, setTaskStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const taskStatusData = [
    { label: "Completed", value: 72, color: "#2563EA" },
    { label: "In Progress", value: 22, color: "#6A7589" },
    { label: "Overdue", value: 6, color: "#F0434D" },
  ];

  const filteredTasks = RECENT_TASKS.filter((t) => {
    if (taskStatus !== "All Status" && t.status !== taskStatus) return false;
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
              Task Reports
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "#6A7589",
                margin: "4px 0 0 0",
              }}
            >
              Monitor task completion and status
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast("Exporting Task Reports...")}
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
            <Icon name="calendar" size={15} color="#95A1B6" />
            <span>01 Jan 2024 - 31 Dec 2024</span>
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#495668", marginBottom: "6px" }}>
            Task Status
          </label>
          <div style={{ position: "relative" }}>
            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
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
              <option>Overdue</option>
            </select>
            <div style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <Icon name="chevron-down" size={14} color="#95A1B6" />
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={() => showToast("Task report generated!")}
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
        <MetricCard title="TOTAL TASKS" value="1,284" />
        <MetricCard title="COMPLETED" value="924" />
        <MetricCard title="IN PROGRESS" value="284" />
        <MetricCard title="OVERDUE" value="76" />
      </div>

      {/* 2 Middle Cards: Task Status Overview & Tasks by Priority */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1.6fr",
          gap: "16px",
        }}
      >
        {/* Task Status Overview */}
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
            Task Status Overview
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
            <DonutChart
              data={taskStatusData}
              size={170}
              strokeWidth={22}
              legendLayout="right-list"
            />
          </div>
        </div>

        {/* Tasks by Priority */}
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
            Tasks by Priority
          </h2>
          <TasksPriorityBars />
        </div>
      </div>

      {/* Recent Tasks Table */}
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
          Recent Tasks
        </h2>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#6A7589", textTransform: "uppercase", letterSpacing: "0.5px" }}>TASK NAME</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#6A7589", textTransform: "uppercase", letterSpacing: "0.5px" }}>PROJECT</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#6A7589", textTransform: "uppercase", letterSpacing: "0.5px" }}>ASSIGNEE</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#6A7589", textTransform: "uppercase", letterSpacing: "0.5px" }}>PRIORITY</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#6A7589", textTransform: "uppercase", letterSpacing: "0.5px" }}>STATUS</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#6A7589", textTransform: "uppercase", letterSpacing: "0.5px" }}>DUE DATE</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((t) => (
                <tr key={t.name} style={{ borderBottom: "1px solid #E2E8F0" }} className="table-row-hover">
                  <td style={{ padding: "14px", color: "#1F2937", fontWeight: 600 }}>{t.name}</td>
                  <td style={{ padding: "14px", color: "#4B5563" }}>{t.project}</td>
                  <td style={{ padding: "14px", color: "#495668" }}>{t.assignee}</td>
                  <td style={{ padding: "14px", color: t.priorityColor, fontWeight: 600 }}>{t.priority}</td>
                  <td style={{ padding: "14px" }}>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "999px",
                        fontSize: "11px",
                        fontWeight: 600,
                        backgroundColor: t.statusBg,
                        color: t.statusColor,
                        border: "1px solid #E2E8F0",
                      }}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td style={{ padding: "14px", color: "#4B5563" }}>{t.dueDate}</td>
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
            Showing 1 to {filteredTasks.length} of 1,248 entries
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
