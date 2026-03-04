import type { ApiResponse } from "../../types/api.types";
import apiClient from "../axios.config";

export const analyticsAPI = {
  getAnalytics: async () => {
    const response = await apiClient.get<ApiResponse<any>>("/admin/stats");
    return response.data.result;
  },
  getOverallProgress: async (range: "day" | "week" | "month" | "year") => {
    const response = await apiClient.get<ApiResponse<any>>(
      `/admin/progress?range=${range}`,
    );
    return response.data.result;
  },
  getEngagementTrends: async (range: string | null) => {
    const response = await apiClient.get<ApiResponse<any>>(
      `/admin/trends?range=${range}`,
    );
    return response.data.result;
  },
};
