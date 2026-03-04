import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Avatar } from "./Avatar";

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
          }: {
            _id: string;
            email: string;
            firstName: string;
            lastName: string;
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
              </TableRow>
            );
          },
        )}
      </TableBody>
    </Table>
  );
}
