"use client";

import React from "react";
import styles from "../../styles/auth-canvas.module.css";
import AuthLeftPanel from "../../components/common/AuthLeftPanel";
import ForgotPasswordForm from "../../components/password/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div
      className={styles.authPageWrapper}
      data-screen-id="AUTH-03"
      data-canvas-width="1440"
      data-canvas-height="1024"
    >
      <div className={styles.authCanvas}>
        <AuthLeftPanel />
        <section className={styles.rightPanel} aria-label="Reset Access Form">
          <ForgotPasswordForm />
        </section>
      </div>
    </div>
  );
}
