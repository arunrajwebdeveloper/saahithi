import { useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const getPaginationRange = (current: number, total: number) => {
  const delta = 1;
  const range = [];
  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    range.push(i);
  }
  if (current - delta > 2) range.unshift("...");
  if (current + delta < total - 1) range.push("...");
  range.unshift(1);
  if (total > 1) range.push(total);
  return range;
};

export function TablePagination({ total, hasNext, hasPrev }: any) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const totalPages = Math.ceil(total / limit);

  const updateUrl = (params: { page?: number; limit?: string }) => {
    if (params.page) searchParams.set("page", params.page.toString());
    if (params.limit) {
      searchParams.set("limit", params.limit);
      searchParams.set("page", "1");
    }
    setSearchParams(searchParams);
  };

  const pages = getPaginationRange(currentPage, totalPages);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 w-full bg-card rounded-xl">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Rows per page</span>
        <Select
          value={limit.toString()}
          onValueChange={(value) => updateUrl({ limit: value as string })}
        >
          <SelectTrigger>
            <SelectValue placeholder={limit} />
          </SelectTrigger>
          <SelectContent side="top">
            {["10", "20", "50", "100"].map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => updateUrl({ page: 1 })}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>

            <PaginationItem>
              <Button
                className="cursor-pointer"
                variant="ghost"
                size="lg"
                onClick={() => hasPrev && updateUrl({ page: currentPage - 1 })}
                disabled={!hasPrev}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:block">Previous</span>
              </Button>
            </PaginationItem>

            {pages.map((page, idx) => (
              <PaginationItem key={idx}>
                {page === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    className="cursor-pointer"
                    isActive={currentPage === page}
                    onClick={() => updateUrl({ page: Number(page) })}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <Button
                className="cursor-pointer"
                variant="ghost"
                size="lg"
                onClick={() => hasNext && updateUrl({ page: currentPage + 1 })}
                disabled={!hasNext}
              >
                <span className="hidden sm:block">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </PaginationItem>

            <PaginationItem>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => updateUrl({ page: totalPages })}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
