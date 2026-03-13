import { http } from "@/lib/api/http";

const interactionApi = {
  interaction: (id: string) => http.post(`/interactions/view/${id}`),
  getActivities: () => http.get("/interactions/my-activity"),
};

export default interactionApi;
