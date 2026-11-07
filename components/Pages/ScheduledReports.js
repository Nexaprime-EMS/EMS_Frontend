"use client";

import React, { useState } from "react";
import { Icon } from "../UI/Icons";

const INITIAL_SCHEDULED = [
  {
    id: 1,
    name: "Monthly Attendance Report",
    type: "Attendance",
    frequency: "Monthly",
    recipients: 5,
    nextRun: "15 Jan 2024",
    active: true,
  },
  {
    id: 2,
    name: "Weekly Leave Report",
    type: "Leave",
    frequency: "Weekly",
    recipients: 3,
    nextRun: "12 Jan 2024",
    active: true,
  },
  {
    id: 3,
    name: "Project Progress Report",
    type: "Project",
    frequency: "Weekly",
    recipients: 4,
    nextRun: "12 Jan 2024",
    active: true,
  },
  {
    id: 4,
    name: "Task Summary Report",
    type: "Task",
    frequency: "Daily",
    recipients: 2,
    nextRun: "11 Jan 2024",
    active: true,
  },
  {
    id: 5,
    name: "Department Performance Report",
    type: "Department",
    frequency: "Monthly",
    recipients: 6,
    nextRun: "15 Jan 2024",
    active: false,
  },
  {
    id: 6,
    name: "Team Productivity Report",
    type: "Team",
    frequency: "Weekly",
    recipients: 3,
    nextRun: "12 Jan 2024",
    active: true,
  },
];

