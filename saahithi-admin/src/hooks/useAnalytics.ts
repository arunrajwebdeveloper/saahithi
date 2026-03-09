import { dashboardAPI } from "@/api/endpoints/dashboard.api";
import { GET_ANALYTICS } from "@/constants/dashboard.constants";
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
    queryFn: () => dashboardAPI.getAnalytics(range),
    enabled: enabled && !!range,
  });

  return {
    range,
    analytics,
    isLoadingDashboard: isLoadingAnalytics,
    isFetchingAnalytics,
  };
};
