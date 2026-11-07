"use client";

import React, { useState } from "react";
import { Icon } from "../UI/Icons";
import MetricCard from "../UI/MetricCard";
import AttendanceStackedBarChart from "../Charts/AttendanceStackedBarChart";
import DonutChart from "../Charts/DonutChart";

export default function DashboardAnalytics({ navigateTo }) {
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const leaveSummaryData = [
    { label: "Casual", value: 40, color: "#3B82F6" },
    { label: "Sick", value: 30, color: "#06966B" },
    { label: "Privilege", value: 20, color: "#6A7589" },
    { label: "Unpaid", value: 10, color: "#F97318" },
  ];

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
      {/* Toast Notification */}
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
            animation: "fadeIn 0.2s ease",
          }}
        >
          <Icon name="check-circle" size={16} color="#06966B" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Title & Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#1F2937",
              letterSpacing: "-0.3px",
              margin: 0,
            }}
          >
            Dashboard Analytics
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "#6A7589",
              marginTop: "4px",
              margin: "4px 0 0 0",
            }}
          >
            Overview of key metrics and insights
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Date Range Picker */}
          <button
            onClick={() => showToast("Date filter applied: 01 Jan 2024 - 31 Dec 2024")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#FEFEFE",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              padding: "8px 14px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#4B5563",
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
            }}
            className="button-hover"
          >
            <Icon name="calendar" size={15} color="#6A7589" />
            <span>01 Jan 2024 - 31 Dec 2024</span>
          </button>

          {/* Export Button */}
          <button
            onClick={() => showToast("Exporting Dashboard Analytics report (PDF / XLSX)...")}
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
              boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
            }}
            className="button-hover"
          >
            <Icon name="export" size={15} color="#6A7589" />
            <span>Export</span>
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
          title="TOTAL EMPLOYEES"
          value="1,248"
          trend={{ value: "+12.5%", isPositive: true, comparison: "vs last year" }}
        />
        <MetricCard
          title="ATTENDANCE RATE"
          value="96.1%"
          trend={{ value: "+2.4%", isPositive: true, comparison: "vs last year" }}
        />
        <MetricCard
          title="LEAVE TAKEN"
          value="7.2"
          unit="days"
          trend={{ value: "+1.1%", isPositive: false, comparison: "vs last year" }}
        />
        <MetricCard
          title="PROJECTS COMPLETED"
          value="89%"
          trend={{ value: "+1.1%", isPositive: true, comparison: "vs last year" }}
        />
      </div>

      {/* Middle Charts: Attendance Overview & Leave Summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.8fr 1.2fr",
          gap: "16px",
        }}
      >
        {/* Attendance Overview Card */}
        <div
          style={{
            backgroundColor: "#FEFEFE",
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
            padding: "20px 22px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
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
              Attendance Overview
            </h2>

            {/* Legend */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#3B82F6" }} />
                <span style={{ color: "#6A7589" }}>Present</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#F97318" }} />
                <span style={{ color: "#6A7589" }}>Absent</span>
              </div>
            </div>
          </div>

          <div style={{ height: "240px", width: "100%" }}>
            <AttendanceStackedBarChart />
          </div>
        </div>

        {/* Leave Summary Card */}
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
              margin: 0,
            }}
          >
            Leave Summary
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              paddingTop: "6px",
            }}
          >
            <DonutChart
              data={leaveSummaryData}
              size={175}
              strokeWidth={22}
              legendLayout="bottom-grid"
            />
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div>
        <div style={{ marginBottom: "12px" }}>
          <h2
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#1F2937",
              margin: 0,
            }}
          >
            Quick Actions
          </h2>
          <p
            style={{
              fontSize: "12px",
              color: "#6A7589",
              marginTop: "2px",
              margin: "2px 0 0 0",
            }}
          >
            Fast paths for reporting workflows
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
        >
          {/* Card 1: Create a Custom Report */}
          <div
            style={{
              backgroundColor: "#FEFEFE",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              padding: "18px 20px",
              display: "flex",
              gap: "16px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#F2F6F8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon name="plus-circle" size={18} color="#2563EA" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937" }}>
                Create a Custom Report
              </div>
              <div style={{ fontSize: "12px", color: "#4B5563", lineHeight: 1.4 }}>
                Choose metrics, charts and grouping (employee, team, project) and save templates for reuse.
              </div>
              <button
                onClick={() => navigateTo && navigateTo("Rep-10")}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#2563EA",
                  cursor: "pointer",
                  textAlign: "left",
                  marginTop: "4px",
                }}
              >
                Custom Reports &rarr;
              </button>
            </div>
          </div>

          {/* Card 2: Schedule Email Delivery */}
          <div
            style={{
              backgroundColor: "#FEFEFE",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              padding: "18px 20px",
              display: "flex",
              gap: "16px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#F2F6F8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon name="clock" size={18} color="#2563EA" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937" }}>
                Schedule Email Delivery
              </div>
              <div style={{ fontSize: "12px", color: "#4B5563", lineHeight: 1.4 }}>
                Set frequency (daily, weekly, monthly), recipients and export format to keep stakeholders updated.
              </div>
              <button
                onClick={() => navigateTo && navigateTo("Rep-11")}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#2563EA",
                  cursor: "pointer",
                  textAlign: "left",
                  marginTop: "4px",
                }}
              >
                Scheduled Reports &rarr;
              </button>
            </div>
          </div>

          {/* Card 3: Export Center */}
          <div
            style={{
              backgroundColor: "#FEFEFE",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              padding: "18px 20px",
              display: "flex",
              gap: "16px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#F2F6F8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon name="export" size={18} color="#06966B" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937" }}>
                Export Center
              </div>
              <div style={{ fontSize: "12px", color: "#4B5563", lineHeight: 1.4 }}>
                Export current views as PDF or Excel and manage previously generated report files.
              </div>
              <button
                onClick={() => navigateTo && navigateTo("Rep-12")}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#2563EA",
                  cursor: "pointer",
                  textAlign: "left",
                  marginTop: "4px",
                }}
              >
                Export Center &rarr;
              </button>
            </div>
          </div>

          {/* Card 4: Drill-down Reports */}
          <div
            style={{
              backgroundColor: "#FEFEFE",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              padding: "18px 20px",
              display: "flex",
              gap: "16px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#F2F6F8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon name="grid" size={18} color="#F97318" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937" }}>
                Drill-down Reports
              </div>
              <div style={{ fontSize: "12px", color: "#4B5563", lineHeight: 1.4 }}>
                Jump to Employee, Attendance, Leave, Project, Task, Productivity, Department and Team reports.
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px", fontSize: "12px" }}>
                <button
                  onClick={() => navigateTo && navigateTo("Rep-02")}
                  style={{ background: "none", border: "none", padding: 0, color: "#2563EA", fontWeight: 600, cursor: "pointer" }}
                >
                  Employee
                </button>
                <span style={{ color: "#9CA3AF" }}>&middot;</span>
                <button
                  onClick={() => navigateTo && navigateTo("Rep-03")}
                  style={{ background: "none", border: "none", padding: 0, color: "#2563EA", fontWeight: 600, cursor: "pointer" }}
                >
                  Attendance
                </button>
                <span style={{ color: "#9CA3AF" }}>&middot;</span>
                <button
                  onClick={() => navigateTo && navigateTo("Rep-04")}
                  style={{ background: "none", border: "none", padding: 0, color: "#2563EA", fontWeight: 600, cursor: "pointer" }}
                >
                  Leave &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Activities & Reports Summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}
      >
        {/* Recent Activities */}
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
            Recent Activities
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "14px" }}>
            {/* Item 1 */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "#F2F6F8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name="check-circle" size={15} color="#2563EA" />
                </div>
                <span style={{ fontSize: "13px", color: "#1F2937", fontWeight: 500 }}>
                  Project Alpha completed
                </span>
              </div>
              <span style={{ fontSize: "12px", color: "#9CA3AF" }}>2h ago</span>
            </div>

            {/* Item 2 */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "#F2F6F8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name="user-plus" size={15} color="#06966B" />
                </div>
                <span style={{ fontSize: "13px", color: "#1F2937", fontWeight: 500 }}>
                  New employee John Doe joined
                </span>
              </div>
              <span style={{ fontSize: "12px", color: "#9CA3AF" }}>5h ago</span>
            </div>

            {/* Item 3 */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "#F2F6F8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name="calendar" size={15} color="#6A7589" />
                </div>
                <span style={{ fontSize: "13px", color: "#1F2937", fontWeight: 500 }}>
                  12 leave requests approved
                </span>
              </div>
              <span style={{ fontSize: "12px", color: "#9CA3AF" }}>1d ago</span>
            </div>

            {/* Item 4 */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "#F2F6F8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name="file-text" size={15} color="#F97318" />
                </div>
                <span style={{ fontSize: "13px", color: "#1F2937", fontWeight: 500 }}>
                  Monthly report generated
                </span>
              </div>
              <span style={{ fontSize: "12px", color: "#9CA3AF" }}>2d ago</span>
            </div>
          </div>
        </div>

        {/* Reports Summary */}
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
            Reports Summary
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "14px" }}>
            {/* Item 1 */}
            <div
              onClick={() => navigateTo && navigateTo("Rep-02")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                padding: "2px 4px",
                borderRadius: "6px",
              }}
              className="list-item-hover"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Icon name="employees" size={17} color="#6A7589" />
                <span style={{ fontSize: "13px", color: "#4B5563", fontWeight: 500 }}>
                  Employee Reports
                </span>
              </div>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#1F2937",
                }}
              >
                12
              </span>
            </div>

            {/* Item 2 */}
            <div
              onClick={() => navigateTo && navigateTo("Rep-03")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                padding: "2px 4px",
                borderRadius: "6px",
              }}
              className="list-item-hover"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Icon name="calendar" size={17} color="#6A7589" />
                <span style={{ fontSize: "13px", color: "#4B5563", fontWeight: 500 }}>
                  Attendance Reports
                </span>
              </div>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#1F2937",
                }}
              >
                34
              </span>
            </div>

            {/* Item 3 */}
            <div
              onClick={() => navigateTo && navigateTo("Rep-04")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                padding: "2px 4px",
                borderRadius: "6px",
              }}
              className="list-item-hover"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Icon name="plane" size={17} color="#6A7589" />
                <span style={{ fontSize: "13px", color: "#4B5563", fontWeight: 500 }}>
                  Leave Reports
                </span>
              </div>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#1F2937",
                }}
              >
                14
              </span>
            </div>

            {/* Item 4 */}
            <div
              onClick={() => navigateTo && navigateTo("Rep-05")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                padding: "2px 4px",
                borderRadius: "6px",
              }}
              className="list-item-hover"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Icon name="reports" size={17} color="#6A7589" />
                <span style={{ fontSize: "13px", color: "#4B5563", fontWeight: 500 }}>
                  Project Reports
                </span>
              </div>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#1F2937",
                }}
              >
                8
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
