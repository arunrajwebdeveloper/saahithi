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
  getContentList: async ({ page, limit }: { page: string; limit: string }) => {
    const response = await apiClient.get<ApiResponse<any>>(
      `/admin/content-list?page=${page}&limit=${limit}`,
    );
    return response.data.result;
  },
  getUserList: async ({ page, limit }: { page: string; limit: string }) => {
    const response = await apiClient.get<ApiResponse<any>>(
      `/admin/user-list?page=${page}&limit=${limit}`,
    );
    return response.data.result;
  },
};
