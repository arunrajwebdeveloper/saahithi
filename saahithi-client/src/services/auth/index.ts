import { http } from "@/lib/api/http";

const authApi = {
  login: (data: any) =>
    http.post("/auth/login", {
      body: data,
    }),
  register: (data: any) =>
    http.post("/auth/register", {
      body: data,
    }),
  refresh: () => http.post("/auth/refresh"),
  logout: () => http.post("/auth/logout"),
};

export default authApi;