export default function ScheduledReports({ navigateTo }) {
  const [reports, setReports] = useState(INITIAL_SCHEDULED);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReportName, setNewReportName] = useState("");
  const [newReportType, setNewReportType] = useState("Attendance");
  const [newFrequency, setNewFrequency] = useState("Weekly");
  const [newRecipients, setNewRecipients] = useState("3");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleStatus = (id) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextState = !r.active;
          showToast(`${r.name} is now ${nextState ? "Active" : "Paused"}`);
          return { ...r, active: nextState };
        }
        return r;
      })
    );
  };

  const handleDelete = (id, name) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
    showToast(`Deleted "${name}"`);
  };

  const handleCreateSchedule = (e) => {
    e.preventDefault();
    if (!newReportName) {
      showToast("Please enter a report name");
      return;
    }
    const newEntry = {
      id: Date.now(),
      name: newReportName,
      type: newReportType,
      frequency: newFrequency,
      recipients: parseInt(newRecipients, 10) || 1,
      nextRun: "18 Jan 2024",
      active: true,
    };
    setReports([newEntry, ...reports]);
    setIsModalOpen(false);
    setNewReportName("");
    showToast(`Scheduled "${newReportName}" successfully!`);
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
          <Icon name="check-circle" size={16} color="#12B982" />
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
              Scheduled Reports
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "#4B5563",
                margin: "4px 0 0 0",
              }}
            >
              Manage your scheduled reports
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "#2563EA",
              border: "none",
              borderRadius: "8px",
              padding: "9px 16px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#FEFEFE",
              cursor: "pointer",
              boxShadow: "0 1px 3px rgba(37, 99, 234, 0.3)",
            }}
            className="primary-button-hover"
          >
            <Icon name="plus" size={15} color="#FEFEFE" />
            <span>Schedule Report</span>
          </button>

          <button
            onClick={() => showToast("Exporting Scheduled Reports...")}
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
            <Icon name="export" size={15} color="#95A1B6" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Scheduled Reports Table Card */}
      <div
        style={{
          backgroundColor: "#FEFEFE",
          border: "1px solid #E2E8F0",
          borderRadius: "12px",
          padding: "20px 24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              fontSize: "13px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px" }}>REPORT NAME</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px" }}>REPORT TYPE</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px" }}>FREQUENCY</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px" }}>RECIPIENTS</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px" }}>NEXT RUN</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px" }}>STATUS</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "right" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((row) => (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: "1px solid #E2E8F0",
                    transition: "background-color 0.15s ease",
                  }}
                  className="table-row-hover"
                >
                  <td style={{ padding: "16px 14px", color: "#1F2937", fontWeight: 600 }}>
                    {row.name}
                  </td>
                  <td style={{ padding: "16px 14px", color: "#4B5563" }}>{row.type}</td>
                  <td style={{ padding: "16px 14px", color: "#4B5563" }}>{row.frequency}</td>
                  <td style={{ padding: "16px 14px", color: "#495668", fontWeight: 500 }}>
                    {row.recipients}
                  </td>
                  <td style={{ padding: "16px 14px", color: "#4B5563" }}>{row.nextRun}</td>
                  <td style={{ padding: "16px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: row.active ? "#12B982" : "#95A1B6",
                          minWidth: "50px",
                        }}
                      >
                        {row.active ? "Active" : "Paused"}
                      </span>

                      {/* Interactive Toggle Switch */}
                      <div
                        onClick={() => toggleStatus(row.id)}
                        style={{
                          width: "36px",
                          height: "20px",
                          borderRadius: "999px",
                          backgroundColor: row.active ? "#2563EA" : "#E2E8F0",
                          position: "relative",
                          cursor: "pointer",
                          transition: "background-color 0.2s ease",
                        }}
                      >
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            backgroundColor: "#FEFEFE",
                            position: "absolute",
                            top: "2px",
                            left: row.active ? "18px" : "2px",
                            transition: "left 0.2s ease",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "16px 14px", textAlign: "right" }}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <button
                        title="Edit schedule"
                        onClick={() => showToast(`Editing "${row.name}"`)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#95A1B6",
                          padding: "2px",
                        }}
                      >
                        <Icon name="edit" size={16} color="#95A1B6" />
                      </button>
                      <button
                        title="Delete schedule"
                        onClick={() => handleDelete(row.id, row.name)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#95A1B6",
                          padding: "2px",
                        }}
                      >
                        <Icon name="trash" size={16} color="#95A1B6" />
                      </button>
                    </div>
                  </td>
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
            Showing 1 to {reports.length} of 1,248 entries
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
              onClick={() => setCurrentPage((p) => Math.min(250, p + 1))}
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

      {/* Modal for Creating New Schedule */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(31, 41, 55, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            backdropFilter: "blur(2px)",
          }}
        >
          <div
            style={{
              backgroundColor: "#FEFEFE",
              borderRadius: "12px",
              width: "480px",
              padding: "24px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              border: "1px solid #E2E8F0",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1F2937", margin: 0 }}>
                Schedule a Report
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#95A1B6", fontSize: "20px" }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateSchedule} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#495668", marginBottom: "4px" }}>
                  Report Name
                </label>
                <input
                  type="text"
                  value={newReportName}
                  onChange={(e) => setNewReportName(e.target.value)}
                  placeholder="e.g. Executive Attendance Digest"
                  required
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                    fontSize: "13px",
                    color: "#1F2937",
                    outline: "none",
                    fontFamily: "inherit",
                    backgroundColor: "#FEFEFE",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#495668", marginBottom: "4px" }}>
                  Report Type
                </label>
                <select
                  value={newReportType}
                  onChange={(e) => setNewReportType(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                    fontSize: "13px",
                    color: "#1F2937",
                    outline: "none",
                    backgroundColor: "#FEFEFE",
                  }}
                >
                  <option>Attendance</option>
                  <option>Leave</option>
                  <option>Project</option>
                  <option>Task</option>
                  <option>Department</option>
                  <option>Team</option>
                  <option>Productivity</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#495668", marginBottom: "4px" }}>
                    Frequency
                  </label>
                  <select
                    value={newFrequency}
                    onChange={(e) => setNewFrequency(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "8px",
                      border: "1px solid #E2E8F0",
                      fontSize: "13px",
                      color: "#1F2937",
                      outline: "none",
                      backgroundColor: "#FEFEFE",
                    }}
                  >
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#495668", marginBottom: "4px" }}>
                    Recipients Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newRecipients}
                    onChange={(e) => setNewRecipients(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "8px",
                      border: "1px solid #E2E8F0",
                      fontSize: "13px",
                      color: "#1F2937",
                      outline: "none",
                      backgroundColor: "#FEFEFE",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    backgroundColor: "#FEFEFE",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#4B5563",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#2563EA",
                    color: "#FEFEFE",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 20px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Confirm & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
