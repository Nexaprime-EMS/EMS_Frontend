"use client";

import React from "react";
import styles from "../../styles/auth-canvas.module.css";
import AuthLeftPanel from "../../components/common/AuthLeftPanel";
import ResetPasswordForm from "../../components/password/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div
      className={styles.authPageWrapper}
      data-screen-id="AUTH-05"
      data-canvas-width="1440"
      data-canvas-height="1024"
    >
      <div className={styles.authCanvas}>
        <AuthLeftPanel />
        <section className={styles.rightPanel} aria-label="Create New Password Form">
          <ResetPasswordForm />
        </section>
      </div>
    </div>
  );
}
