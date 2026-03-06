import { analyticsAPI } from "@/api/endpoints/analytics.api";
import { GET_ANALYTICS } from "@/constants/analytics.constants";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "./hooks";

export const useAnalytics = ({ enabled = false }: { enabled: boolean }) => {
  const { range } = useAppSelector((state: any) => state.dashboard);

  const {
    data: analytics,
    isLoading: isLoadingAnalytics,
    isFetching: isFetchingAnalytics,
  } = useQuery({
    queryKey: [GET_ANALYTICS, range],
    queryFn: () => analyticsAPI.getAnalytics(range),
    enabled: enabled && !!range,
  });

  return {
    range,
    analytics,
    isLoadingDashboard: isLoadingAnalytics,
    isFetchingAnalytics,
  };
};
