"use client";

import {Chip, ChipProps} from "@nextui-org/chip";
import { Evaluation } from "@/types";
import React from "react";
import { title } from "@/components/primitives";
import { Calendar} from "@nextui-org/calendar";
import {parseDate} from "@internationalized/date";
import { Card, CardHeader, Selection, SortDescriptor, Image, Divider, CardBody, CardFooter, Link, Spacer, Avatar } from "@nextui-org/react";
import type {DateValue} from "@react-types/calendar";
import { Button } from "@nextui-org/button";
import type { Key } from "@react-types/shared";
import { Input } from "@nextui-org/input";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import { Pagination } from "@nextui-org/pagination";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";
import { VerticalDotsIcon, ChevronDownIcon, SearchIcon, PlusIcon } from "@/components/icons"; 
import { time } from "console";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

let evalIndex = 0;
const statusColorMap: Record<string, ChipProps["color"]>= {
  complete: "success",
  pending: "danger",
  scheduled: "warning",
};

const statusOptions = [
  {name: "Complete", uid: "complete"},
  {name: "Pending", uid: "pending"},
  {name: "Scheduled", uid: "scheduled"},
];

const columns = [
  {name: "Teacher", uid: "primaryTeacherName", sortable: true},
  {name: "Class", uid: "class"},
  {name: "Date", uid: "date"},
  {name: "Evaluator", uid: "evaluator"},
  {name: "Status", uid: "status", sortable: true },
  {name: "Actions", uid: "actions"},
];

const scheduledEvaluations = [
  {
    date: "2024-10-17",
    teacher: "Natasha Romanoff",
    time: "9:05",
  },
  {
    date: "2024-10-17",
    teacher: "Peter Parker",
    time: "8:15",
  },
  {
    date: "2024-10-17",
    teacher: "Logan Howlett",
    time: "10:12",
  },
  {
    date: "2024-10-17",
    teacher: "Kate Bishop",
    time: "11:45",
  },
  {
    date: "2024-10-17",
    teacher: "Wade Wilson",
    time: "12:00",
  },
  {
    date: "2024-10-17",
    teacher: "Wanda Maximoff",
    time: "1:15",
  },
  {
    date: "2024-10-17",
    teacher: "Tony Stark",
    time: "2:37",
  },
  {
    date: "2024-10-17",
    teacher: "Carol Danvers",
    time: "3:00",
  },
  {
    date: "2024-10-17",
    teacher: "Jennifer Walters",
    time: "3:24",
  }
];


