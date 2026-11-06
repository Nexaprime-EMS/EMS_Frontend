"use client";

import React from "react";
import LoginPage from "../../components/login/LoginPage";
import { USER_ROLES } from "../../constants/userRoles";

export default function OrganizationAdminLogin() {
  return <LoginPage role={USER_ROLES.ORGANIZATION_ADMIN} />;
}
