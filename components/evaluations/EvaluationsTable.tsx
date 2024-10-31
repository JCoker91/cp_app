'use client';

import React from "react";
import { useContext } from "react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { User } from "@nextui-org/user";
import { Chip, ChipProps } from "@nextui-org/chip";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { VerticalDotsIcon, SearchIcon, ChevronDownIcon, PlusIcon  } from "../icons";
import { Selection, SortDescriptor } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Evaluation } from "@/types";
import { Pagination } from "@nextui-org/pagination";
import { SelectedEvaluationContext } from "@/state/state";


function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

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
    {name: "Class", uid: "className", sortable: true},
    {name: "Date", uid: "evaluationDate", sortable: true},
    {name: "Evaluator", uid: "evaluatorName", sortable: true},
    {name: "Status", uid: "status", sortable: true },
    {name: "Actions", uid: "actions"},
];
  

const DATE_RANGES = [
    {
        name: "All",
        uid: "all",
    },
    {
        name: "This Week",
        uid: "thisWeek",
    },
    {
        name: "Last Week",
        uid: "lastWeek",
    },
    {
        name: "This Month",
        uid: "thisMonth",
    },
    {
        name: "Last 3 Months",
        uid: "lastThreeMonths",
    },
    {
        name: "Last 6 Months",
        uid: "lastSixMonths",
    },
    {
        name: "Last 12 Months",
        uid: "lastTwelveMonths",
    },
];



  function getEvaluationMonthAndYear(evaluationDate: string): [number, number]{
    const date = new Date(Date.parse(evaluationDate));
    return [date.getMonth(), date.getFullYear()];
  }
  
  function getMonthRange(monthsBack: number) : [number,number][] {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    let month = currentMonth;
    let year = currentYear;
    const monthRange : [number,number][] = [];
    for (let i = 0; i < monthsBack; i++) {
      monthRange.push([month, year]);
      month--;
      if (month < 0) {
        month = 11;
        year--;
      }
    }
    return monthRange;
  }
  
  function getWeekDateRange(week: string = "thisWeek"): [string, string] {
    const today = new Date();
  
    if (week === "lastWeek") {
        today.setDate(today.getDate() - 7);
    }
  
    const first = today.getDate() - today.getDay();
    const last = first + 6;
  
    today.setHours(0,0,0);
    const firstDay = new Date(today.setDate(first)).toString();
    today.setHours(23,59,0);
    const lastDay = new Date(today.setDate(last)).toString();
  
    return [firstDay, lastDay];
  }


