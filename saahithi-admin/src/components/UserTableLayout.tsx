import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Avatar } from "./Avatar";
import { useRelativeTime } from "@/utils/dateFormatter";
import { BadgeCustom } from "./BadgeCustom";

export function UserTableLayout({ data }: { data: any }) {
  return (
    <Table>
      <TableBody>
        {data?.map(
          ({
            _id,
            email,
            firstName,
            lastName,
            createdAt,
          }: {
            _id: string;
            email: string;
            firstName: string;
            lastName: string;
            createdAt: string;
          }) => {
            return (
              <TableRow key={_id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-x-2">
                    <Avatar />
                    <div>
                      <span>{`${firstName} ${lastName ?? ""}`}</span>
                      <p className="font-light text-xs text-gray-500 leading-tight">
                        {email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <p className="font-light text-xs text-end text-slate-600">
                    <BadgeCustom content={useRelativeTime(createdAt)} />
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
