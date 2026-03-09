import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar } from "./Avatar";
import { Card } from "./ui/card";
import { TimeDisplay } from "./TimeDisplay";

export function ContentListTable({ data }: { data: any }) {
  return (
    <Card className="w-full py-4">
      <div className="px-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created/Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map(
              ({
                _id,
                title,
                author,
                slug,
                category,
                isPublished,
                isTrashed,
                imageRegistry,
                updatedAt,
                createdAt,
              }: {
                _id: string;
                title: string;
                author: any;
                slug: string;
                category: string;
                isPublished: string;
                isTrashed: string;
                imageRegistry: string;
                updatedAt: string;
                createdAt: string;
              }) => {
                const {
                  firstName,
                  lastName,
                  email,
                  avatarPublicId,
                  isPremium,
                } = author;

                return (
                  <TableRow key={_id}>
                    <TableCell className="font-medium">{title}</TableCell>
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
                    <TableCell className="font-medium">{category}</TableCell>
                    <TableCell className="font-medium">
                      {isPublished ? "Published" : "Drafted"}
                    </TableCell>
                    <TableCell className="font-medium">
                      <TimeDisplay date={createdAt} prefix="Created:" />
                      <TimeDisplay date={updatedAt} prefix="Updated:" />
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
