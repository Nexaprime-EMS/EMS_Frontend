"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/auth-layout.module.css";
import emsLogo from "../../assets/images/ems-logo.png";

export default function AuthHeader({ currentRole }) {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoArea}>
        <Image
          src={emsLogo}
          alt="EMS Logo"
          width={40}
          height={40}
          className={styles.logoImg}
          priority
        />
        <div>
          <div className={styles.brandTitle}>EMS Platform</div>
          <div className={styles.brandSub}>Enterprise Workforce</div>
        </div>
      </Link>

      <div className={styles.headerBadge}>
        <span className={styles.statusDot} />
        <span>{currentRole ? `${currentRole.name} Gateway` : "Zero-Trust Secure Access"}</span>
      </div>
    </header>
  );
}
