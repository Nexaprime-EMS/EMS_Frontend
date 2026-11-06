"use client";

import React from "react";

export default function FormError({ message }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.65rem 0.85rem",
        borderRadius: "10px",
        backgroundColor: "rgba(239, 68, 68, 0.12)",
        border: "1px solid rgba(239, 68, 68, 0.25)",
        color: "#fca5a5",
        fontSize: "0.825rem",
        marginTop: "0.25rem",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span>{message}</span>
    </div>
  );
}
