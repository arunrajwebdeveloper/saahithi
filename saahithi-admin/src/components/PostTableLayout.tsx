import {
  Table,
  TableBody,
  TableCell,
  // TableHead,
  // TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar } from "./Avatar";
import { useRelativeTime } from "@/utils/dateFormatter";

export function PostTableLayout({ data }: { data: any }) {
  return (
    <Table>
      {/* <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Total Posts</TableHead>
        </TableRow>
      </TableHeader> */}
      <TableBody>
        {data?.map(
          ({
            _id,
            title,
            author,
            createdAt,
          }: {
            _id: string;
            title: string;
            author: any;
            createdAt: string;
          }) => {
            const { firstName, lastName } = author;

            return (
              <TableRow key={_id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-x-2">
                    <Avatar />
                    <div>
                      <span>{title}</span>
                      <p className="font-light text-xs text-gray-500 leading-tight">
                        {`By ${firstName} ${lastName ?? ""}`}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <p className="font-light text-xs text-end text-slate-600">
                    {useRelativeTime(createdAt)}
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
