"use client";

import React, { useState } from "react";
import { Icon } from "../UI/Icons";

const REPORT_TYPES = [
  { id: "employee", label: "Employee", icon: "employees" },
  { id: "attendance", label: "Attendance", icon: "time-tracking" },
  { id: "leave", label: "Leave", icon: "plane" },
  { id: "project", label: "Project", icon: "projects" },
  { id: "task", label: "Task", icon: "tasks" },
  { id: "department", label: "Department", icon: "departments" },
  { id: "team", label: "Team", icon: "users" },
  { id: "custom", label: "Custom", icon: "edit" },
];

export default function CustomReports({ navigateTo }) {
  const [selectedType, setSelectedType] = useState("custom");
  const [reportName, setReportName] = useState("");
  const [description, setDescription] = useState("");
  const [metric, setMetric] = useState("Select metrics");
  const [filters, setFilters] = useState([]);
  const [generatedReport, setGeneratedReport] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReset = () => {
    setReportName("");
    setDescription("");
    setMetric("Select metrics");
    setFilters([]);
    setGeneratedReport(null);
    showToast("Form reset to default");
  };

  const handleAddFilter = () => {
    const newFilter = `Filter ${filters.length + 1}: Date Range is Current Year`;
    setFilters([...filters, newFilter]);
    showToast("Filter added");
  };

  const handleGenerate = () => {
    setGeneratedReport({
      name: reportName || "Custom Multi-metric Performance Report",
      createdAt: "Today at 03:20 PM",
      type: selectedType,
      metric: metric === "Select metrics" ? "Comprehensive KPIs" : metric,
    });
    showToast("Custom Report generated successfully!");
  };

  return (
    <div
      style={{
        padding: "24px 28px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
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
              Custom Reports
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "#6A7589",
                margin: "4px 0 0 0",
              }}
            >
              Create custom reports based on your requirements
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast("Exporting Custom Report...")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "#FEFEFE",
            border: "1px solid #CDD6E1",
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

      {/* Two-column builder */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "270px 1fr",
          gap: "28px",
          alignItems: "start",
        }}
      >
        {/* Left Column: Select Report Type */}
        <div>
          <h2
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#1F2937",
              marginBottom: "14px",
              margin: "0 0 14px 0",
            }}
          >
            Select Report Type
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {REPORT_TYPES.map((type) => {
              const isSelected = selectedType === type.id;
              return (
                <div
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    backgroundColor: isSelected ? "#FEFEFE" : "transparent",
                    border: isSelected ? "1px solid #2563EA" : "1px solid transparent",
                    transition: "all 0.15s ease",
                  }}
                  className={isSelected ? "" : "list-item-hover"}
                >
                  {/* Radio circle */}
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      border: isSelected ? "5px solid #2563EA" : "1.5px solid #CDD6E1",
                      backgroundColor: "#FEFEFE",
                      boxSizing: "border-box",
                      flexShrink: 0,
                    }}
                  />

                  {/* Icon */}
                  <Icon
                    name={type.icon}
                    size={16}
                    color={isSelected ? "#2563EA" : "#6A7589"}
                  />

                  {/* Label */}
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: isSelected ? 600 : 500,
                      color: isSelected ? "#2563EA" : "#4B5563",
                    }}
                  >
                    {type.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Report Configuration Card */}
        <div
          style={{
            backgroundColor: "#FEFEFE",
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
            padding: "26px 28px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column",
            gap: "22px",
          }}
        >
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#1F2937",
              margin: 0,
            }}
          >
            Report Configuration
          </h2>

          {/* Report Name */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 500,
                color: "#495668",
                marginBottom: "6px",
              }}
            >
              Report Name
            </label>
            <input
              type="text"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              placeholder="Enter report name"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #CDD6E1",
                fontSize: "13px",
                color: "#1F2937",
                outline: "none",
                fontFamily: "inherit",
                backgroundColor: "#FEFEFE",
              }}
            />
          </div>

          {/* Description */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 500,
                color: "#495668",
                marginBottom: "6px",
              }}
            >
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter report description"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #CDD6E1",
                fontSize: "13px",
                color: "#1F2937",
                outline: "none",
                fontFamily: "inherit",
                resize: "vertical",
                backgroundColor: "#FEFEFE",
              }}
            />
          </div>

          {/* Select Metrics */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 500,
                color: "#495668",
                marginBottom: "6px",
              }}
            >
              Select Metrics
            </label>
            <div style={{ position: "relative" }}>
              <select
                value={metric}
                onChange={(e) => setMetric(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 36px 10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #CDD6E1",
                  fontSize: "13px",
                  color: metric === "Select metrics" ? "#6A7589" : "#1F2937",
                  backgroundColor: "#FEFEFE",
                  appearance: "none",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option>Select metrics</option>
                <option>Tasks Completion Rate & Velocity</option>
                <option>Employee Attendance & Leave Ratio</option>
                <option>Project Milestones & Budget Health</option>
                <option>Department Productivity Score</option>
                <option>Team Performance Index</option>
              </select>
              <div
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <Icon name="chevron-down" size={14} color="#6A7589" />
              </div>
            </div>
          </div>

          {/* Filters Area */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 500,
                color: "#495668",
                marginBottom: "6px",
              }}
            >
              Filters
            </label>
            <div
              style={{
                border: "1px dashed #CDD6E1",
                borderRadius: "8px",
                padding: "24px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                backgroundColor: "#F2F6F8",
              }}
            >
              {filters.map((f, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: "12px",
                    color: "#1F2937",
                    backgroundColor: "#FEFEFE",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    border: "1px solid #CDD6E1",
                  }}
                >
                  {f}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddFilter}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#E2E8F0",
                  color: "#495668",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 14px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background-color 0.15s ease",
                }}
              >
                <Icon name="plus" size={13} color="#495668" />
                <span>Add Filter</span>
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              marginTop: "12px",
            }}
          >
            <button
              type="button"
              onClick={handleReset}
              style={{
                backgroundColor: "#FEFEFE",
                border: "1px solid #CDD6E1",
                borderRadius: "8px",
                padding: "9px 20px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#4B5563",
                cursor: "pointer",
              }}
              className="button-hover"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleGenerate}
              style={{
                backgroundColor: "#2563EA",
                border: "none",
                borderRadius: "8px",
                padding: "9px 24px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#FEFEFE",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(37, 99, 234, 0.3)",
              }}
              className="primary-button-hover"
            >
              Generate Report
            </button>
          </div>

          {/* Generated Report Preview */}
          {generatedReport && (
            <div
              style={{
                marginTop: "16px",
                padding: "16px 20px",
                backgroundColor: "#F2F6F8",
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
                animation: "fadeIn 0.25s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#1F2937" }}>
                    {generatedReport.name}
                  </div>
                  <div style={{ fontSize: "11px", color: "#6A7589" }}>
                    Generated: {generatedReport.createdAt} &middot; Type: {generatedReport.type}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    backgroundColor: "#FEFEFE",
                    color: "#2563EA",
                    padding: "3px 8px",
                    borderRadius: "999px",
                    border: "1px solid #2563EA33",
                  }}
                >
                  Live Report Ready
                </span>
              </div>
              <div style={{ fontSize: "12px", color: "#495668", lineHeight: 1.5 }}>
                Included metrics: <strong>{generatedReport.metric}</strong>. Filters applied:{" "}
                <strong>{filters.length > 0 ? filters.length : "None (Default Global Scope)"}</strong>.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
