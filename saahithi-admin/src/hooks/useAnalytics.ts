import { analyticsAPI } from "@/api/endpoints/analytics.api";
import { useQuery } from "@tanstack/react-query";

export const useAnalytics = ({ enabled = false }: { enabled: boolean }) => {
  const {
    data: analytics,
    isLoading: isLoadingAnalytics,
    isFetching: isFetchingAnalytics,
  } = useQuery({
    queryKey: ["get_tags"],
    queryFn: analyticsAPI.getAnalytics,
    enabled: enabled,
  });

  return { analytics, isLoadingAnalytics, isFetchingAnalytics };
};
