"use client";

import React, { useState, useId } from "react";
import FormError from "./FormError";

export default function PasswordInput({
  label = "Password",
  name = "password",
  value,
  onChange,
  placeholder = "••••••••",
  error,
  required = false,
  autoComplete = "current-password",
  disabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = useId();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", width: "100%" }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{ fontSize: "0.825rem", fontWeight: "500", color: "#cbd5e1" }}
        >
          {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
        </label>
      )}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {/* Lock prefix icon */}
        <span
          style={{
            position: "absolute",
            left: "0.9rem",
            color: "#64748b",
            display: "flex",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </span>

        <input
          id={inputId}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          disabled={disabled}
          style={{
            width: "100%",
            padding: "0.85rem 2.8rem 0.85rem 2.6rem",
            background: "rgba(15, 23, 42, 0.6)",
            border: `1px solid ${error ? "#ef4444" : "rgba(255, 255, 255, 0.12)"}`,
            borderRadius: "12px",
            color: "#ffffff",
            fontSize: "0.925rem",
            outline: "none",
            transition: "all 0.2s ease",
          }}
        />

        {/* Toggle password visibility suffix */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          style={{
            position: "absolute",
            right: "0.85rem",
            background: "none",
            border: "none",
            color: "#94a3b8",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "0.25rem",
          }}
        >
          {showPassword ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
      <FormError message={error} />
    </div>
  );
}
