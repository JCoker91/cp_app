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

export default function ClassesPage() {
  return (
      <Table aria-label="Example static collection table">
        <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Teacher</TableColumn>
            <TableColumn>Subject</TableColumn>
            <TableColumn>Grade</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Classes created yet."}>
          {[]}
        </TableBody>
      </Table>
  );
}