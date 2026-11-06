"use client";

import React from "react";
import styles from "../../styles/auth-layout.module.css";
import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";
import LoginIllustration from "../login/LoginIllustration";

export default function AuthLayout({
  children,
  currentRole,
  showIllustration = true,
  illustrationTitle,
  illustrationSubtitle,
}) {
  return (
    <div className={styles.container}>
      {/* Background Gradients & Effects */}
      <div className={styles.bgOverlay} />
      <div className={styles.glowOrb1} />
      <div className={styles.glowOrb2} />

      {/* Top Header */}
      <AuthHeader currentRole={currentRole} />

      {/* Central Content */}
      <main className={styles.main}>
        {showIllustration ? (
          <div className={styles.cardWrapper}>
            <div className={styles.visualColumn}>
              <LoginIllustration
                title={illustrationTitle}
                subtitle={illustrationSubtitle}
              />
            </div>
            <div className={styles.formColumn}>
              {children}
            </div>
          </div>
        ) : (
          <div className={styles.singleCardWrapper}>
            {children}
          </div>
        )}
      </main>

      {/* Bottom Footer */}
      <AuthFooter />
    </div>
  );
}
