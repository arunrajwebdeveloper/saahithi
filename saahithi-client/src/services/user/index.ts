import { http } from "@/lib/api/http";

const userApi = {
  getCurrentUser: () => http.get("/user/me"),
};

export default userApi;
