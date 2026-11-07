"use client";

import React, { useState } from "react";
import { Icon } from "../UI/Icons";
import MetricCard from "../UI/MetricCard";
import LeaveTrendBarChart from "../Charts/LeaveTrendBarChart";
import DonutChart from "../Charts/DonutChart";

const LEAVE_REQUESTS = [
  {
    initials: "JC",
    initialsBg: "#F2F6F8",
    initialsColor: "#2563EA",
    name: "Jane Cooper",
    empId: "EMP-1001",
    department: "Human Resources",
    leaveType: "Annual Leave",
    duration: "12 Oct - 15 Oct (4 days)",
    status: "Approved",
    statusBg: "#FEFEFE",
    statusColor: "#06966B",
  },
  {
    initials: "RF",
    initialsBg: "#F2F6F8",
    initialsColor: "#70A3F8",
    name: "Robert Fox",
    empId: "EMP-1002",
    department: "Development",
    leaveType: "Sick Leave",
    duration: "08 Nov - 09 Nov (2 days)",
    status: "Pending",
    statusBg: "#F2F6F8",
    statusColor: "#2563EA",
  },
  {
    initials: "LA",
    initialsBg: "#F2F6F8",
    initialsColor: "#2563EA",
    name: "Leslie Alexander",
    empId: "EMP-1003",
    department: "Design",
    leaveType: "Annual Leave",
    duration: "20 Dec - 31 Dec (10 days)",
    status: "Approved",
    statusBg: "#FEFEFE",
    statusColor: "#06966B",
  },
  {
    initials: "CF",
    initialsBg: "#F2F6F8",
    initialsColor: "#4B5563",
    name: "Cody Fisher",
    empId: "EMP-1004",
    department: "Marketing",
    leaveType: "Unpaid Leave",
    duration: "01 Nov - 05 Nov (5 days)",
    status: "Rejected",
    statusBg: "#F2F6F8",
    statusColor: "#4B5563",
  },
  {
    initials: "EP",
    initialsBg: "#F2F6F8",
    initialsColor: "#06966B",
    name: "Eleanor Pena",
    empId: "EMP-1005",
    department: "Finance",
    leaveType: "Sick Leave",
    duration: "18 Sep - 18 Sep (1 day)",
    status: "Approved",
    statusBg: "#FEFEFE",
    statusColor: "#06966B",
  },
];

