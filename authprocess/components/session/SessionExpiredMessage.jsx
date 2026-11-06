"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/auth-canvas.module.css";
import { AUTH_ROUTES } from "../../constants/authRoutes";
import sessionExpiredLogo from "../../assets/images/session-expired-logo.png";

export default function SessionExpiredMessage() {
  return (
    <div className={styles.sessionExpiredWrapper}>
      {/* Top Session Expired Logo */}
      <div className={styles.sessionGraphicWrapper} aria-hidden="true">
        <Image
          src={sessionExpiredLogo}
          alt="Session Expired Warning"
          width={154}
          height={140}
          className={styles.sessionLogoImage}
          priority
        />
      </div>

      <h2 className={styles.heading}>Session Expired</h2>
      <p className={styles.subtitle}>
        For your security, your session has expired. Please sign in again.
      </p>

      {/* Session Expired Message Notice Box */}
      <div className={styles.sessionNoticeBox}>
        <div className={styles.sessionNoticeIcon}>!</div>
        <div className={styles.sessionNoticeContent}>
          <span className={styles.sessionNoticeTitle}>Session Expired Message</span>
          <span className={styles.sessionNoticeSubtitle}>Security notice</span>
          <span className={styles.sessionNoticeDesc}>
            Gray scale text placeholder + spacing for message area
          </span>
        </div>
      </div>

      {/* Login Again Button */}
      <Link href={AUTH_ROUTES.LOGIN.EMPLOYEE} className={styles.submitButton} style={{ textDecoration: "none" }}>
        Login Again
      </Link>
    </div>
  );
}
