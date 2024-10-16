"use client";

import { title } from "@/components/primitives";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";

export default function StaffPage() {
  return (
      <Table 
        aria-label="Example static collection table"
        >
        <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Role</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Last Evaluation</TableColumn>
            <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No staff created yet."}>
          {[]}
        </TableBody>
      </Table>
  );
}