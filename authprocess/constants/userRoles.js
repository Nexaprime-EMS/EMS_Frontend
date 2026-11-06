/**
 * User Roles and Metadata for EMS
 */

export const USER_ROLES = {
  SUPER_ADMIN: {
    id: "super-admin",
    name: "Super Admin",
    screenId: "AUTH-02",
    loginRoute: "/auth/super-admin/login",
    badgeColor: "#6366f1",
    description: "System administration and global platform controls",
  },
  TEAM_LEADER: {
    id: "team-leader",
    name: "Team Leader",
    screenId: "AUTH-02",
    loginRoute: "/auth/team-leader/login",
    badgeColor: "#3b82f6",
    description: "Team performance, sprint tasks and workflow operations",
  },
  EMPLOYEE: {
    id: "employee",
    name: "Employee",
    screenId: "AUTH-02",
    loginRoute: "/auth/employee/login",
    badgeColor: "#10b981",
    description: "Personal tasks, attendance, leaves and self-service",
  },
  TEAM_MANAGER: {
    id: "team-manager",
    name: "Team Manager",
    screenId: "AUTH-02",
    loginRoute: "/auth/team-manager/login",
    badgeColor: "#8b5cf6",
    description: "Departmental project management and resource oversight",
  },
  HR_MANAGER: {
    id: "hr-manager",
    name: "HR Manager",
    screenId: "AUTH-02",
    loginRoute: "/auth/hr-manager/login",
    badgeColor: "#ec4899",
    description: "Talent acquisition, payroll, employee relations & policies",
  },
  ORGANIZATION_ADMIN: {
    id: "organization-admin",
    name: "Organization Admin",
    screenId: "AUTH-02",
    loginRoute: "/auth/organization-admin/login",
    badgeColor: "#f59e0b",
    description: "Enterprise billing, company policies and organization units",
  },
};

export const ROLE_LIST = Object.values(USER_ROLES);
export default USER_ROLES;