const evaluationsList: Evaluation[] = [
  {
    id: "1",
    primaryTeacherName: "Wade Wilson",
    primaryTeacherEmail: "wade.wilson@mail.com",
    primaryTeacherAvatar: "/avatars/wade.wilson.png",
    className: "Math 101",
    evaluatorName: "Nick Fury",
    status: "complete",
    evaluationDate: '2022-12-12',
    evaluationNotes: "Great teacher, very patient with students. Great teacher, very patient with students.Great teacher, very patient with students.Great teacher, very patient with students.Great teacher, very patient with students.Great teacher, very patient with students.",
    createdAt: '2022-12-12',
    updatedAt: '2022-12-12',
  },
  {
    id: "2",
    primaryTeacherName: "Peter Parker",
    primaryTeacherEmail: "peter.parker@mail.com",
    primaryTeacherAvatar: "/avatars/peter.parker.png",
    className: "Writing 121",
    evaluatorName: "Nick Fury",
    status: "pending",
    evaluationDate: '2022-12-12',
    evaluationNotes: "Bit Immature.",
    createdAt: '2022-12-12',
    updatedAt: '2022-12-12',
  },
  {
    id: "3",
    primaryTeacherName: "Tony Stark",
    primaryTeacherEmail: "tony.stark@mail.com",
    primaryTeacherAvatar: "/avatars/tony.stark.png",
    className: "Math 101",
    evaluatorName: "Nick Fury",
    status: "scheduled",
    evaluationDate: '2022-12-12',
    evaluationNotes: "Teacher keeps dodging my calls...",
    createdAt: '2022-12-12',
    updatedAt: '2022-12-12',
  },
  {
    id: "4",
    primaryTeacherName: "Logan Howlett",
    primaryTeacherEmail: "logan.howlett@mail.com",
    primaryTeacherAvatar: "/avatars/logan.howlett.png",
    className: "Math 101",
    evaluatorName: "Nick Fury",
    status: "scheduled",
    evaluationDate: '2022-12-12',
    evaluationNotes: "Teacher keeps dodging my calls...",
    createdAt: '2022-12-12',
    updatedAt: '2022-12-12',
  },
  {
    id: "5",
    primaryTeacherName: "Natasha Romanoff",
    primaryTeacherEmail: "natasha.romanoff@mail.com",
    primaryTeacherAvatar: "/avatars/natasha.romanoff.png",
    className: "Math 101",
    evaluatorName: "Nick Fury",
    status: "pending",
    evaluationDate: '2022-12-12',
    evaluationNotes: "Teacher keeps dodging my calls...",
    createdAt: '2022-12-12',
    updatedAt: '2022-12-12',
  },
  {
    id: "6",
    primaryTeacherName: "Kate Bishop",
    primaryTeacherEmail: "kate.bishop@mail.com",
    primaryTeacherAvatar: "/avatars/kate.bishop.png",
    className: "Math 101",
    evaluatorName: "Nick Fury",
    status: "complete",
    evaluationDate: '2022-12-12',
    evaluationNotes: "Teacher keeps dodging my calls...",
    createdAt: '2022-12-12',
    updatedAt: '2022-12-12',
  },
  {
    id: "7",
    primaryTeacherName: "Steve Rogers",
    primaryTeacherEmail: "steve.rogers@mail.com",
    primaryTeacherAvatar: "/avatars/steve.rogers.png",
    className: "Math 101",
    evaluatorName: "Nick Fury",
    status: "complete",
    evaluationDate: '2022-12-12',
    evaluationNotes: "Teacher keeps dodging my calls...",
    createdAt: '2022-12-12',
    updatedAt: '2022-12-12',
  },
  {
    id: "8",
    primaryTeacherName: "Wanda Maximoff",
    primaryTeacherEmail: "wanda.maximoff@mail.com",
    primaryTeacherAvatar: "/avatars/wanda.maximoff.png",
    className: "Math 101",
    evaluatorName: "Nick Fury",
    status: "scheduled",
    evaluationDate: '2022-12-12',
    evaluationNotes: "Teacher keeps dodging my calls...",
    createdAt: '2022-12-12',
    updatedAt: '2022-12-12',
  },
  {
    id: "9",
    primaryTeacherName: "Jennifer Walters",
    primaryTeacherEmail: "jennifer.walters@mail.com",
    primaryTeacherAvatar: "/avatars/jennifer.walters.png",
    className: "Math 101",
    evaluatorName: "Nick Fury",
    status: "pending",
    evaluationDate: '2022-12-12',
    evaluationNotes: "Teacher keeps dodging my calls...",
    createdAt: '2022-12-12',
    updatedAt: '2022-12-12',
  },
  {
    id: "10",
    primaryTeacherName: "Carol Danvers",
    primaryTeacherEmail: "carol.danvers@mail.com",
    primaryTeacherAvatar: "/avatars/carol.danvers.png",
    className: "Math 101",
    evaluatorName: "Nick Fury",
    status: "complete",
    evaluationDate: '2022-12-12',
    evaluationNotes: "Teacher keeps dodging my calls...",
    createdAt: '2022-12-12',
    updatedAt: '2022-12-12',
  },
];

const listCount = 10;
const evaluations: Evaluation[] = evaluationsList.slice(0,listCount);

const INITIAL_VISIBLE_COLUMNS = ["primaryTeacherName", "class", "date", "evaluator", "status", "actions"];

