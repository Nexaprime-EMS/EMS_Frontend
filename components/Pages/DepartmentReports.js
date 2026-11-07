"use client";

import React, { useState } from "react";
import { Icon } from "../UI/Icons";
import MetricCard from "../UI/MetricCard";
import DonutChart from "../Charts/DonutChart";
import DepartmentPerformanceBarChart from "../Charts/DepartmentPerformanceBarChart";

const DEPT_SUMMARY = [
  {
    department: "Development",
    employees: 450,
    activeEmployees: 412,
    avgAttendance: "97.2%",
    productivityScore: "95%",
  },
  {
    department: "Design",
    employees: 220,
    activeEmployees: 198,
    avgAttendance: "95.6%",
    productivityScore: "90%",
  },
  {
    department: "Marketing",
    employees: 200,
    activeEmployees: 176,
    avgAttendance: "96.5%",
    productivityScore: "88%",
  },
  {
    department: "Human Resources",
    employees: 150,
    activeEmployees: 142,
    avgAttendance: "97.8%",
    productivityScore: "93%",
  },
  {
    department: "Finance",
    employees: 120,
    activeEmployees: 102,
    avgAttendance: "96.1%",
    productivityScore: "91%",
  },
  {
    department: "Others",
    employees: 108,
    activeEmployees: 96,
    avgAttendance: "94.2%",
    productivityScore: "87%",
  },
];

export default function DepartmentReports({ navigateTo }) {
  const [department, setDepartment] = useState("All Departments");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const deptDistributionData = [
    { label: "Development", value: 30, color: "#2563EA" },
    { label: "Design", value: 18, color: "#12B982" },
    { label: "Marketing", value: 15, color: "#3B82F6" },
    { label: "HR", value: 12, color: "#4B5563" },
    { label: "Finance", value: 10, color: "#CDD6E1" },
    { label: "Others", value: 15, color: "#9CA3AF" },
  ];

  const filteredDepts = DEPT_SUMMARY.filter((d) => {
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
              Department Reports
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "#4B5563",
                margin: "4px 0 0 0",
              }}
            >
              Department-wise overview and performance
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast("Exporting Department Reports...")}
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
          <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#4B5563", marginBottom: "6px" }}>
            Date Range
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 12px",
              borderRadius: "8px",
              border: "1px solid #CDD6E1",
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
          <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#4B5563", marginBottom: "6px" }}>
            Departments
          </label>
          <div style={{ position: "relative" }}>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 32px 9px 12px",
                borderRadius: "8px",
                border: "1px solid #CDD6E1",
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
              <option>Finance</option>
            </select>
            <div style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <Icon name="chevron-down" size={14} color="#9CA3AF" />
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={() => showToast("Department report generated!")}
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
        <MetricCard title="Total Departments" value="8" />
        <MetricCard title="Total Employees" value="1,248" />
        <MetricCard title="Active Employees" value="1,102" />
        <MetricCard title="Avg. Attendance" value="96.1%" />
      </div>

      {/* 2 Middle Cards: Employees by Department & Performance by Department */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1.6fr",
          gap: "16px",
        }}
      >
        {/* Left: Employees by Department Donut */}
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
            Employees by Department
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
            <DonutChart
              data={deptDistributionData}
              size={170}
              strokeWidth={22}
              legendLayout="right-list"
            />
          </div>
        </div>

        {/* Right: Performance by Department Bar Chart */}
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
            Performance by Department
          </h2>
          <div style={{ height: "230px", width: "100%" }}>
            <DepartmentPerformanceBarChart />
          </div>
        </div>
      </div>

      {/* Department Summary Table */}
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
          Department Summary
        </h2>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #CDD6E1" }}>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.5px" }}>DEPARTMENT</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.5px" }}>EMPLOYEES</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.5px" }}>ACTIVE EMPLOYEES</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.5px" }}>AVG. ATTENDANCE</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.5px" }}>PRODUCTIVITY SCORE</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepts.map((d) => (
                <tr key={d.department} style={{ borderBottom: "1px solid #E2E8F0" }} className="table-row-hover">
                  <td style={{ padding: "14px", color: "#1F2937", fontWeight: 600 }}>{d.department}</td>
                  <td style={{ padding: "14px", color: "#4B5563" }}>{d.employees}</td>
                  <td style={{ padding: "14px", color: "#4B5563" }}>{d.activeEmployees}</td>
                  <td style={{ padding: "14px", color: "#3B82F6", fontWeight: 500 }}>{d.avgAttendance}</td>
                  <td style={{ padding: "14px", color: "#12B982", fontWeight: 600 }}>{d.productivityScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
