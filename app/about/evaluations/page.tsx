"use client";

import React from "react";
import { title } from "@/components/primitives";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";
import { VerticalDotsIcon } from "@/components/icons"; 

const statusColorMap = {
  complete: "success",
  pending: "danger",
  scheduled: "warning",
};

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];

const columns = [
  {name: "Teacher", uid: "teacher", sortable: true},
  {name: "Class", uid: "class", sortable: true},
  {name: "Date", uid: "date", sortable: true},
  {name: "Evaluator", uid: "evaluator", sortable: true},
  {name: "Status", uid: "status"},
  {name: "Actions", uid: "actions"},
];

const evaluations = [
  {
    id: "1",
    teacher: "John Doe",
    class: "Math 101",
    date: new Date(),
    evaluator: "Jane Doe",
    status: "complete",
  },
  {
    id: "2",
    teacher: "Jane Doe",
    class: "English 101",
    date: new Date(),
    evaluator: "John Doe",
    status: "pending",
  },
  {
    id: "3",
    teacher: "John Doe",
    class: "Math 101",
    date: new Date(),
    evaluator: "Jane Doe",
    status: "scheduled",
  },
];

const INITIAL_VISIBLE_COLUMNS = ["teacher", "class", "date", "evaluator", "status", "actions"];

export default function EvaluationsPage() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "Date",
    direction: "descending",
  });

  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
      // if (visibleColumns === "all") return columns;

      return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
      let filteredEvaluations = [...evaluations];
  
      if (hasSearchFilter) {
        filteredEvaluations = filteredEvaluations.filter((evaluation) =>
          evaluation.teacher.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }
      if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
        filteredEvaluations = filteredEvaluations.filter((evaluation) =>
          Array.from(statusFilter).includes(evaluation.status),
        );
      }
  
      return filteredEvaluations;
    }, [evaluations, filterValue, statusFilter]);


  return (
      <Table aria-label="Example static collection table">
        <TableHeader>
            <TableColumn>Teacher</TableColumn>
            <TableColumn>Class</TableColumn>
            <TableColumn>Date</TableColumn>
            <TableColumn>Evaluator</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Evaluations created yet."}>
          {[]}
        </TableBody>
      </Table>
  );
}