export default function EvaluationsPage() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedDate, setSelectedDate] = React.useState<DateValue>(parseDate("2024-10-17"));
  const [selectedEvaluation, setSelectedEvaluation] = React.useState<Evaluation | null>(null);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "date",
    direction: "descending",
  });

  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
      if (visibleColumns === "all") return columns;

      return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);


    const filteredItems = React.useMemo(() => {
      let filteredUsers = [...evaluations];
  
      if (hasSearchFilter) {
        filteredUsers = filteredUsers.filter((evaluation) =>
          evaluation.primaryTeacherName.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }
      if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
        filteredUsers = filteredUsers.filter((user) =>
          Array.from(statusFilter).includes(user.status),
        );
      }
  
      return filteredUsers;
    }, [evaluations, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
  
      return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
      return [...items].sort((a: Evaluation, b: Evaluation) => {
        const first = a[sortDescriptor.column as keyof Evaluation];
        const second = b[sortDescriptor.column as keyof Evaluation];
        const cmp = first < second ? -1 : first > second ? 1 : 0;
  
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((evaluation: Evaluation, columnKey: React.Key) => {
      const cellValue = evaluation[columnKey as keyof Evaluation];
      switch (columnKey) {
        case "teacher":
          return (
            <User
              avatarProps={{radius: "lg", src: evaluation.primaryTeacherAvatar}}
              description={evaluation.primaryTeacherEmail}
              name={evaluation.primaryTeacherName}
            >
              {evaluation.primaryTeacherName}
            </User>
          );
        case "class":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny capitalize text-default-400">{evaluation.className}</p>
            </div>
          );
        case "date":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny capitalize text-default-400">{evaluation.evaluationDate}</p>
            </div>
          );
        case "evaluator":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny capitalize text-default-400">{evaluation.evaluatorName}</p>
            </div>
          );
        case "status":
          return (
            <Chip className="capitalize" color={statusColorMap[evaluation.status]} size="sm" variant="flat">
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>View</DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    }, []);

    const topContent = React.useMemo(() => {
      return (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search by name..."
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => {}}
              onValueChange={()=>{}}
            />
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                    Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                >
                  {statusOptions.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">                  
                    Columns
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {columns.map((column) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {capitalize(column.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Button color="primary" endContent={<PlusIcon />}>
                Add New
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">Total {evaluations.length} evaluations</span>
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={()=>{}}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        </div>
      );
    }, [
      filterValue,
      statusFilter,
      visibleColumns,
      // onSearchChange,
      // onRowsPerPageChange,
      evaluations.length,
      hasSearchFilter,
    ]);
  
    const bottomContent = React.useMemo(() => {
      return (
        <div className="py-2 px-2 flex justify-between items-center">
          <span className="w-[30%] text-small text-default-400">
            {selectedKeys === "all"
              ? "All items selected"
              : `${selectedKeys.size} of ${filteredItems.length} selected`}
          </span>
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
          <div className="hidden sm:flex w-[30%] justify-end gap-2">
            <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={()=>{}}>
              Previous
            </Button>
            <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={()=>{}}>
              Next
            </Button>
          </div>
        </div>
      );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    let evaluationCardData = selectedKeys !== "all" && selectedKeys.size === 0 ? null : evaluations[Array.from(selectedKeys)[0] as number - 1];

    return (
      <div className="container flex justify-between gap-6">
         <div className="container flex flex-col w-auto justify-between ">
              <Calendar 
                aria-label="Date (Controlled)"
                value={selectedDate}
                onChange={setSelectedDate}
                className="w-full"
              />
              <Card className="max-w-[400px] grow">
              <CardHeader className="flex gap-3">
                <Image
                  alt="nextui logo"
                  height={40}
                  radius="sm"
                  src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                  width={40}
                />
                <div className="flex flex-col">
                  <p className="text-md">October 17th</p>
                  <p className="text-small text-default-500">scheduled evaluations</p>
                </div>
              </CardHeader>
              <Divider/>
              <CardBody className="justify-between overflow-y-scroll text-small max-h-[125px]">
              {
                scheduledEvaluations.map((evaluation) => (
                  
                  <div className="flex justify-between" key={evaluation.teacher}>
                    <p>{evaluation.teacher}</p>
                    <p>{evaluation.time}</p>
                  </div>
                  
                ))
              }
              </CardBody>
              <Divider/>
              <CardFooter 
                className="items-center justify-center"
              >
              <Button
                color="primary"
                
              >
                Schedule Evaluation
              </Button>
              </CardFooter>
            </Card>
         </div>
        {/* <Spacer
          x={24}
        /> */}
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky={true}
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "h-[382px] overflow-y-auto",
            td: "text-nowrap",
          }}
          defaultSelectedKeys={new Set()}
          
          
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}

          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSortChange={setSortDescriptor}
          // isCompact={true}
          // removeWrapper={true}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No evaluations found"} items={sortedItems}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>  
        <Card className="grow  min-w-[300px]">
              <CardHeader className="flex gap-3">
              <User
              avatarProps={{radius: "lg", src: evaluationCardData?.primaryTeacherAvatar}}
              description={evaluationCardData?.primaryTeacherEmail}
              name={evaluationCardData?.primaryTeacherName}
            >
              {evaluationCardData?.primaryTeacherName}
            </User>
              </CardHeader>
              <Divider/>
              <CardBody className=" px-4 gap-2">
                    <div>
                      <div className="flex justify-between">
                        <p>Date</p>
                        <p>{evaluationCardData?.evaluationDate}</p>
                      </div>
                      <Divider/>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <p>Time</p>
                        <p>8:00am</p>
                      </div>
                      <Divider/>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <p>Class</p>
                        <p>{evaluationCardData?.className}</p>
                      </div>
                      <Divider/>
                    </div>
                    <div>
                    <div className="flex justify-between">
                      <p>Evaluator</p>
                      <p>{evaluationCardData?.evaluatorName}</p>
                    </div>
                    <Divider/>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <p>Status</p>
                        <Chip className="capitalize" color={statusColorMap[evaluationCardData?.status ? evaluationCardData?.status : 1]} size="sm" variant="flat">
                          {evaluationCardData?.status}
                        </Chip>
                      </div>
                    <Divider/>
                    </div>
                    <div>
                      <div className="flex justify-center">
                        <p className="text-center">Notes</p>
                      </div>
                    </div>
                    <div className="overflow-y-auto max-h-[250px]">
                        <p className="text-start">{evaluationCardData?.evaluationNotes}</p>
                    </div>
              </CardBody>
              {/* <CardFooter 
                className="items-center justify-center"
              >
              <Button
                color="primary"
                
              >
                Schedule Evaluation
              </Button>
              </CardFooter> */}
            </Card> 
        </div>
    );
}