"use client";

import React, { useState } from "react";
import { Icon } from "../UI/Icons";
import MetricCard from "../UI/MetricCard";
import ProductivityTrendChart from "../Charts/ProductivityTrendChart";

const DEPT_PRODUCTIVITY = [
  {
    department: "Development",
    score: "95%",
    tasksCompleted: "512",
    efficiencyRate: "91%",
  },
  {
    department: "Design",
    score: "90%",
    tasksCompleted: "248",
    efficiencyRate: "87%",
  },
  {
    department: "Marketing",
    score: "88%",
    tasksCompleted: "192",
    efficiencyRate: "85%",
  },
  {
    department: "Human Resources",
    score: "93%",
    tasksCompleted: "172",
    efficiencyRate: "89%",
  },
];

export default function ProductivityReports({ navigateTo }) {
  const [department, setDepartment] = useState("All Departments");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredDepts = DEPT_PRODUCTIVITY.filter((d) => {
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
          <Icon name="check-circle" size={16} color="#3B82F6" />
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
              Productivity Reports
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "#4B5563",
                margin: "4px 0 0 0",
              }}
            >
              Analyse productivity and performance
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast("Exporting Productivity Reports...")}
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
            <Icon name="calendar" size={15} color="#9CA3AF" />
            <span>01 Jan 2024 - 31 Dec 2024</span>
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#495668", marginBottom: "6px" }}>
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
            <div style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <Icon name="chevron-down" size={14} color="#9CA3AF" />
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={() => showToast("Productivity report updated!")}
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
        <MetricCard
          title="Productivity Score"
          value="92%"
          trend={{ value: "4.5% vs last year", isPositive: true }}
        />
        <MetricCard title="Tasks Completed" value="1,124" />
        <MetricCard title="Avg. Completion Time" value="2.4" unit="days" />
        <MetricCard title="Efficiency Rate" value="88%" />
      </div>

      {/* Productivity Trend Chart */}
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
          Productivity Trend
        </h2>
        <div style={{ height: "260px", width: "100%" }}>
          <ProductivityTrendChart />
        </div>
      </div>

      {/* Department Productivity Table */}
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
          Department Productivity
        </h2>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.5px" }}>DEPARTMENT</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.5px" }}>PRODUCTIVITY SCORE</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.5px" }}>TASKS COMPLETED</th>
                <th style={{ padding: "12px 14px", fontSize: "11px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.5px" }}>EFFICIENCY RATE</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepts.map((d) => (
                <tr key={d.department} style={{ borderBottom: "1px solid #E2E8F0" }} className="table-row-hover">
                  <td style={{ padding: "14px", color: "#1F2937", fontWeight: 500 }}>{d.department}</td>
                  <td style={{ padding: "14px", color: "#2563EA", fontWeight: 600 }}>{d.score}</td>
                  <td style={{ padding: "14px", color: "#4B5563" }}>{d.tasksCompleted}</td>
                  <td style={{ padding: "14px", color: "#495668" }}>{d.efficiencyRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
