import { dashboardAPI } from "@/api/endpoints/dashboard.api";
import { GET_USER_LIST } from "@/constants/dashboard.constants";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useUser = ({ enabled = false }: { enabled: boolean }) => {
  const [searchParams] = useSearchParams();

  const query = {
    page: searchParams.get("page") || "1",
    limit: searchParams.get("limit") || "10",
  };

  const {
    data: userList,
    isLoading: isLoadingUserList,
    isFetching: isFetchingUserList,
  } = useQuery({
    queryKey: [GET_USER_LIST, query],
    queryFn: () => dashboardAPI.getUserList(query),
    enabled: enabled,
    placeholderData: (previousData) => previousData,
  });

  return {
    userList,
    isLoadingUserList,
    isFetchingUserList,
  };
};
