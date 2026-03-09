import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar } from "./Avatar";
import { useRelativeTime } from "@/utils/dateFormatter";
import { Card } from "./ui/card";

export function UserListTable({ data }: { data: any }) {
  return (
    <Card className="w-full py-4 ">
      <div className="px-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Membership</TableHead>
              <TableHead>Created/Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map(
              ({
                _id,
                email,
                firstName,
                lastName,
                role,
                isPremium,
                status,
                avatarPublicId,
                createdAt,
                updatedAt,
              }: {
                _id: string;
                email: string;
                firstName: any;
                lastName: string;
                role: string;
                isPremium: string;
                status: string;
                avatarPublicId: string;
                createdAt: string;
                updatedAt: string;
              }) => {
                return (
                  <TableRow key={_id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-x-2">
                        <Avatar />
                        <div>
                          <p className="font-light text-base text-gray-500 leading-tight">
                            {`${firstName} ${lastName ?? ""}`}
                          </p>
                          <p className="font-light text-xs text-gray-500 leading-tight">
                            {email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{role}</TableCell>
                    <TableCell className="font-medium">{status}</TableCell>
                    <TableCell className="font-medium">
                      {isPremium ? "Premium" : "Regular"}
                    </TableCell>
                    <TableCell className="font-medium">
                      <p>{`Created: ${useRelativeTime(createdAt)}`}</p>
                      <p>{`Updated: ${useRelativeTime(updatedAt)}`}</p>
                    </TableCell>
                    <TableCell className="font-medium">Edit / view</TableCell>
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
