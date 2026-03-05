import type { RangeType } from "@/types/analytics.types";
import type { ApiResponse } from "../../types/api.types";
import apiClient from "../axios.config";

export const analyticsAPI = {
  getAnalytics: async (range: RangeType) => {
    const response = await apiClient.get<ApiResponse<any>>(
      `/admin/stats?range=${range}`,
    );
    return response.data.result;
  },
};