export default function LeaveReports({ navigateTo }) {
  const [department, setDepartment] = useState("All Departments");
  const [leaveType, setLeaveType] = useState("All Types");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const distributionData = [
    { label: "Annual", value: 46, color: "#2563EA" },
    { label: "Sick", value: 32, color: "#06966B" },
    { label: "Unpaid", value: 15, color: "#70A3F8" },
    { label: "Other", value: 7, color: "#95A1B6" },
  ];

  const filteredRequests = LEAVE_REQUESTS.filter((req) => {
    if (department !== "All Departments" && req.department !== department) return false;
    if (leaveType !== "All Types" && req.leaveType !== leaveType) return false;
    if (
      searchTerm &&
      !req.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !req.empId.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
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
          <Icon name="check-circle" size={16} color="#06966B" />
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
              Leave Reports
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "#95A1B6",
                margin: "4px 0 0 0",
              }}
            >
              Analyze employee leave data and patterns
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast("Exporting Leave Reports...")}
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

      {/* Filter Row Card */}
      <div
        style={{
          backgroundColor: "#FEFEFE",
          border: "1px solid #E2E8F0",
          borderRadius: "12px",
          padding: "16px 20px",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr 1fr auto",
          gap: "16px",
          alignItems: "flex-end",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        }}
      >
        {/* Date Range */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "12px",
              fontWeight: 500,
              color: "#4B5563",
              marginBottom: "6px",
            }}
          >
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
              cursor: "pointer",
            }}
          >
            <Icon name="calendar" size={15} color="#9CA3AF" />
            <span>01 Jan 2024 - 31 Dec 2024</span>
          </div>
        </div>

        {/* Department dropdown */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "12px",
              fontWeight: 500,
              color: "#4B5563",
              marginBottom: "6px",
            }}
          >
            Department
          </label>
          <div style={{ position: "relative" }}>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
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
              <option>All Departments</option>
              <option>Human Resources</option>
              <option>Development</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Finance</option>
            </select>
            <div
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            >
              <Icon name="chevron-down" size={14} color="#9CA3AF" />
            </div>
          </div>
        </div>

        {/* Leave Type dropdown */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "12px",
              fontWeight: 500,
              color: "#4B5563",
              marginBottom: "6px",
            }}
          >
            Leave Type
          </label>
          <div style={{ position: "relative" }}>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
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
              <option>All Types</option>
              <option>Annual Leave</option>
              <option>Sick Leave</option>
              <option>Unpaid Leave</option>
            </select>
            <div
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            >
              <Icon name="chevron-down" size={14} color="#9CA3AF" />
            </div>
          </div>
        </div>

        {/* Generate Report Button */}
        <div>
          <button
            onClick={() => showToast("Leave report generated!")}
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

      {/* 4 Metric KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}
      >
        <MetricCard title="Total Leaves Taken" value="452" unit="days" />
        <MetricCard title="Annual Leave" value="210" unit="days" />
        <MetricCard title="Sick Leave" value="145" unit="days" />
        <MetricCard title="Pending Requests" value="24" />
      </div>

      {/* 2 Charts: Monthly Leave Trend & Leave Distribution by Type */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1.4fr",
          gap: "16px",
        }}
      >
        {/* Left: Monthly Leave Trend */}
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
          <h2
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#1F2937",
              marginBottom: "16px",
              margin: "0 0 16px 0",
            }}
          >
            Monthly Leave Trend
          </h2>
          <div style={{ height: "230px", width: "100%" }}>
            <LeaveTrendBarChart />
          </div>
        </div>

        {/* Right: Leave Distribution by Type */}
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
          <h2
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#1F2937",
              marginBottom: "16px",
              margin: "0 0 16px 0",
            }}
          >
            Leave Distribution by Type
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
              flex: 1,
            }}
          >
            <div style={{ flexShrink: 0 }}>
              <DonutChart
                data={distributionData}
                centerValue="452"
                centerLabel="Total Leaves"
                size={170}
                strokeWidth={22}
                legendLayout="none"
              />
            </div>

            {/* Right-side Legend */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {distributionData.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "12px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: item.color,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ color: "#4B5563", minWidth: "55px" }}>{item.label}</span>
                  <span style={{ fontWeight: 600, color: "#1F2937" }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Leave Requests Table */}
      <div
        style={{
          backgroundColor: "#FEFEFE",
          border: "1px solid #E2E8F0",
          borderRadius: "12px",
          padding: "20px 24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h2
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#1F2937",
              margin: 0,
            }}
          >
            Recent Leave Requests
          </h2>

          {/* Search box */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              padding: "6px 12px",
              width: "220px",
              backgroundColor: "#FEFEFE",
            }}
          >
            <Icon name="search" size={14} color="#9CA3AF" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search employee..."
              style={{
                border: "none",
                outline: "none",
                fontSize: "12px",
                width: "100%",
                color: "#1F2937",
                backgroundColor: "transparent",
                fontFamily: "inherit",
              }}
            />
          </div>
        </div>

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
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px" }}>EMPLOYEE</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px" }}>DEPARTMENT</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px" }}>LEAVE TYPE</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px" }}>DURATION</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px" }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr
                  key={req.empId}
                  style={{
                    borderBottom: "1px solid #E2E8F0",
                    transition: "background-color 0.15s ease",
                  }}
                  className="table-row-hover"
                >
                  <td style={{ padding: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          backgroundColor: req.initialsBg,
                          color: req.initialsColor,
                          fontSize: "12px",
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {req.initials}
                      </div>
                      <div>
                        <div style={{ color: "#1F2937", fontWeight: 600, fontSize: "13px" }}>
                          {req.name}
                        </div>
                        <div style={{ color: "#95A1B6", fontSize: "11px" }}>
                          {req.empId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "14px", color: "#4B5563" }}>{req.department}</td>
                  <td style={{ padding: "14px", color: "#4B5563" }}>{req.leaveType}</td>
                  <td style={{ padding: "14px", color: "#4B5563" }}>{req.duration}</td>
                  <td style={{ padding: "14px" }}>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "999px",
                        fontSize: "11px",
                        fontWeight: 600,
                        backgroundColor: req.statusBg,
                        color: req.statusColor,
                        border: "1px solid #E2E8F0",
                      }}
                    >
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
            Showing 1 to {filteredRequests.length} of 1,248 entries
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
    </div>
  );
}
