"use client";

import React from "react";
import styles from "../../styles/auth-canvas.module.css";
import AuthLeftPanel from "../../components/common/AuthLeftPanel";
import OtpVerificationForm from "../../components/password/OtpVerificationForm";
import { AUTH_ROUTES } from "../../constants/authRoutes";

export default function OtpVerificationPage() {
  return (
    <div
      className={styles.authPageWrapper}
      data-screen-id="AUTH-04"
      data-canvas-width="1440"
      data-canvas-height="1024"
    >
      <div className={styles.authCanvas}>
        <AuthLeftPanel />
        <section className={styles.rightPanel} aria-label="Verify OTP Form">
          <OtpVerificationForm
            destination="emp***@company.com"
            nextRoute={AUTH_ROUTES.RESET_PASSWORD}
          />
        </section>
      </div>
    </div>
  );
}
