"use client";

import React, { useState } from "react";
import { Icon } from "../UI/Icons";
import MetricCard from "../UI/MetricCard";
import AttendanceLineChart from "../Charts/AttendanceLineChart";
import MonthlyLeaveTrendChart from "../Charts/MonthlyLeaveTrendChart";

const DEPT_ATTENDANCE = [
  {
    department: "Development",
    employees: 450,
    attendanceRate: "97.2%",
    presentDays: "8,765",
    absentDays: 210,
    lateArrivals: 78,
  },
  {
    department: "Design",
    employees: 180,
    attendanceRate: "96.8%",
    presentDays: "3,123",
    absentDays: 136,
    lateArrivals: 42,
  },
  {
    department: "Marketing",
    employees: 120,
    attendanceRate: "96.5%",
    presentDays: "2,345",
    absentDays: 86,
    lateArrivals: 31,
  },
  {
    department: "Human Resources",
    employees: 90,
    attendanceRate: "97.8%",
    presentDays: "1,856",
    absentDays: 42,
    lateArrivals: 19,
  },
];

export default function AttendanceReports({ navigateTo }) {
  const [department, setDepartment] = useState("All Departments");
  const [status, setStatus] = useState("All Status");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredDepts = DEPT_ATTENDANCE.filter((d) => {
    if (department !== "All Departments" && d.department !== department) return false;
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
          <Icon name="check-circle" size={16} color="#70A3F8" />
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
              Attendance Reports
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "#95A1B6",
                margin: "4px 0 0 0",
              }}
            >
              Analyze attendance and trends
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast("Exporting Attendance Reports...")}
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
          gridTemplateColumns: "1.2fr 1fr 1fr auto",
          gap: "16px",
          alignItems: "flex-end",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        }}
      >
        {/* Date Range Picker */}
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
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              padding: "9px 12px",
              backgroundColor: "#FEFEFE",
              fontSize: "13px",
              color: "#1F2937",
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
              <option>Development</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Human Resources</option>
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

        {/* Status dropdown */}
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
            Status
          </label>
          <div style={{ position: "relative" }}>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
              <option>Present</option>
              <option>Late</option>
              <option>On Leave</option>
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
            onClick={() => showToast("Attendance report updated!")}
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
              transition: "background-color 0.15s ease",
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
        <MetricCard
          title="Attendance Rate"
          value="96.1%"
          trend={{ value: "2.4%", isPositive: true, comparison: "vs last year" }}
        />
        <MetricCard title="Present Days" value="23,456" />
        <MetricCard title="Pending Days" value="156" />
        <MetricCard title="Late Arrivals" value="70" />
      </div>

      {/* Charts Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}
      >
        {/* Monthly Attendance Trend */}
        <div
          style={{
            backgroundColor: "#FEFEFE",
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
            padding: "20px 22px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
          }}
        >
          <h2
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#1F2937",
              marginBottom: "16px",
              margin: 0,
            }}
          >
            Monthly Attendance Trend
          </h2>
          <div style={{ height: "230px", width: "100%" }}>
            <AttendanceLineChart />
          </div>
        </div>

        {/* Monthly Leave Trend */}
        <div
          style={{
            backgroundColor: "#FEFEFE",
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
            padding: "20px 22px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
          }}
        >
          <h2
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#1F2937",
              marginBottom: "16px",
              margin: 0,
            }}
          >
            Monthly Leave Trend
          </h2>
          <div style={{ height: "230px", width: "100%" }}>
            <MonthlyLeaveTrendChart />
          </div>
        </div>
      </div>

      {/* Department Attendance Summary Table */}
      <div
        style={{
          backgroundColor: "#FEFEFE",
          border: "1px solid #E2E8F0",
          borderRadius: "12px",
          padding: "20px 24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
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
          Department Attendance Summary
        </h2>

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
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px" }}>DEPARTMENT</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px" }}>EMPLOYEES</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px" }}>ATTENDANCE RATE</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px" }}>PRESENT DAYS</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px" }}>ABSENT DAYS</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#95A1B6", textTransform: "uppercase", letterSpacing: "0.5px" }}>LATE ARRIVALS</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepts.map((d) => (
                <tr
                  key={d.department}
                  style={{ borderBottom: "1px solid #E2E8F0" }}
                  className="table-row-hover"
                >
                  <td style={{ padding: "14px", color: "#1F2937", fontWeight: 500 }}>{d.department}</td>
                  <td style={{ padding: "14px", color: "#4B5563" }}>{d.employees}</td>
                  <td style={{ padding: "14px", color: "#2563EA", fontWeight: 600 }}>{d.attendanceRate}</td>
                  <td style={{ padding: "14px", color: "#4B5563" }}>{d.presentDays}</td>
                  <td style={{ padding: "14px", color: "#4B5563" }}>{d.absentDays}</td>
                  <td style={{ padding: "14px", color: "#4B5563" }}>{d.lateArrivals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
