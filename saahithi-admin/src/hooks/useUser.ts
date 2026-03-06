import { dashboardAPI } from "@/api/endpoints/dashboard.api";
import { GET_USER_LIST } from "@/constants/dashboard.constants";
import { useQuery } from "@tanstack/react-query";

export const useUser = ({ enabled = false }: { enabled: boolean }) => {
  const {
    data: userList,
    isLoading: isLoadingUserList,
    isFetching: isFetchingUserList,
  } = useQuery({
    queryKey: [GET_USER_LIST],
    queryFn: dashboardAPI.getUserList,
    enabled: enabled,
  });

  return {
    userList,
    isLoadingUserList,
    isFetchingUserList,
  };
};
