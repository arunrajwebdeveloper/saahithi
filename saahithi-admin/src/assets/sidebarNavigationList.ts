import {
  BookOpenText,
  Bug,
  CircleGauge,
  CreditCard,
  Server,
  Users,
} from "lucide-react";

export const sidebarNavigationList = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: CircleGauge,
  },
  {
    title: "Contents",
    url: "/dashboard/contents",
    icon: BookOpenText,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Payments",
    url: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: Bug,
  },
  {
    title: "Logs",
    url: "/dashboard/logs",
    icon: Server,
  },
];