export default function EvaluationsTable(
    {evaluations,}: 
    {evaluations: Evaluation[];}
) {
    const [page, setPage] = React.useState(1);
    const [filterValue, setFilterValue] = React.useState("");
    const hasSearchFilter = Boolean(filterValue);
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selectedEvaluation, setSelectedEvaluation] = React.useState<Evaluation | null>(null);
    const {selectedKeys, setSelectedKeys} = useContext(SelectedEvaluationContext);
    const [dateRange, setDateRange] = React.useState<string>("all");
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "evaluationDate",
        direction: "descending",
      });
  
      const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
      }, []);


      const renderCell = React.useCallback((evaluation: Evaluation, columnKey: React.Key) => {
        const cellValue = evaluation[columnKey as keyof Evaluation];
        switch (columnKey) {
          case "primaryTeacherName":
            return (
              <User
                avatarProps={{radius: "lg", src: evaluation.primaryTeacherAvatar}}
                description={evaluation.primaryTeacherEmail}
                name={evaluation.primaryTeacherName}
              >
                {evaluation.primaryTeacherName}
              </User>
            );
          case "className":
            return (
              <div className="flex flex-col">
                <p className="text-bold text-tiny capitalize text-default-400">{evaluation.className}</p>
              </div>
            );
          case "evaluationDate":
            return (
              <div className="flex flex-col">
                <p className="text-bold text-tiny capitalize text-default-400">{evaluation.evaluationDate}</p>
              </div>
            );
          case "evaluatorName":
            return (
              <div className="flex flex-col">
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
                  <DropdownMenu
                    onAction={(key) => alert(key)}
                  >
                    <DropdownItem key="view">View</DropdownItem>
                    <DropdownItem key="edit">Edit</DropdownItem>
                    <DropdownItem key="delete">Delete</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            );
          default:
            return cellValue;
        }
      }, []);

      const filteredItems = React.useMemo(() => {
        let _filteredEvaluations = [...evaluations];
        setSelectedEvaluation(null);
        if (hasSearchFilter) {
          _filteredEvaluations = _filteredEvaluations.filter((evaluation) =>
            evaluation.primaryTeacherName.toLowerCase().includes(filterValue.toLowerCase()),
          );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
          _filteredEvaluations = _filteredEvaluations.filter((evaluation) =>
            Array.from(statusFilter).includes(evaluation.status),
          );
        }
  
        if (dateRange !== ("all")) {
          const [firstWeekFirstDay, firstWeekLastDay] = getWeekDateRange("thisWeek");
          const [lastWeekFirstDay, lastWeekLastDay] = getWeekDateRange("lastWeek");
  
          _filteredEvaluations = _filteredEvaluations.filter((evaluation) => {
            const [evalMonth, evalYear] = getEvaluationMonthAndYear(evaluation.evaluationDate);
  
            return (dateRange === "all")
            || ((dateRange === "thisWeek") && (Date.parse(evaluation.evaluationDate) >= Date.parse(firstWeekFirstDay)) && (Date.parse(evaluation.evaluationDate) <= Date.parse(firstWeekLastDay)))          
            || ((dateRange === "lastWeek") && (Date.parse(evaluation.evaluationDate) >= Date.parse(lastWeekFirstDay)) && (Date.parse(evaluation.evaluationDate) <= Date.parse(lastWeekLastDay)))                    
            || ((dateRange === "thisMonth") && (getMonthRange(1).some(([month, year]) => month === evalMonth && year === evalYear)))
            || ((dateRange === "lastThreeMonths") && (getMonthRange(3).some(([month, year]) => month === evalMonth && year === evalYear)))
            || ((dateRange === "lastSixMonths") && (getMonthRange(6).some(([month, year]) => month === evalMonth && year === evalYear)))
            || ((dateRange === "lastTwelveMonths") && (getMonthRange(12).some(([month, year]) => month === evalMonth && year === evalYear)));
          }        
        );
        setPage(1);
      }
        return _filteredEvaluations.sort((a: Evaluation,b: Evaluation) => {return new Date(`${a.evaluationDate} ${a.evaluationTime}`) < new Date(`${b.evaluationDate} ${b.evaluationTime}`) ? 1 : -1;});
      }, [evaluations, filterValue, statusFilter, dateRange, selectedEvaluation]);



      const pages = Math.ceil(filteredItems.length / rowsPerPage);

      const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return filteredItems.slice(start, end);
      }, [page, filteredItems, rowsPerPage]);

      const onClear = React.useCallback(()=>{
        setFilterValue("")
        setPage(1)
      },[])

      const onNextPage = React.useCallback(() => {
        if (page < pages) {
          setPage(page + 1);
        }
      }, [page, pages]);
    
      const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
          setPage(page - 1);
        }
      }, [page]);
  

      const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
          setFilterValue(value);
          setPage(1);
        } else {
          setFilterValue("");
        }
      }, []);


      const sortedItems = React.useMemo(() => {
        console.log(selectedKeys);
        return [...items].sort((a: Evaluation, b: Evaluation) => {
          const first = a[sortDescriptor.column as keyof Evaluation];
          const second = b[sortDescriptor.column as keyof Evaluation];
          const cmp = first < second ? -1 : first > second ? 1 : 0;
    
          return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
      }, [sortDescriptor, items]);

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
                onClear={() => onClear()}
                onValueChange={onSearchChange}
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
                      Date Range
                      <p className="text-default-400 text-small">{DATE_RANGES.filter((dr) => dr.uid === dateRange)[0]?.name || "Not found"}</p>                    
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Date Range"
                    closeOnSelect={true}
                    selectionMode="single"
                    onAction={(key) => setDateRange(key.toString())}
                  >
                    {DATE_RANGES.map((column) => (
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
              <span className="text-default-400 text-small">Total {filteredItems.length} evaluations</span>
              <label className="flex items-center text-default-400 text-small">
                Rows per page:
                <select
                  className="bg-transparent outline-none text-default-400 text-small"
                  onChange={onRowsPerPageChange}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </label>
            </div>
          </div>
        );
      }, [
        filterValue,
        statusFilter,
        onSearchChange,
        dateRange,
        onRowsPerPageChange,
        filteredItems.length,
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
              <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                Previous
              </Button>
              <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                Next
              </Button>
            </div>
          </div>
        );
      }, [selectedKeys, sortedItems.length, page, pages, hasSearchFilter]);


return (
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
    >
        <TableHeader columns={columns}>
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
                {(columnKey) => <TableCell
                    >
                      {renderCell(item, columnKey)}
                      </TableCell>}
                </TableRow>
            )}
        </TableBody>
    </Table>  
    );
}