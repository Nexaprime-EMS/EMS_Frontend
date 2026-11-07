"use client";

import React, { useState } from "react";
import { Icon } from "../UI/Icons";

const AVAILABLE_REPORTS = [
  { id: "dashboard", name: "Dashboard Analytics", icon: "reports" },
  { id: "employee", name: "Employee Reports", icon: "employees" },
  { id: "attendance", name: "Attendance Reports", icon: "time-tracking" },
  { id: "leave", name: "Leave Reports", icon: "plane" },
  { id: "project", name: "Project Reports", icon: "projects" },
  { id: "task", name: "Task Reports", icon: "tasks" },
  { id: "productivity", name: "Productivity Reports", icon: "zap" },
  { id: "department", name: "Department Reports", icon: "departments" },
  { id: "team", name: "Team Reports", icon: "users" },
  { id: "custom", name: "Custom Reports", icon: "sliders" },
];

const FORMATS = [
  { id: "pdf", name: "PDF", badge: "PDF", badgeBg: "#2563EA", badgeColor: "#FEFEFE" },
  { id: "excel", name: "Excel", badge: "X", badgeBg: "#1F2937", badgeColor: "#FEFEFE" },
  { id: "csv", name: "CSV", badge: "CSV", badgeBg: "#2563EA", badgeColor: "#FEFEFE" },
  { id: "word", name: "Word", badge: "W", badgeBg: "#495668", badgeColor: "#FEFEFE" },
];

