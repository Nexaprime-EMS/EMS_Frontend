"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/auth-canvas.module.css";
import { authService } from "../../services/authService";
import { calculatePasswordStrength } from "../../utils/passwordRules";
import { AUTH_ROUTES } from "../../constants/authRoutes";

export default function ChangePasswordForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = calculatePasswordStrength(formData.newPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (serverError) setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Must be at least 8 characters";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setServerError("");

    try {
      await authService.changePassword(formData.currentPassword, formData.newPassword);
      setSuccess(true);
      setTimeout(() => {
        router.push(AUTH_ROUTES.LOGIN.EMPLOYEE);
      }, 1200);
    } catch (err) {
      setServerError(err.message || "Failed to update password. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const activeBars = formData.newPassword ? Math.min(Math.max(Math.ceil((strength.score / 100) * 4), 1), 4) : 3;
  const strengthText = formData.newPassword ? strength.label : "Strong";

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Change your password</h2>
      <p className={styles.subtitle}>
        Enter your current password and set a new one.
      </p>

      {serverError && (
        <div className={styles.errorMessage}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{serverError}</span>
        </div>
      )}

      {success && (
        <div className={styles.successMessage}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Password changed successfully! Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        {/* Current Password */}
        <div className={styles.inputGroup}>
          <label htmlFor="currentPassword" className={styles.inputLabel}>
            Current Password
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.iconPrefix} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>
            <input
              id="currentPassword"
              name="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              className={`${styles.textInput} ${styles.textInputWithPrefix} ${styles.textInputWithSuffix}`}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className={styles.iconSuffix}
              aria-label={showCurrentPassword ? "Hide password" : "Show password"}
            >
              {showCurrentPassword ? (
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
          {errors.currentPassword && (
            <span style={{ fontSize: "12px", color: "#DC2626" }}>{errors.currentPassword}</span>
          )}
        </div>

        {/* New Password */}
        <div className={styles.inputGroup}>
          <label htmlFor="newPassword" className={styles.inputLabel}>
            New Password
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.iconPrefix} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <input
              id="newPassword"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className={`${styles.textInput} ${styles.textInputWithPrefix} ${styles.textInputWithSuffix}`}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className={styles.iconSuffix}
              aria-label={showNewPassword ? "Hide password" : "Show password"}
            >
              {showNewPassword ? (
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
          {errors.newPassword && (
            <span style={{ fontSize: "12px", color: "#DC2626" }}>{errors.newPassword}</span>
          )}
        </div>

        {/* Confirm New Password */}
        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword" className={styles.inputLabel}>
            Confirm New Password
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.iconPrefix} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className={`${styles.textInput} ${styles.textInputWithPrefix} ${styles.textInputWithSuffix}`}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={styles.iconSuffix}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
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
          {errors.confirmPassword && (
            <span style={{ fontSize: "12px", color: "#DC2626" }}>{errors.confirmPassword}</span>
          )}
        </div>

        {/* Password Strength Section (matching Figma AUTH-06) */}
        <div className={styles.passwordStrengthWrapper}>
          <div className={styles.strengthHeader}>
            <span className={styles.strengthLabel}>Password Strength</span>
            <span className={styles.strengthValue}>{strengthText}</span>
          </div>
          <div className={styles.strengthBars}>
            {[1, 2, 3, 4].map((barIndex) => (
              <div
                key={barIndex}
                className={`${styles.strengthBar} ${barIndex <= activeBars ? styles.strengthBarActive : ""}`}
              />
            ))}
          </div>
          <p className={styles.strengthHint}>
            Use 8+ characters with a mix of letters, numbers &amp; symbols.
          </p>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isLoading} className={styles.submitButton}>
          {isLoading ? "Updating Password..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
