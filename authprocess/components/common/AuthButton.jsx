"use client";

import React from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function AuthButton({
  children,
  isLoading = false,
  disabled = false,
  type = "submit",
  onClick,
  style = {},
  variant = "primary",
}) {
  const isPrimary = variant === "primary";

  const baseStyle = {
    width: "100%",
    padding: "0.85rem 1.25rem",
    borderRadius: "12px",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: disabled || isLoading ? "not-allowed" : "pointer",
    opacity: disabled || isLoading ? 0.65 : 1,
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    border: isPrimary ? "none" : "1px solid rgba(255, 255, 255, 0.15)",
    background: isPrimary
      ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
      : "rgba(255, 255, 255, 0.05)",
    color: "#ffffff",
    boxShadow: isPrimary ? "0 10px 25px -5px rgba(99, 102, 241, 0.4)" : "none",
    ...style,
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      style={baseStyle}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size={18} />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
