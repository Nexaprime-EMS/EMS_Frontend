"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DashboardAnalytics from "../Pages/DashboardAnalytics";
import EmployeeReports from "../Pages/EmployeeReports";
import AttendanceReports from "../Pages/AttendanceReports";
import LeaveReports from "../Pages/LeaveReports";
import ProjectReports from "../Pages/ProjectReports";
import TaskReports from "../Pages/TaskReports";
import ProductivityReports from "../Pages/ProductivityReports";
import DepartmentReports from "../Pages/DepartmentReports";
import TeamReports from "../Pages/TeamReports";
import CustomReports from "../Pages/CustomReports";
import ScheduledReports from "../Pages/ScheduledReports";
import ExportCenter from "../Pages/ExportCenter";

const PAGE_CONFIG = {
  "Rep-01": { width: 1440, height: 1392, sidebarWidth: 260 },
  "Rep-02": { width: 1440, height: 1024, sidebarWidth: 260 },
  "Rep-03": { width: 1440, height: 1091, sidebarWidth: 260 },
  "Rep-04": { width: 1440, height: 1322, sidebarWidth: 260 },
  "Rep-05": { width: 1440, height: 1300, sidebarWidth: 260 },
  "Rep-06": { width: 1440, height: 1300, sidebarWidth: 260 },
  "Rep-07": { width: 1440, height: 1300, sidebarWidth: 260 },
  "Rep-08": { width: 1400, height: 1300, sidebarWidth: 260 },
  "Rep-09": { width: 1400, height: 1300, sidebarWidth: 260 },
  "Rep-10": { width: 1400, height: 1300, sidebarWidth: 260 },
  "Rep-11": { width: 1440, height: 960,  sidebarWidth: 260 },
  "Rep-12": { width: 1440, height: 960,  sidebarWidth: 260 },
};

export default function ReportLayout({ initialPage = "Rep-01" }) {
  const [activePage, setActivePage] = useState(initialPage);

  const currentConfig = PAGE_CONFIG[activePage] || PAGE_CONFIG["Rep-01"];
  const mainWidth = currentConfig.width - currentConfig.sidebarWidth;

  const getPageTitle = () => {
    switch (activePage) {
      case "Rep-01":
        return "Dashboard Analytics";
      case "Rep-02":
        return "Employee Reports";
      case "Rep-03":
        return "Attendance Reports";
      case "Rep-04":
        return "Leave Reports";
      case "Rep-05":
        return "Project Reports";
      case "Rep-06":
        return "Task Reports";
      case "Rep-07":
        return "Productivity Reports";
      case "Rep-08":
        return "Department Reports";
      case "Rep-09":
        return "Team Reports";
      case "Rep-10":
        return "Custom Reports";
      case "Rep-11":
        return "Scheduled Reports";
      case "Rep-12":
        return "Export Center";
      default:
        return "Dashboard Analytics";
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#F2F6F8",
        display: "flex",
        justifyContent: "center",
        overflowX: "auto",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* Canvas with exact page dimensions */}
      <div
        className="app-canvas"
        style={{
          width: `${currentConfig.width}px`,
          minWidth: `${currentConfig.width}px`,
          maxWidth: `${currentConfig.width}px`,
          height: `${currentConfig.height}px`,
          minHeight: `${currentConfig.height}px`,
          backgroundColor: "#F2F6F8",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Exact Sidebar */}
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          height={currentConfig.height}
        />

        {/* Main Content Area */}
        <main
          className="app-main"
          style={{
            width: `${mainWidth}px`,
            minWidth: `${mainWidth}px`,
            maxWidth: `${mainWidth}px`,
            height: `${currentConfig.height}px`,
            minHeight: `${currentConfig.height}px`,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#F2F6F8",
            overflowY: "auto",
            boxSizing: "border-box",
          }}
        >
          {/* Top Header Bar */}
          <Header activePageName={getPageTitle()} />

          {/* Content for the Selected Page */}
          <div style={{ flex: 1, backgroundColor: "#F2F6F8" }}>
            {activePage === "Rep-01" && <DashboardAnalytics navigateTo={setActivePage} />}
            {activePage === "Rep-02" && <EmployeeReports navigateTo={setActivePage} />}
            {activePage === "Rep-03" && <AttendanceReports navigateTo={setActivePage} />}
            {activePage === "Rep-04" && <LeaveReports navigateTo={setActivePage} />}
            {activePage === "Rep-05" && <ProjectReports navigateTo={setActivePage} />}
            {activePage === "Rep-06" && <TaskReports navigateTo={setActivePage} />}
            {activePage === "Rep-07" && <ProductivityReports navigateTo={setActivePage} />}
            {activePage === "Rep-08" && <DepartmentReports navigateTo={setActivePage} />}
            {activePage === "Rep-09" && <TeamReports navigateTo={setActivePage} />}
            {activePage === "Rep-10" && <CustomReports navigateTo={setActivePage} />}
            {activePage === "Rep-11" && <ScheduledReports navigateTo={setActivePage} />}
            {activePage === "Rep-12" && <ExportCenter navigateTo={setActivePage} />}
          </div>
        </main>
      </div>
    </div>
  );
}
