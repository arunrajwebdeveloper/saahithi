import { dashboardAPI } from "@/api/endpoints/dashboard.api";
import { GET_CONTENT_LIST } from "@/constants/dashboard.constants";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useContent = ({ enabled = false }: { enabled: boolean }) => {
  const [searchParams] = useSearchParams();

  const query = {
    page: searchParams.get("page") || "1",
    limit: searchParams.get("limit") || "10",
  };

  const {
    data: contentList,
    isLoading: isLoadingContentList,
    isFetching: isFetchingContentList,
  } = useQuery({
    queryKey: [GET_CONTENT_LIST, query],
    queryFn: () => dashboardAPI.getContentList(query),
    enabled: enabled,
    placeholderData: (previousData) => previousData,
  });

  return {
    contentList,
    isLoadingContentList,
    isFetchingContentList,
  };
};
