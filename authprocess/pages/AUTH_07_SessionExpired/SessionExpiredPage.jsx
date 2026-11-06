"use client";

import React from "react";
import styles from "../../styles/auth-canvas.module.css";
import AuthLeftPanel from "../../components/common/AuthLeftPanel";
import SessionExpiredMessage from "../../components/session/SessionExpiredMessage";

export default function SessionExpiredPage() {
  return (
    <div
      className={styles.authPageWrapper}
      data-screen-id="AUTH-07"
      data-canvas-width="1440"
      data-canvas-height="1024"
    >
      <div className={styles.authCanvas}>
        <AuthLeftPanel />
        <section className={styles.rightPanel} aria-label="Session Expired">
          <SessionExpiredMessage />
        </section>
      </div>
    </div>
  );
}
