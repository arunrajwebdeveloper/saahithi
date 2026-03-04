import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar } from "./Avatar";

export function TableLayout() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Total Posts</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">
            <div className="flex items-center gap-x-2">
              <Avatar />
              <span>Wireless Mouse</span>
            </div>
          </TableCell>
          <TableCell>257</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            <div className="flex items-center gap-x-2">
              <Avatar />
              <span>Wireless Mouse</span>
            </div>
          </TableCell>
          <TableCell>129</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            <div className="flex items-center gap-x-2">
              <Avatar />
              <span>Wireless Mouse</span>
            </div>
          </TableCell>
          <TableCell>110</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
