"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/auth-canvas.module.css";
import { authService } from "../../services/authService";
import { AUTH_ROUTES } from "../../constants/authRoutes";

export default function OtpVerificationForm({
  destination = "usr***@company.com",
  nextRoute = AUTH_ROUTES.RESET_PASSWORD,
}) {
  const router = useRouter();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(45);
  const canResend = timer === 0;
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    // Only accept numeric characters
    const cleanVal = value.replace(/[^0-9]/g, "");
    if (!cleanVal) {
      const newDigits = [...digits];
      newDigits[index] = "";
      setDigits(newDigits);
      return;
    }

    const newDigits = [...digits];
    // If multiple characters pasted
    if (cleanVal.length > 1) {
      const pastedChars = cleanVal.slice(0, 6).split("");
      pastedChars.forEach((ch, i) => {
        if (i < 6) newDigits[i] = ch;
      });
      setDigits(newDigits);
      const nextIdx = Math.min(pastedChars.length, 5);
      inputRefs.current[nextIdx]?.focus();
      return;
    }

    newDigits[index] = cleanVal.slice(-1);
    setDigits(newDigits);
    if (error) setError("");

    // Auto advance
    if (index < 5 && cleanVal) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").replace(/[^0-9]/g, "");
    if (!pastedData) return;

    const newDigits = [...digits];
    const chars = pastedData.slice(0, 6).split("");
    chars.forEach((ch, i) => {
      newDigits[i] = ch;
    });
    setDigits(newDigits);
    const nextIdx = Math.min(chars.length, 5);
    inputRefs.current[nextIdx]?.focus();
  };

  const handleResend = async () => {
    try {
      await authService.resendOtp();
      setTimer(45);
      setCanResend(false);
      setSuccessMsg("A new verification code has been dispatched.");
      setError("");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const fullOtp = digits.join("");
    if (fullOtp.length < 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await authService.verifyOtp(fullOtp);
      setSuccessMsg("Code verified! Redirecting...");
      setTimeout(() => {
        router.push(nextRoute);
      }, 800);
    } catch (err) {
      setError(err.message || "Invalid or expired verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  const formattedTimer = `00:${timer < 10 ? `0${timer}` : timer}`;

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Verify OTP</h2>
      <p className={styles.subtitle}>
        Enter the six-digit code sent to your email.
      </p>

      {error && (
        <div className={styles.errorMessage}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className={styles.successMessage}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleVerify} className={styles.form} noValidate>
        {/* 6 OTP Boxes */}
        <div className={styles.otpContainer}>
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className={`${styles.otpBox} ${digit ? styles.otpBoxActive : ""}`}
              autoFocus={i === 0}
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>

        {/* Resend Link */}
        <div className={styles.resendRow}>
          <span>Didn&apos;t receive the code?</span>
          <button
            type="button"
            onClick={handleResend}
            className={styles.resendLink}
          >
            Resend OTP
          </button>
        </div>

        {/* Primary Verify Button */}
        <button type="submit" disabled={isLoading} className={styles.submitButton}>
          {isLoading ? "Verifying..." : "Verify"}
        </button>

        {/* Other Options Card (matching Figma AUTH-04) */}
        <div className={styles.otherOptionsCard}>
          <div className={styles.otherOptionsHeader}>OTHER OPTIONS</div>

          <div className={styles.otherOptionItem}>
            <div className={styles.otherOptionIcon} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 14 14" />
              </svg>
            </div>
            <div className={styles.otherOptionContent}>
              <span className={styles.otherOptionTitle}>Six OTP Boxes</span>
              <span className={styles.otherOptionSubtitle}>Input 6-digit code</span>
            </div>
          </div>

          <div className={styles.otherOptionItem}>
            <div className={styles.otherOptionIcon} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="13" r="8" />
                <path d="M12 9v4l2 2" />
                <path d="M5 3L2 6" />
                <path d="M22 6l-3-3" />
                <path d="M10 2h4" />
              </svg>
            </div>
            <div className={styles.otherOptionContent}>
              <span className={styles.otherOptionTitle}>Timer</span>
              <span className={styles.otherOptionSubtitle}>
                Resend code in {formattedTimer}
              </span>
            </div>
          </div>

          <div className={styles.otherOptionItem}>
            <div className={styles.otherOptionIcon} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
            </div>
            <div className={styles.otherOptionContent}>
              <span className={styles.otherOptionTitle}>Resend OTP</span>
              <span className={styles.otherOptionSubtitle}>Send a new code to your email</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
