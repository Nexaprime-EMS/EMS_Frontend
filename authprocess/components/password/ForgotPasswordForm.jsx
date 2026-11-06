"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../../styles/auth-canvas.module.css";
import { authService } from "../../services/authService";
import { AUTH_ROUTES } from "../../constants/authRoutes";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please provide your registered email address.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await authService.forgotPassword(email);
      setIsSuccess(true);
      setTimeout(() => {
        router.push(AUTH_ROUTES.VERIFY_OTP);
      }, 1000);
    } catch (err) {
      setError(err.message || "Could not find an account with that email address.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Reset your access</h2>
      <p className={styles.subtitle}>
        Enter your email address and we&apos;ll send you a one-time password (OTP) to reset your password.
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

      {isSuccess && (
        <div className={styles.successMessage}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>OTP code sent! Redirecting to verification...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.inputLabel}>
            Email
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              placeholder="name@company.com"
              className={styles.textInput}
              required
              autoComplete="email"
            />
          </div>
        </div>

        <button type="submit" disabled={isLoading} className={styles.submitButton}>
          {isLoading ? "Sending OTP..." : "Send OTP"}
        </button>

        <Link href={AUTH_ROUTES.LOGIN.EMPLOYEE} className={styles.secondaryButton}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Back to Login</span>
        </Link>
      </form>
    </div>
  );
}
