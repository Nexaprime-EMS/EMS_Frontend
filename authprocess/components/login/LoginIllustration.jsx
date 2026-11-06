"use client";

import React from "react";
import Image from "next/image";
import styles from "../../styles/auth-layout.module.css";
import splashIllustration from "../../assets/images/splash-illustration.png";

export default function LoginIllustration({
  title = "Unified Enterprise Access",
  subtitle = "Granular security permissions, biometrics & single sign-on safeguarding high-velocity teamwork.",
}) {
  return (
    <>
      <Image
        src={splashIllustration}
        alt="EMS Enterprise Workforce Collaboration Illustration"
        width={475}
        height={463}
        className={styles.visualIllustration}
        priority
      />
      <div className={styles.visualContent}>
        <h2 className={styles.visualTitle}>{title}</h2>
        <p className={styles.visualDesc}>{subtitle}</p>
      </div>
    </>
  );
}
