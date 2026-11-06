"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/splash.module.css";
import splashIllustration from "../../assets/images/splash-illustration.png";
import { ROLE_LIST } from "../../constants/userRoles";
import { AUTH_ROUTES } from "../../constants/authRoutes";

export default function SplashScreen() {
  const [showRoleModal, setShowRoleModal] = useState(false);

  return (
    <div
      className={styles.splashPageWrapper}
      data-screen-id="AUTH-01"
      data-figma-x="27895"
      data-figma-y="11097"
      data-canvas-width="1440"
      data-canvas-height="1024"
    >
      <div className={styles.splashCanvas}>
        {/* Left Panel: 720px width, #F2F6F8 background, 100% opacity */}
        <section className={styles.leftPanel} aria-label="Brand Overview and Identity">
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

        {/* Right Panel: 720px width, #FEFEFE background, 100% opacity */}
        <section className={styles.rightPanel} aria-label="Welcome and Authentication Gateway">
          <div
            className={styles.welcomeFrame}
            data-frame-width="720"
            data-frame-height="129"
            data-frame-x="0"
            data-frame-y="401"
          >
            <h2 className={styles.welcomeHeading}>Welcome Back!</h2>

            <Link
              href={AUTH_ROUTES.LOGIN.EMPLOYEE}
              className={styles.continueButton}
              data-button-x="230"
              data-button-y="65"
              data-button-width="260"
              data-button-height="63"
            >
              <span>Continue</span>
              <span className={styles.arrowIcon} aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 10H16M16 10L11 5M16 10L11 15"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>

          <button
            type="button"
            className={styles.roleSelectorTrigger}
            onClick={() => setShowRoleModal(true)}
          >
            Select specific role portal
          </button>

          {/* Role Portal Selection Modal */}
          {showRoleModal && (
            <div
              className={styles.roleModalBackdrop}
              onClick={() => setShowRoleModal(false)}
            >
              <div
                className={styles.roleModalCard}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.roleModalHeader}>
                  <h3 className={styles.roleModalTitle}>Select Workspace Role</h3>
                  <button
                    type="button"
                    className={styles.closeButton}
                    onClick={() => setShowRoleModal(false)}
                    aria-label="Close modal"
                  >
                    ✕
                  </button>
                </div>

                <div className={styles.roleListGrid}>
                  {ROLE_LIST.map((role) => (
                    <Link
                      key={role.id}
                      href={role.loginRoute}
                      className={styles.roleLinkCard}
                    >
                      <span className={styles.roleLinkName}>{role.name}</span>
                      <span className={styles.roleLinkScreen}>{role.screenId}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
