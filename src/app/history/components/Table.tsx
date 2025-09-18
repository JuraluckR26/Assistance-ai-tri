"use client"
import React, { useState } from "react"
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
import { ArrowDownToLine, ArrowUpDown, ChevronDown, MoreHorizontal, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ResponseHistory } from "@/types/history.type"
import { ButtonFilter } from "./ButtonFilter"
import { exportReportsToCSV } from "./ExportFeedbacksToCSV"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// const data: Payment[] = [
//   {
//     id: "m5gr84i9",
//     amount: 316,
//     status: "success",
//     email: "ken99@example.com",
//   },
//   {
//     id: "3u1reuv4",
//     amount: 242,
//     status: "success",
//     email: "Abe45@example.com",
//   },
//   {
//     id: "derv1ws0",
//     amount: 837,
//     status: "processing",
//     email: "Monserrat44@example.com",
//   },
//   {
//     id: "5kma53ae",
//     amount: 874,
//     status: "success",
//     email: "Silas22@example.com",
//   },
//   {
//     id: "bhqecj4p",
//     amount: 721,
//     status: "failed",
//     email: "carmella@example.com",
//   },
// ]

export type Reports = {
  reportDate: string
  users: string
  assistants: string
  questions: string
  feedback: "Like" | "Dislike" | "No feedback"
  descriptions: string
  response?: ResponseItem[];
}

export type ResponseItem = {
  title: string;
  description: string;
};

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Reports>[] = [
  {
    accessorKey: "reportDate",
    header: "Report Date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("reportDate")}</div>
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
    accessorKey: "users",
    header: "Users",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("users")}</div>
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
      ) : feedback === "Dislike" ? (
        <div className="flex items-center gap-2">
          <Avatar><AvatarFallback className="bg-red-200"><ThumbsDown size={16} className="text-red-600"/></AvatarFallback></Avatar>
          <div className="text-red-600 font-medium">{feedback}</div>
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
// Function to convert ResponseHistory to Reports array
const convertHistoryToReports = (historyData: ResponseHistory | null): Reports[] => {
  if (!historyData || !historyData.result_history) {
    return [];
  }

  return historyData.result_history.map((item) => ({
    reportDate: new Date(item.createdDate).toLocaleDateString('th-TH'),
    users: item.createdBy || item.loginId || '-',
    assistants: item.assistantName || '-',
    questions: item.searchText || '-',
    feedback: item.feedback === 'Like' ? 'Like' : item.feedback === 'Dislike' ? 'Dislike' : 'No feedback',
    descriptions: item.resultText || item.feedbackDetail || '-',
    response: item.aiResult ? [{ title: 'AI Response', description: item.aiResult }] : undefined
  }));
};

export function DataTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [historyData, setHistoryData] = useState<ResponseHistory | null>(null);
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
  
  // Convert history data to table format
  const data = convertHistoryToReports(historyData);
  console.log('History data:', historyData);
  console.log('Converted data:', data);

  const handleHistoryData = (data: ResponseHistory | null) => {
    setHistoryData(data);
  };

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
    },
  })

  const handleExport = () => {
    const rows = table.getRowModel().rows.map(r => r.original);
    exportReportsToCSV(rows, "report_table.csv");
  };

  return (
    <div className="w-full">
      <div className="flex justify-between pb-2 pt-1">
        <div>
          <ButtonFilter 
            onApply={setFilterValues} 
            onHistoryData={handleHistoryData}
          />
        </div>
        <div className="flex flex-row gap-2 ml-2">
          <Input
            placeholder="Filter questions..."
            value={(table.getColumn("questions")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("questions")?.setFilterValue(event.target.value)
            }
            className="w-48 md:w-64 xl:w-100 rounded-full"
          />
          <Button variant={"outline"} onClick={handleExport}><ArrowDownToLine/>Download</Button>
        </div>
        
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      <p className="mb-2">
          {dateLabelMap[filterValues.dateOption] || filterValues.dateOption}
      </p>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
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
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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