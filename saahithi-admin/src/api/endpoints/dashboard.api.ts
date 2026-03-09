import type { RangeType } from "@/types/dashboard.types";
import type { ApiResponse } from "../../types/api.types";
import apiClient from "../axios.config";

export const dashboardAPI = {
  getAnalytics: async (range: RangeType) => {
    const response = await apiClient.get<ApiResponse<any>>(
      `/admin/stats?range=${range}`,
    );
    return response.data.result;
  },
  getContentList: async () => {
    const response =
      await apiClient.get<ApiResponse<any>>(`/admin/content-list`);
    return response.data.result;
  },
  getUserList: async () => {
    const response = await apiClient.get<ApiResponse<any>>(`/admin/user-list`);
    return response.data.result;
  },
};
