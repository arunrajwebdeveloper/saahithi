import { dashboardAPI } from "@/api/endpoints/dashboard.api";
import { GET_CONTENT_LIST } from "@/constants/dashboard.constants";
import { useQuery } from "@tanstack/react-query";

export const useContent = ({ enabled = false }: { enabled: boolean }) => {
  const {
    data: contentList,
    isLoading: isLoadingContentList,
    isFetching: isFetchingContentList,
  } = useQuery({
    queryKey: [GET_CONTENT_LIST],
    queryFn: dashboardAPI.getContentList,
    enabled: enabled,
  });

  return {
    contentList,
    isLoadingContentList,
    isFetchingContentList,
  };
};
