import { AppSpinner } from "@/components/AppSpinner";
import { TablePagination } from "@/components/TablePagination";
import { UserListTable } from "@/components/UserListTable";
import { useUser } from "@/hooks/useUser";

const UserListPage = () => {
  const { userList, isLoadingUserList } = useUser({ enabled: true });

  if (isLoadingUserList) return <AppSpinner />;

  const { result, total, hasNext, hasPrev } = userList;

  return (
    <div>
      <h1 className="font-medium text-xl text-card-foreground mb-8">
        User List
      </h1>
      <TablePagination total={total} hasNext={hasNext} hasPrev={hasPrev} />
      <div className="my-4">
        <UserListTable data={result} />
      </div>
      <TablePagination total={total} hasNext={hasNext} hasPrev={hasPrev} />
    </div>
  );
};

export default UserListPage;
