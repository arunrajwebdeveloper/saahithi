import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Avatar } from "./Avatar";
import { BadgeCustom } from "./BadgeCustom";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function ActiveAuthorTableSummary({ data }: { data: any }) {
  return (
    <Card className="w-full py-4 ">
      <CardHeader>
        <CardTitle> Most Active Authors</CardTitle>
        <CardDescription>
          Top contributors ranked by total published content volume
        </CardDescription>
      </CardHeader>
      <div className="px-4">
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
                        <BadgeCustom content={`${postCount} posts`} />
                      </p>
                    </TableCell>
                  </TableRow>
                );
              },
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
