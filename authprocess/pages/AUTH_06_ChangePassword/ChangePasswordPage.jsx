"use client";

import React from "react";
import styles from "../../styles/auth-canvas.module.css";
import AuthLeftPanel from "../../components/common/AuthLeftPanel";
import ChangePasswordForm from "../../components/password/ChangePasswordForm";

export default function ChangePasswordPage() {
  return (
    <div
      className={styles.authPageWrapper}
      data-screen-id="AUTH-06"
      data-canvas-width="1440"
      data-canvas-height="1024"
    >
      <div className={styles.authCanvas}>
        <AuthLeftPanel />
        <section className={styles.rightPanel} aria-label="Change Password Form">
          <ChangePasswordForm />
        </section>
      </div>
    </div>
  );
}
