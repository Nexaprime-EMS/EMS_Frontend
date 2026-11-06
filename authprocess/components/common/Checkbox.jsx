"use client";

import React, { useId } from "react";

export default function Checkbox({ label, checked, onChange, name }) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        cursor: "pointer",
        userSelect: "none",
        fontSize: "0.85rem",
        color: "#94a3b8",
      }}
    >
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{
          width: "16px",
          height: "16px",
          accentColor: "#6366f1",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      />
      <span>{label}</span>
    </label>
  );
}
