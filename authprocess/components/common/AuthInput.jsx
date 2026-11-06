"use client";

import React, { useId } from "react";
import FormError from "./FormError";

export default function AuthInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  icon,
  required = false,
  autoComplete,
  disabled = false,
}) {
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
        {icon && (
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
            {icon}
          </span>
        )}
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          disabled={disabled}
          style={{
            width: "100%",
            padding: `0.85rem 1rem 0.85rem ${icon ? "2.6rem" : "1rem"}`,
            background: "rgba(15, 23, 42, 0.6)",
            border: `1px solid ${error ? "#ef4444" : "rgba(255, 255, 255, 0.12)"}`,
            borderRadius: "12px",
            color: "#ffffff",
            fontSize: "0.925rem",
            outline: "none",
            transition: "all 0.2s ease",
          }}
        />
      </div>
      <FormError message={error} />
    </div>
  );
}
