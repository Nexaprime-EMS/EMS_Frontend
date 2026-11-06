"use client";

import React from "react";
import Image from "next/image";
import styles from "../../styles/auth-canvas.module.css";
import splashIllustration from "../../assets/images/splash-illustration.png";

export default function AuthLeftPanel({ className }) {
  return (
    <section className={`${styles.leftPanel} ${className || ""}`} aria-label="Brand Overview and Identity">
      {/* Top Branding */}
      <div className={styles.brandHeader}>
        <div className={styles.brandLogoRow}>
          <span className={styles.brandIcon} aria-hidden="true">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="#2563EA"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
          </span>
          <h1 className={styles.brandTitle}>EMS</h1>
        </div>
        <p className={styles.brandSubtitle}>
          Enterprise Workforce Management System
        </p>
      </div>

      {/* Central Illustration Area */}
      <div className={styles.illustrationArea}>
        <div className={styles.illustrationWrapper}>
          <Image
            src={splashIllustration}
            alt="EMS Enterprise Workforce Collaboration Illustration"
            width={475}
            height={463}
            className={styles.illustrationImage}
            priority
          />
        </div>

        {/* Core Pillars */}
        <div className={styles.pillarRow}>
          <span>Modern</span>
          <span className={styles.pillarSeparator}>•</span>
          <span>Trustworthy</span>
          <span className={styles.pillarSeparator}>•</span>
          <span>Professional</span>
          <span className={styles.pillarSeparator}>•</span>
          <span>Clean</span>
          <span className={styles.pillarSeparator}>•</span>
          <span>Accessible</span>
        </div>
      </div>

      {/* Bottom Footer Copyright */}
      <div className={styles.copyrightText}>
        © 2026 EMS. All rights reserved.
      </div>
    </section>
  );
}
