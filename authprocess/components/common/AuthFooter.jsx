"use client";

import React from "react";
import Link from "next/link";
import styles from "../../styles/auth-layout.module.css";

export default function AuthFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div>
        © {year} EMS Enterprise Solutions Inc. All rights reserved.
      </div>
      <nav className={styles.footerLinks} aria-label="Authentication legal navigation">
        <Link href="#privacy" className={styles.footerLink}>
          Privacy Policy
        </Link>
        <Link href="#terms" className={styles.footerLink}>
          Terms of Service
        </Link>
        <Link href="#security" className={styles.footerLink}>
          Security Center
        </Link>
        <Link href="#support" className={styles.footerLink}>
          IT Helpdesk
        </Link>
      </nav>
    </footer>
  );
}
