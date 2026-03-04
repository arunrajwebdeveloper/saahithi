import { analyticsAPI } from "@/api/endpoints/analytics.api";
import {
  GET_ANALYTICS,
  GET_OVERALL_PROGRESS,
} from "@/constants/analytics.constants";
import { RangeType } from "@/types/analytics.types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useAnalytics = ({ enabled = false }: { enabled: boolean }) => {
  const [range, setRange] = useState<RangeType>(RangeType.MONTH);

  const onChangeRange = (range: RangeType) => {
    setRange(range);
  };

  const {
    data: analytics,
    isLoading: isLoadingAnalytics,
    isFetching: isFetchingAnalytics,
  } = useQuery({
    queryKey: [GET_ANALYTICS],
    queryFn: analyticsAPI.getAnalytics,
    enabled: enabled,
  });

  const {
    data: overallProgress,
    isLoading: isLoadingOverallProgress,
    isFetching: isFetchingOverallProgress,
  } = useQuery({
    queryKey: [GET_OVERALL_PROGRESS, range],
    queryFn: () => analyticsAPI.getOverallProgress(range),
    enabled: enabled && !!range,
  });

  return {
    analytics,
    overallProgress,
    isLoadingDashboard: isLoadingAnalytics,
    isLoadingOverallProgress,
    isFetchingAnalytics,
    isFetchingOverallProgress,
    range,
    onChangeRange,
  };
};
