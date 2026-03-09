export const ROLES = {
  ADMIN: "admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}
