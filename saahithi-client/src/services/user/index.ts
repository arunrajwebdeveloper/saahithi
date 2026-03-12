import { http } from "@/lib/api/http";

const userApi = {
  getCurrentUser: () => http.get("/user/me"),
  updateProfile: () => http.patch("/user/update"),
  inactivateProfile: () => http.patch("/user/inactivate"),
  deleteProfile: () => http.delete("/user/delete"),
};

export default userApi;
