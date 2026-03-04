import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Avatar } from "./Avatar";

export function ActiveAuthorTableLayout({ data }: { data: any }) {
  return (
    <Table>
      <TableBody>
        {data?.map(
          ({
            postCount,
            author,
          }: {
            postCount: number;
            author: { id: string; name: string; email: string };
          }) => {
            return (
              <TableRow key={author?.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-x-2">
                    <Avatar />
                    <div>
                      <span>{author?.name}</span>
                      <p className="font-light text-xs text-gray-500 leading-tight">
                        {author?.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <p className="font-light text-xs text-end text-slate-600">
                    {`${postCount} posts`}
                  </p>
                </TableCell>
              </TableRow>
            );
          },
        )}
      </TableBody>
    </Table>
  );
}
