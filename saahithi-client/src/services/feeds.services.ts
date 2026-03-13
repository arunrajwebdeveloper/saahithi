import { http } from "@/lib/api/http";

const feedsApi = {
  getFeeds: () => http.get("/feeds/discovery"),
  getPersonalizedFeeds: () => http.get("/feeds/personalized"),
};

export default feedsApi;
