"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "../UI/Icons";

const MENU_ITEMS = [
  { name: "Dashboard", icon: "dashboard", href: "/dashboard" },
  { name: "Organization", icon: "organization", href: "#" },
  { name: "Employees", icon: "employees", href: "#" },
  { name: "Departments", icon: "departments", href: "#" },
  { name: "Attendance", icon: "attendance", href: "#" },
  { name: "Leave", icon: "leave", href: "#" },
  { name: "Time Tracking", icon: "time-tracking", href: "#" },
  { name: "Projects", icon: "projects", href: "#" },
  { name: "Tasks", icon: "tasks", href: "#" },
  {
    name: "Reports",
    icon: "reports",
    href: "/dashboard-analytics",
    subItems: [
      { name: "Dashboard Analytics", code: "Rep-01", href: "/dashboard-analytics" },
      { name: "Employee Reports", code: "Rep-02", href: "/employee-reports" },
      { name: "Attendance Reports", code: "Rep-03", href: "/attendance-reports" },
      { name: "Leave Reports", code: "Rep-04", href: "/leave-reports" },
      { name: "Project Reports", code: "Rep-05", href: "/project-reports" },
      { name: "Task Reports", code: "Rep-06", href: "/task-reports" },
      { name: "Productivity Reports", code: "Rep-07", href: "/productivity-reports" },
      { name: "Department Reports", code: "Rep-08", href: "/department-reports" },
      { name: "Team Reports", code: "Rep-09", href: "/team-reports" },
      { name: "Custom Reports", code: "Rep-10", href: "/custom-reports" },
      { name: "Scheduled Reports", code: "Rep-11", href: "/scheduled-reports" },
      { name: "Export Center", code: "Rep-12", href: "/export-center" },
    ],
  },
  { name: "Users", icon: "users", href: "#" },
  { name: "Role Management", icon: "role-management", href: "#" },
  { name: "Notifications", icon: "notifications", href: "#" },
  { name: "Audit Logs", icon: "audit-logs", href: "#" },
  { name: "Subscription", icon: "subscription", href: "#" },
  { name: "Settings", icon: "settings", href: "#" },
];

export default function Sidebar({ activePage, setActivePage, height = 1392 }) {
  const pathname = usePathname();
  const [reportsExpanded, setReportsExpanded] = useState(true);

  const isReportsActive =
    activePage ||
    pathname === "/dashboard" ||
    pathname?.includes("reports") ||
    pathname?.includes("dashboard") ||
    pathname?.includes("export-center");

  const handleNavClick = (code, e) => {
    if (setActivePage && code) {
      e.preventDefault();
      setActivePage(code);
    }
  };

  return (
    <aside
      style={{
        width: "260px",
        minWidth: "260px",
        maxWidth: "260px",
        height: `${height}px`,
        minHeight: `${height}px`,
        backgroundColor: "#FEFEFE",
        borderRight: "1px solid #E2E8F0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "24px 16px 20px 16px",
        flexShrink: 0,
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Top Brand Logo & Navigation */}
      <div style={{ display: "flex", flexDirection: "column", minHeight: 0, flex: 1, overflowY: "auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0 10px 18px 10px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              backgroundColor: "#2563EA",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FEFEFE",
              fontWeight: 800,
              fontSize: "20px",
              boxShadow: "0 2px 6px rgba(37, 99, 234, 0.3)",
            }}
          >
            H
          </div>
          <span
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: "#1F2937",
              letterSpacing: "-0.5px",
            }}
          >
            EMS
          </span>
        </div>

        {/* Navigation list */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {MENU_ITEMS.map((item) => {
            const isReports = item.name === "Reports";
            const isActive = isReports && isReportsActive;

            return (
              <div key={item.name}>
                <div
                  onClick={() => {
                    if (isReports) {
                      setReportsExpanded(!reportsExpanded);
                    }
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "7.5px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    backgroundColor: isActive ? "#F2F6F8" : "transparent",
                    color: isActive ? "#2563EA" : "#4B5563",
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "13px",
                    transition: "all 0.15s ease",
                  }}
                  className={isActive ? "" : "sidebar-item-hover"}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <Icon
                      name={item.icon}
                      size={18}
                      color={isActive ? "#2563EA" : "#6A7589"}
                    />
                    <span>{item.name}</span>
                  </div>
                  {isReports && (
                    <span
                      style={{
                        transform: reportsExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      <Icon
                        name="chevron-down"
                        size={14}
                        color={isActive ? "#2563EA" : "#95A1B6"}
                      />
                    </span>
                  )}
                </div>

                {/* Submenu for Reports */}
                {isReports && reportsExpanded && (
                  <div
                    style={{
                      marginLeft: "24px",
                      marginTop: "2px",
                      marginBottom: "4px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      borderLeft: "2px solid #E2E8F0",
                      paddingLeft: "8px",
                    }}
                  >
                    {item.subItems.map((sub) => {
                      const isSubActive =
                        activePage === sub.code ||
                        (activePage === undefined &&
                          (pathname === sub.href ||
                            (sub.code === "Rep-01" && pathname === "/")));

                      return (
                        <Link
                          key={sub.code}
                          href={sub.href}
                          onClick={(e) => handleNavClick(sub.code, e)}
                          style={{
                            fontSize: "11px",
                            padding: "4.5px 6px",
                            borderRadius: "6px",
                            color: isSubActive ? "#2563EA" : "#4B5563",
                            backgroundColor: isSubActive ? "#F2F6F8" : "transparent",
                            fontWeight: isSubActive ? 600 : 400,
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            transition: "all 0.15s ease",
                          }}
                        >
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {sub.name}
                          </span>
                          <span
                            style={{
                              fontSize: "9px",
                              backgroundColor: isSubActive ? "#2563EA" : "#E2E8F0",
                              color: isSubActive ? "#FEFEFE" : "#4B5563",
                              padding: "1px 4px",
                              borderRadius: "4px",
                              fontWeight: 700,
                              flexShrink: 0,
                              marginLeft: "4px",
                            }}
                          >
                            {sub.code}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile Section */}
      <div
        style={{
          borderTop: "1px solid #E2E8F0",
          paddingTop: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "#F2F6F8",
              border: "1.5px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg viewBox="0 0 40 40" width="38" height="38">
              <rect width="40" height="40" fill="#F2F6F8" />
              <circle cx="20" cy="18" r="13" fill="#1F2937" />
              <circle cx="20" cy="18" r="9" fill="#fbcfe8" />
              <path d="M12 18 C12 12, 28 12, 28 18 C28 14, 25 10, 20 10 C15 10, 12 14, 12 18 Z" fill="#1F2937" />
              <path d="M10 38 C10 28, 14 26, 20 26 C26 26, 30 28, 30 38 Z" fill="#4B5563" />
              <path d="M17 26 L20 31 L23 26 Z" fill="#FEFEFE" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#1F2937",
                lineHeight: 1.2,
              }}
            >
              Admin User
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#6A7589",
              }}
            >
              Super Admin
            </div>
          </div>
        </div>
        <Icon name="chevron-down" size={16} color="#95A1B6" />
      </div>
    </aside>
  );
}
