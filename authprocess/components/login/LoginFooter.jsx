"use client";

import React from "react";
import Link from "next/link";
import styles from "../../styles/login.module.css";
import { ROLE_LIST } from "../../constants/userRoles";

export default function LoginFooter({ currentRoleId }) {
  const otherRoles = ROLE_LIST.filter((r) => r.id !== currentRoleId);

  return (
    <div className={styles.switchRoleFooter}>
      <span>Need another role portal?</span>
      <div style={{ marginTop: "0.5rem", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem" }}>
        {otherRoles.slice(0, 3).map((r) => (
          <Link key={r.id} href={r.loginRoute} className={styles.switchRoleLink}>
            {r.name}
          </Link>
        ))}
        <Link href="/" className={styles.switchRoleLink} style={{ color: "#38bdf8" }}>
          All Roles →
        </Link>
      </div>
    </div>
  );
}