export default function ExportCenter({ navigateTo }) {
  const [selectedReports, setSelectedReports] = useState(["dashboard", "employee", "attendance"]);
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [includeCharts, setIncludeCharts] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleReport = (id) => {
    if (selectedReports.includes(id)) {
      setSelectedReports(selectedReports.filter((item) => item !== id));
    } else {
      setSelectedReports([...selectedReports, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedReports.length === AVAILABLE_REPORTS.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(AVAILABLE_REPORTS.map((r) => r.id));
    }
  };

  const handleDeselectAll = () => {
    setSelectedReports([]);
  };

  const handleExport = () => {
    if (selectedReports.length === 0) {
      showToast("Please select at least one report to export");
      return;
    }
    showToast(
      `Exported ${selectedReports.length} reports in ${selectedFormat.toUpperCase()} format (Charts: ${
        includeCharts ? "Included" : "Excluded"
      })`
    );
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
              Export Center
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "#4B5563",
                margin: "4px 0 0 0",
              }}
            >
              Export your reports in various formats
            </p>
          </div>
        </div>

        <button
          onClick={handleExport}
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
          <Icon name="export" size={15} color="#95A1B6" />
          <span>Export</span>
        </button>
      </div>

      {/* Two Column Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1.6fr",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* Left Card: Select Reports */}
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
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "#1F2937" }}>
                Select Reports
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  backgroundColor: "#F2F6F8",
                  color: "#2563EA",
                  padding: "2px 8px",
                  borderRadius: "999px",
                  border: "1px solid #E2E8F0",
                }}
              >
                {selectedReports.length} Selected
              </span>
            </div>

            <button
              onClick={handleDeselectAll}
              style={{
                background: "none",
                border: "none",
                color: "#2563EA",
                fontSize: "12px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Deselect All
            </button>
          </div>

          {/* Select All Option */}
          <div
            onClick={handleSelectAll}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 0 14px 0",
              cursor: "pointer",
              borderBottom: "1px solid #E2E8F0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "4px",
                  border:
                    selectedReports.length === AVAILABLE_REPORTS.length
                      ? "none"
                      : "1.5px solid #CDD6E1",
                  backgroundColor:
                    selectedReports.length === AVAILABLE_REPORTS.length ? "#2563EA" : "#FEFEFE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {selectedReports.length === AVAILABLE_REPORTS.length && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="#FEFEFE"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F2937" }}>
                Select All Reports
              </span>
            </div>
            <span style={{ fontSize: "12px", color: "#95A1B6" }}>10 Available</span>
          </div>

          {/* List of 10 Reports */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginTop: "8px" }}>
            {AVAILABLE_REPORTS.map((item) => {
              const isChecked = selectedReports.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleReport(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "9px 8px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "background-color 0.15s ease",
                  }}
                  className="list-item-hover"
                >
                  {/* Checkbox box */}
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "4px",
                      border: isChecked ? "none" : "1.5px solid #CDD6E1",
                      backgroundColor: isChecked ? "#2563EA" : "#FEFEFE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {isChecked && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="#FEFEFE"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Icon */}
                  <Icon
                    name={item.icon}
                    size={16}
                    color={isChecked ? "#2563EA" : "#95A1B6"}
                  />

                  {/* Label */}
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: isChecked ? 600 : 500,
                      color: isChecked ? "#1F2937" : "#4B5563",
                    }}
                  >
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Card: Export Settings */}
        <div
          style={{
            backgroundColor: "#FEFEFE",
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
            padding: "24px 26px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <h2
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#1F2937",
              margin: 0,
            }}
          >
            Export Settings
          </h2>

          {/* Date Range */}
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
              Date Range
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 14px",
                borderRadius: "8px",
                border: "1px solid #CDD6E1",
                fontSize: "13px",
                color: "#1F2937",
                backgroundColor: "#FEFEFE",
                cursor: "pointer",
              }}
            >
              <Icon name="calendar" size={15} color="#95A1B6" />
              <span>01 Jan 2024 - 31 Dec 2024</span>
            </div>
          </div>

          {/* Export Format */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 500,
                color: "#495668",
                marginBottom: "8px",
              }}
            >
              Export Format
            </label>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "12px",
              }}
            >
              {FORMATS.map((fmt) => {
                const isSelected = selectedFormat === fmt.id;
                return (
                  <div
                    key={fmt.id}
                    onClick={() => setSelectedFormat(fmt.id)}
                    style={{
                      border: isSelected ? "1.5px solid #2563EA" : "1px solid #CDD6E1",
                      backgroundColor: isSelected ? "#F2F6F8" : "#FEFEFE",
                      borderRadius: "8px",
                      padding: "16px 10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {/* Badge */}
                    <div
                      style={{
                        padding: fmt.id === "pdf" ? "2px 6px" : "3px 6px",
                        borderRadius: "4px",
                        backgroundColor: fmt.badgeBg,
                        color: fmt.badgeColor,
                        fontSize: "11px",
                        fontWeight: 700,
                        lineHeight: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {fmt.badge}
                    </div>

                    {/* Format name */}
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: isSelected ? 600 : 500,
                        color: isSelected ? "#2563EA" : "#4B5563",
                      }}
                    >
                      {fmt.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Include Charts Toggle */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "6px",
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: 500, color: "#1F2937" }}>
              Include Charts
            </span>

            {/* Toggle switch */}
            <div
              onClick={() => setIncludeCharts(!includeCharts)}
              style={{
                width: "40px",
                height: "22px",
                borderRadius: "999px",
                backgroundColor: includeCharts ? "#2563EA" : "#E2E8F0",
                position: "relative",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  backgroundColor: "#FEFEFE",
                  position: "absolute",
                  top: "2px",
                  left: includeCharts ? "20px" : "2px",
                  transition: "left 0.2s ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
              />
            </div>
          </div>

          {/* Export Action Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "8px",
              paddingTop: "16px",
              borderTop: "1px solid #E2E8F0",
            }}
          >
            <button
              onClick={handleExport}
              disabled={selectedReports.length === 0}
              style={{
                backgroundColor: selectedReports.length === 0 ? "#95A1B6" : "#2563EA",
                color: "#FEFEFE",
                border: "none",
                borderRadius: "8px",
                padding: "10px 24px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: selectedReports.length === 0 ? "not-allowed" : "pointer",
                boxShadow: "0 1px 3px rgba(37, 99, 234, 0.3)",
                transition: "background-color 0.15s ease",
              }}
              className={selectedReports.length === 0 ? "" : "primary-button-hover"}
            >
              Export {selectedReports.length} {selectedReports.length === 1 ? "Report" : "Reports"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
