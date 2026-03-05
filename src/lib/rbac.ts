import { Role } from "@prisma/client";

export const requireAdmin = (role?: Role) => {
  if (role !== Role.ADMIN) {
    throw new Error("Admin privileges required");
  }
};

export const requireMember = (role?: Role) => {
  if (!role || role === Role.GUEST) {
    throw new Error("Member access required");
  }
};
