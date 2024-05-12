import { sideLinks } from "@/components/layouts/side-bar/sideLinks";

// a function that takes in a role parameter and returns an array of allowed links
export const useAllowedLinks = (role: string) => {
  switch (role) {
    case "Administrator":
      return [...sideLinks];
    case "Manager":
      return [...sideLinks];
    case "Supervisor":
      return sideLinks.filter(
        (link) =>
          link.title !== "Reports" &&
          link.title !== "Dashboard" &&
          link.title !== "Analytics" &&
          link.title !== "Inventory" &&
          link.title !== "Management"
      );
    case "Staff":
      return sideLinks.filter(
        (link) =>
          link.title !== "Reports" &&
          link.title !== "Dashboard" &&
          link.title !== "Analytics" &&
          link.title !== "Inventory" &&
          link.title !== "Management"
      );
    case "Cashier":
      return sideLinks.filter(
        (link) =>
          link.title !== "Reports" &&
          link.title !== "Dashboard" &&
          link.title !== "Analytics" &&
          link.title !== "Inventory" &&
          link.title !== "Management"
      );
    // case "Mechanic":
    //   return sideLinks.filter(
    //     (link) =>
    //       link.title !== "Reports" &&
    //       link.title !== "Settings" &&
    //       link.title !== "Management"
    //   );
    default:
      return [];
  }
};
