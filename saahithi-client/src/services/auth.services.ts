import { http } from "@/lib/api/http";

const authApi = {
  login: (data: any) => http.post("/auth/login", data),
  register: (data: any) => http.post("/auth/register", data),
  refresh: () => http.post("/auth/refresh"),
  logout: () => http.post("/auth/logout"),
};

export default authApi;
