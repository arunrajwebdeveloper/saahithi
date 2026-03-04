import { analyticsAPI } from "@/api/endpoints/analytics.api";
import { useQuery } from "@tanstack/react-query";

const GET_ANALYTICS = "GET_ANALYTICS";

export const useAnalytics = ({ enabled = false }: { enabled: boolean }) => {
  const {
    data: analytics,
    isLoading: isLoadingAnalytics,
    isFetching: isFetchingAnalytics,
  } = useQuery({
    queryKey: [GET_ANALYTICS],
    queryFn: analyticsAPI.getAnalytics,
    enabled: enabled,
  });

  return { analytics, isLoadingAnalytics, isFetchingAnalytics };
};
