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
                    <span>{author?.name}</span>
                  </div>
                </TableCell>
                <TableCell>{`${postCount} posts`}</TableCell>
              </TableRow>
            );
          },
        )}
      </TableBody>
    </Table>
  );
}
