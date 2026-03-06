import { AppSpinner } from "@/components/AppSpinner";
import { ContentListTable } from "@/components/ContentListTable";
import { useContent } from "@/hooks/useContent";

const ContentListPage = () => {
  const { contentList, isLoadingContentList } = useContent({ enabled: true });

  if (isLoadingContentList) return <AppSpinner />;

  const { result } = contentList;

  return (
    <div>
      <h1 className="font-medium text-xl text-card-foreground mb-8">
        Content List
      </h1>
      <ContentListTable data={result} />
    </div>
  );
};

export default ContentListPage;
