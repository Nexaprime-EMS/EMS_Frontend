"use client";

import React, { useRef } from "react";
import styles from "../../styles/otp-verification.module.css";

export default function OtpInput({ length = 6, value = "", onChange }) {
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) {
      const nextOtp = value.split("");
      nextOtp[index] = "";
      onChange(nextOtp.join(""));
      return;
    }

    const nextOtp = value.split("");
    nextOtp[index] = val.slice(-1);
    const updated = nextOtp.join("");
    onChange(updated);

    // Focus next box
    if (index < length - 1 && val) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    const focusIdx = Math.min(pasted.length, length - 1);
    inputRefs.current[focusIdx]?.focus();
  };

  return (
    <div className={styles.otpRow} onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={styles.otpDigit}
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
}
