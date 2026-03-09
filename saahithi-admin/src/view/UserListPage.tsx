import { AppSpinner } from "@/components/AppSpinner";
import { UserListTable } from "@/components/UserListTable";
import { useUser } from "@/hooks/useUser";

const UserListPage = () => {
  const { userList, isLoadingUserList } = useUser({ enabled: true });

  if (isLoadingUserList) return <AppSpinner />;

  const { result } = userList;

  return (
    <div>
      <h1 className="font-medium text-xl text-card-foreground mb-8">
        User List
      </h1>
      <UserListTable data={result} />
    </div>
  );
};

export default UserListPage;
