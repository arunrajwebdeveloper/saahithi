import { http } from "@/lib/api/http";

const userApi = {
  getCurrentUser: () => http.get("/user/me"),
  updateProfile: () => http.patch("/user/update"),
  inactivateProfile: () => http.patch("/user/inactivate"),
  follow: (targetId: string) => http.post(`/user/follow/${targetId}`),
  unfollow: (targetId: string) => http.delete(`/user/unfollow/${targetId}`),
  deleteProfile: () => http.delete("/user/delete"),
};

export default userApi;
