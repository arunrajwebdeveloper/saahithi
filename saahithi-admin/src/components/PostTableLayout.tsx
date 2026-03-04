import {
  Table,
  TableBody,
  TableCell,
  // TableHead,
  // TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar } from "./Avatar";

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
          }: {
            _id: string;
            title: string;
            author: any;
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
              </TableRow>
            );
          },
        )}
      </TableBody>
    </Table>
  );
}
