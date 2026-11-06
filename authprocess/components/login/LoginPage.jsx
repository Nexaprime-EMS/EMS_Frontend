"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../../styles/login-page.module.css";
import AuthLeftPanel from "../common/AuthLeftPanel";
import { authService } from "../../services/authService";
import { validateLoginForm } from "../../utils/validation";
import { AUTH_ROUTES } from "../../constants/authRoutes";

export default function LoginPage({ role }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateLoginForm(formData.identifier, formData.password);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    setServerError("");

    try {
      const res = await authService.login(role.id, {
        identifier: formData.identifier,
        password: formData.password,
      });

      setSuccessMessage(`Authenticated as ${role.name}. Redirecting...`);
      setTimeout(() => {
        router.push(AUTH_ROUTES.VERIFY_OTP);
      }, 1000);
    } catch (err) {
      setServerError(err.message || "Failed to authenticate. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const emailPlaceholder =
    role?.id === "employee"
      ? "employee@company.com"
      : role?.id === "hr-manager"
      ? "hrmanager@company.com"
      : role?.id === "organization-admin"
      ? "organizationadmin@company.com"
      : role?.id === "super-admin"
      ? "superadmin@company.com"
      : role?.id === "team-leader"
      ? "teamleader@company.com"
      : role?.id === "team-manager"
      ? "teammanager@company.com"
      : "name@company.com";

  return (
    <div
      className={styles.loginPageWrapper}
      data-screen-id="AUTH-02"
      data-canvas-width="1440"
      data-canvas-height="1024"
    >
      <div className={styles.loginCanvas}>
        {/* Left Panel */}
        <AuthLeftPanel className={styles.leftPanel} />

        {/* ── Right Panel ── */}
        <section className={styles.rightPanel} aria-label="Login Form">
          {/* Welcome */}
          <h2 className={styles.welcomeHeading}>Welcome Back!</h2>
          <p className={styles.welcomeSubtitle}>Sign in to continue.</p>

          {/* Server Error */}
          {serverError && (
            <div className={styles.errorMessage}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              {serverError}
            </div>
          )}

          {/* Success */}
          {successMessage && (
            <div className={styles.successMessage}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              {successMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.loginForm} noValidate>
            {/* Email */}
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Email</label>
              <div className={styles.inputWrapper}>
                <input
                  name="identifier"
                  type="text"
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder={emailPlaceholder}
                  autoComplete="username"
                  className={`${styles.textInput} ${errors.identifier ? styles.textInputError : ""}`}
                />
              </div>
              {errors.identifier && <span className={styles.fieldError}>{errors.identifier}</span>}
            </div>

            {/* Password */}
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Password</label>
              <div className={styles.inputWrapper}>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Aabc@123xyz"
                  autoComplete="current-password"
                  className={`${styles.textInput} ${errors.password ? styles.textInputError : ""}`}
                  style={{ paddingRight: "42px" }}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
            </div>

            {/* Remember + Forgot */}
            <div className={styles.optionsRow}>
              <label className={styles.rememberLabel}>
                <input
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className={styles.rememberCheckbox}
                />
                <span>Remember Me</span>
              </label>
              <Link href={AUTH_ROUTES.FORGOT_PASSWORD} className={styles.forgotLink}>
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? (
                <>
                  <span className={styles.spinner} />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Trust Badge */}
          <div className={styles.trustBadge}>
            <span className={styles.trustIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EA" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" stroke="#2563EA" strokeWidth="2" />
              </svg>
            </span>
            <div className={styles.trustText}>
              <span className={styles.trustTitle}>Secure • Trusted • Accessible</span>
              <span className={styles.trustSubtitle}>Your security is our priority</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
