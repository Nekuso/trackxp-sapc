import { ROLES } from "./roles";

const { ADMINISTRATOR, MANAGER, STAFF, CASHIER, SUPERVISOR, MECHANIC } = ROLES;

const checkRole = (userRole: any, allowedRoles: any) => {
  return allowedRoles.includes(userRole);
};

const getDefaultRoute = (userRole: any) => {
  switch (userRole) {
    case ADMINISTRATOR:
      return "/application";
    case MANAGER:
      return "/application";
    case STAFF:
      return "/application/transactions";
    case CASHIER:
      return "/application/transactions";
    case SUPERVISOR:
      return "/application/transactions";
    default:
      return "/application/announcements";
  }
};

export const useAuthMiddleware = (allowedRoles: any, currentUser: any) => {
  // if allowed return true else return default route
  const allowed = checkRole(currentUser.roles.role, allowedRoles);
  const defaultRoute = getDefaultRoute(currentUser.roles.role);
  return {
    allowed,
    defaultRoute,
  };
};
