"use client";

import React, { useState } from "react";
import { Icon } from "../UI/Icons";
import MetricCard from "../UI/MetricCard";

const EMPLOYEES = [
  {
    id: "EMP-1001",
    name: "Jane Cooper",
    department: "Human Resources",
    jobTitle: "HR Manager",
    status: "Active",
    joinDate: "01 Jan 2020",
  },
  {
    id: "EMP-1002",
    name: "Robert Fox",
    department: "Development",
    jobTitle: "Sr. Developer",
    status: "Active",
    joinDate: "15 Mar 2019",
  },
  {
    id: "EMP-1003",
    name: "Leslie Alexander",
    department: "Design",
    jobTitle: "UI/UX Designer",
    status: "Active",
    joinDate: "10 Apr 2021",
  },
  {
    id: "EMP-1004",
    name: "Cody Fisher",
    department: "Marketing",
    jobTitle: "Marketing Specialist",
    status: "Active",
    joinDate: "05 Feb 2020",
  },
  {
    id: "EMP-1005",
    name: "Eleanor Pena",
    department: "Finance",
    jobTitle: "Finance Analyst",
    status: "Inactive",
    joinDate: "12 Dec 2018",
  },
];

export default function EmployeeReports({ navigateTo }) {
  const [department, setDepartment] = useState("All Departments");
  const [employmentType, setEmploymentType] = useState("All Types");
  const [status, setStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredEmployees = EMPLOYEES.filter((emp) => {
    if (department !== "All Departments" && emp.department !== department) return false;
    if (status !== "All Status" && emp.status !== status) return false;
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
              Employee Reports
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "#6A7589",
                margin: "4px 0 0 0",
              }}
            >
              View and analyze employee related data
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast("Exporting Employee Reports...")}
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

      {/* Filter Row Card */}
      <div
        style={{
          backgroundColor: "#FEFEFE",
          border: "1px solid #E2E8F0",
          borderRadius: "12px",
          padding: "16px 20px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr auto",
          gap: "16px",
          alignItems: "flex-end",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        }}
      >
        {/* Department dropdown */}
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
              <Icon name="chevron-down" size={14} color="#6A7589" />
            </div>
          </div>
        </div>

        {/* Employment Type dropdown */}
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
            Employment Type
          </label>
          <div style={{ position: "relative" }}>
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
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
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Contract</option>
              <option>Intern</option>
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
              <Icon name="chevron-down" size={14} color="#6A7589" />
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
              color: "#495668",
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
              <option>Active</option>
              <option>Inactive</option>
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
              <Icon name="chevron-down" size={14} color="#6A7589" />
            </div>
          </div>
        </div>

        {/* Generate Report Button */}
        <div>
          <button
            onClick={() => showToast("Employee report generated!")}
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

      {/* 4 Metric KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}
      >
        <MetricCard title="Total Employees" value="1,248" />
        <MetricCard title="Active Employees" value="1,102" />
        <MetricCard title="New Hires" value="146" />
        <MetricCard title="Exits" value="38" />
      </div>

      {/* Employee Summary Table Card */}
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
          Employee Summary
        </h2>

        {/* Table */}
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
                <th
                  style={{
                    padding: "12px 14px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#6A7589",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  EMPLOYEE ID
                </th>
                <th
                  style={{
                    padding: "12px 14px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#6A7589",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  EMPLOYEE NAME
                </th>
                <th
                  style={{
                    padding: "12px 14px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#6A7589",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  DEPARTMENT
                </th>
                <th
                  style={{
                    padding: "12px 14px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#6A7589",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  JOB TITLE
                </th>
                <th
                  style={{
                    padding: "12px 14px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#6A7589",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  STATUS
                </th>
                <th
                  style={{
                    padding: "12px 14px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#6A7589",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  JOIN DATE
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  style={{
                    borderBottom: "1px solid #E2E8F0",
                    transition: "background-color 0.15s ease",
                  }}
                  className="table-row-hover"
                >
                  <td style={{ padding: "14px", color: "#4B5563", fontSize: "12px" }}>
                    {emp.id}
                  </td>
                  <td style={{ padding: "14px", color: "#1F2937", fontWeight: 600 }}>
                    {emp.name}
                  </td>
                  <td style={{ padding: "14px", color: "#495668" }}>{emp.department}</td>
                  <td style={{ padding: "14px", color: "#4B5563" }}>{emp.jobTitle}</td>
                  <td style={{ padding: "14px" }}>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "999px",
                        fontSize: "11px",
                        fontWeight: 600,
                        backgroundColor: emp.status === "Active" ? "#D5FAE4" : "#F2F6F8",
                        color: emp.status === "Active" ? "#06966B" : "#4B5563",
                        border: emp.status === "Active" ? "1px solid #06966B22" : "1px solid #E2E8F0",
                      }}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td style={{ padding: "14px", color: "#6A7589" }}>{emp.joinDate}</td>
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
          <span style={{ fontSize: "12px", color: "#6A7589" }}>
            Showing 1 to {filteredEmployees.length} of 1,248 entries
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
                  border: num === currentPage ? "1px solid #2563EA" : "1px solid #E2E8F0",
                  borderRadius: "6px",
                  backgroundColor: num === currentPage ? "#2563EA" : "#FEFEFE",
                  color: num === currentPage ? "#FEFEFE" : "#4B5563",
                  fontSize: "12px",
                  fontWeight: num === currentPage ? 600 : 400,
                  cursor: "pointer",
                }}
              >
                {num}
              </button>
            ))}
            <span style={{ padding: "0 4px", color: "#6A7589", fontSize: "12px" }}>...</span>
            <button
              onClick={() => setCurrentPage(250)}
              style={{
                height: "28px",
                padding: "0 8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #E2E8F0",
                borderRadius: "6px",
                backgroundColor: "#FEFEFE",
                color: "#4B5563",
                fontSize: "12px",
                cursor: "pointer",
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
