"use client"

import React, { useEffect, useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowDownToLine, ThumbsDown, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ButtonFilter } from "./ButtonFilter"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { HoverCard } from "@radix-ui/react-hover-card"
import { HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import ModalDetail from "./ModalDetail"
import { exportReportsToCSV } from "./ExportFeedbacksToCSV"
import { mockReports } from "@/lib/data"

export type Reports = {
  reportDate: string
  users: string
  assistants: string
  questions: string
  feedback: "Like" | "Dislike"
  descriptions: string
  response?: ResponseItem[];
}

export type ResponseItem = {
  title: string;
  description: string;
};

export const columns: ColumnDef<Reports>[] = [
  {
    accessorKey: "reportDate",
    header: "Report Date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("reportDate")}</div>
    ),
  },
  {
    accessorKey: "users",
    header: "Users",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("users")}</div>
    ),
  },
  {
    accessorKey: "questions",
    header: "Questions",
    cell: ({ row }) => (
      <>
        <HoverCard>
          <HoverCardTrigger><div className="capitalize md:max-w-[200px] xl:max-w-[400px] truncate">{row.getValue("questions")}</div></HoverCardTrigger>
          <HoverCardContent className="w-full">
            {row.getValue("questions")}
          </HoverCardContent>
        </HoverCard>
      </>
    ),
  },
  {
    accessorKey: "assistants",
    header: "Assistants",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("assistants")}</div>
    ),
  },
  {
    accessorKey: "feedback",
    header: "Feedback",
    cell: ({ row }) => {
      const feedback = row.original.feedback;
      return feedback === "Like" ? (
        <div className="flex items-center gap-2">
          <Avatar><AvatarFallback className="bg-green-200"><ThumbsUp size={16} className="text-green-600"/></AvatarFallback></Avatar>
          <div className="text-green-600 font-medium">{feedback}</div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Avatar><AvatarFallback className="bg-gray-200"><ThumbsDown size={16} className="text-gray-600"/></AvatarFallback></Avatar>
          <div className="text-gray-500 font-medium">{feedback}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "descriptions",
    header: "Descriptions",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("descriptions")}</div>
    ),
  },
]

// interface DataTableProps {
//   filterValues: {
//     assistance: string;
//     dateOption: string;
//   };
// }

export function DataTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState("")
  const [openDetail, setOpenDetail] = useState(false)
  const [selectedData, setSelectedData] = useState<Reports | undefined>()
  const [filterValues, setFilterValues] = useState<{ assistance: string; dateOption: string }>({
    assistance: "",
    dateOption: "today",
  });
  const dateLabelMap: Record<string, string> = {
    "today": "Today",
    "5days": "Last 5 days",
    "30days": "Last 30 days",
    "custom": "Custom date",
  };
  const data = mockReports

  useEffect(() => {
    // const filters: ColumnFiltersState = [];
    
    if (filterValues.assistance) {
      setColumnFilters([{ id: "assistants", value: filterValues.assistance }]);
    } else {
      setColumnFilters([]);
    }
  }, [filterValues]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const { users, questions } = row.original
      const searchValue = filterValue.toLowerCase()
      return (
        users.toLowerCase().includes(searchValue) ||
        questions.toLowerCase().includes(searchValue)
      )

      // ALL
      // const values = Object.values(row.original).join(" ").toLowerCase()
      // return values.includes(filterValue.toLowerCase())
    },
  })

  const { pageIndex, pageSize } = table.getState().pagination;
  const rowNoOffset = pageIndex * pageSize;

  const handleExport = () => {
    exportReportsToCSV(data, "report_table.csv");
    // const rows = table.getRowModel().rows.map(r => r.original);
    // exportReportsToCSV(rows, "report_table.csv");
  };

  return (
    <div className="w-full">
        <div className="flex justify-between pb-2 pt-1">
            <div>
              {/* <FilterModal/> */}
                <ButtonFilter onApply={setFilterValues}/>
            </div>
            <div className="flex flex-row gap-2 ml-2">
                {/* <Input
                    placeholder="Filter users..."
                    value={(table.getColumn("users")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("users")?.setFilterValue(event.target.value)
                    }
                    className="max-w-md rounded-full"
                /> */}
                <Input
                  placeholder="Search user or question..."
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="w-48 md:w-64 xl:w-100 rounded-full"
                />
  
                <Button variant={"outline"} onClick={handleExport}><ArrowDownToLine/>Download</Button>
            </div>
        </div>
        <p className="mb-2">
          {dateLabelMap[filterValues.dateOption] || filterValues.dateOption}
        </p>
        <div className="rounded-md border overscroll-x-contain">
          <Table className="min-w-[800px]">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  <TableHead>No.</TableHead>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => {
                      setSelectedData(row.original);
                      setOpenDetail(true);
                    }}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <TableCell>{rowNoOffset + index + 1}</TableCell>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <ModalDetail open={openDetail} onOpenChange={setOpenDetail} data={selectedData} />
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
    </div>
  )
}
