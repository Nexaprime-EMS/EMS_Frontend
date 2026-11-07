"use client";

import React, { useState } from "react";
import { Icon } from "../UI/Icons";

export default function Header({ onSearch, activePageName }) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <header
      style={{
        height: "70px",
        minHeight: "70px",
        maxHeight: "70px",
        backgroundColor: "#FEFEFE",
        borderBottom: "1px solid #E2E8F0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      {/* Left Search Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "#FEFEFE",
          border: "1px solid #E2E8F0",
          borderRadius: "8px",
          padding: "8px 14px",
          width: "440px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
        }}
      >
        <Icon name="search" size={16} color="#9CA3AF" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            if (onSearch) onSearch(e.target.value);
          }}
          placeholder="Search for employees, modules, reports..."
          style={{
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            fontSize: "13px",
            color: "#1F2937",
            width: "100%",
            fontFamily: "inherit",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            backgroundColor: "#F2F6F8",
            border: "1px solid #E2E8F0",
            borderRadius: "4px",
            padding: "2px 6px",
            fontSize: "11px",
            color: "#6A7589",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          <span>Ctrl</span>
          <span>+</span>
          <span>K</span>
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Help icon */}
        <button
          title="Help & Support"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            color: "#6A7589",
            padding: "4px",
            borderRadius: "6px",
          }}
          className="icon-button-hover"
        >
          <Icon name="help" size={19} color="#6A7589" />
        </button>

        {/* Notifications with red badge 8 */}
        <div style={{ position: "relative" }}>
          <button
            title="Notifications"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              color: "#6A7589",
              padding: "4px",
              borderRadius: "6px",
            }}
            className="icon-button-hover"
          >
            <Icon name="notifications" size={19} color="#6A7589" />
          </button>
          <span
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              backgroundColor: "#F0434D",
              color: "#FEFEFE",
              fontSize: "10px",
              fontWeight: 700,
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #FEFEFE",
            }}
          >
            8
          </span>
        </div>

        {/* Dark mode moon icon */}
        <button
          title="Toggle Theme"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            color: "#6A7589",
            padding: "4px",
            borderRadius: "6px",
          }}
          className="icon-button-hover"
        >
          <Icon name="moon" size={19} color="#6A7589" />
        </button>

        <div
          style={{
            width: "1px",
            height: "28px",
            backgroundColor: "#E2E8F0",
            margin: "0 4px",
          }}
        />

        {/* User Profile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "#1F2937",
              overflow: "hidden",
              border: "1.5px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg viewBox="0 0 36 36" width="36" height="36">
              <rect width="36" height="36" fill="#1F2937" />
              <path d="M4 36 L12 24 L24 24 L32 36 Z" fill="#4B5563" />
              <polygon points="15,24 21,24 18,32" fill="#FEFEFE" />
              <polygon points="17.5,25 18.5,25 19,30 18,33 17,30" fill="#2563EA" />
              <circle cx="18" cy="15" r="7.5" fill="#fbcfe8" />
              <path d="M11 14 C11 9, 25 8, 25 14 C25 11, 23 9, 18 9 C13 9, 11 11, 11 14 Z" fill="#1F2937" />
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
              Alex Johnson
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#6A7589",
              }}
            >
              Product Designer
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
