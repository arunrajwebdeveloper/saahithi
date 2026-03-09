import { AppSpinner } from "@/components/AppSpinner";
import { ContentListTable } from "@/components/ContentListTable";
import { TablePagination } from "@/components/TablePagination";
import { useContent } from "@/hooks/useContent";

const ContentListPage = () => {
  const { contentList, isLoadingContentList } = useContent({ enabled: true });

  if (isLoadingContentList) return <AppSpinner />;

  const { result, total, hasNext, hasPrev } = contentList;

  return (
    <div>
      <h1 className="font-medium text-xl text-card-foreground mb-8">
        Content List
      </h1>
      <TablePagination total={total} hasNext={hasNext} hasPrev={hasPrev} />
      <div className="my-4">
        <ContentListTable data={result} />
      </div>
      <TablePagination total={total} hasNext={hasNext} hasPrev={hasPrev} />
    </div>
  );
};

export default ContentListPage;
