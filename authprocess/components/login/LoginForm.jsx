"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../../styles/login.module.css";
import AuthInput from "../common/AuthInput";
import PasswordInput from "../common/PasswordInput";
import Checkbox from "../common/Checkbox";
import AuthButton from "../common/AuthButton";
import FormError from "../common/FormError";
import LoginFooter from "./LoginFooter";
import { authService } from "../../services/authService";
import { validateLoginForm } from "../../utils/validation";
import { AUTH_ROUTES } from "../../constants/authRoutes";

export default function LoginForm({ role }) {
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
        // Direct to verification or dashboard
        router.push(AUTH_ROUTES.VERIFY_OTP);
      }, 1000);
    } catch (err) {
      setServerError(err.message || "Failed to authenticate. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.formHeader}>
        <div
          className={styles.roleBadge}
          style={{
            borderColor: role.badgeColor,
            color: role.badgeColor,
            backgroundColor: `${role.badgeColor}15`,
          }}
        >
          <span>{role.screenId}</span> • <span>{role.name}</span>
        </div>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>
          Sign in with your enterprise credentials to access the {role.name} dashboard.
        </p>
      </div>

      {serverError && <FormError message={serverError} />}

      {successMessage && (
        <div
          style={{
            padding: "0.85rem",
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            borderRadius: "12px",
            color: "#6ee7b7",
            fontSize: "0.875rem",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          ✓ {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <AuthInput
          label="Email Address or Employee ID"
          name="identifier"
          value={formData.identifier}
          onChange={handleChange}
          placeholder="e.g. employee@ems.com or EMP-1049"
          error={errors.identifier}
          required
          autoComplete="username"
          icon={
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          }
        />

        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
          autoComplete="current-password"
        />

        <div className={styles.optionsRow}>
          <Checkbox
            name="rememberMe"
            label="Remember this workstation"
            checked={formData.rememberMe}
            onChange={handleChange}
          />

          <Link href={AUTH_ROUTES.FORGOT_PASSWORD} className={styles.forgotLink}>
            Forgot Password?
          </Link>
        </div>

        <AuthButton isLoading={isLoading} type="submit">
          Sign In to Portal
        </AuthButton>
      </form>

      <div className={styles.divider}>
        <span>Secure Identity Gateway</span>
      </div>

      <LoginFooter currentRoleId={role.id} />
    </div>
  );
}
