/**
 * Authentication Route Constants for EMS (Employee Management System)
 */

export const AUTH_ROUTES = {
  SPLASH: "/",
  LOGIN: {
    SUPER_ADMIN: "/auth/super-admin/login",
    TEAM_LEADER: "/auth/team-leader/login",
    EMPLOYEE: "/auth/employee/login",
    TEAM_MANAGER: "/auth/team-manager/login",
    HR_MANAGER: "/auth/hr-manager/login",
    ORGANIZATION_ADMIN: "/auth/organization-admin/login",
  },
  FORGOT_PASSWORD: "/auth/forgot-password",
  VERIFY_OTP: "/auth/verify-otp",
  RESET_PASSWORD: "/auth/reset-password",
  CHANGE_PASSWORD: "/auth/change-password",
  SESSION_EXPIRED: "/auth/session-expired",
};

export default AUTH_ROUTES;
