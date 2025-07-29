"use client"

import * as React from "react"
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
import { ArrowDownToLine, ArrowUpDown, FileDown, MoreHorizontal, ThumbsDown, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
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
import { ButtonFilter } from "./ButtonFilter"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { HoverCard } from "@radix-ui/react-hover-card"
import { HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

const data: Payment[] = [
  {
    reportDate: "5 มิถุนายน 2568 เวลา 08:30",
    users: "Usernam1",
    questions: "อะไหล่รถกระบะ",
    assistants: "AI Search PMG",
    feedback: "Like",
    descriptions: "-",
  },
  {
    reportDate: "9 มิถุนายน 2568 เวลา 10:45",
    users: "Usernam3",
    questions: "อะไหล่รถยนต์",
    assistants: "IT10 Service desk assistant",
    feedback: "Like",
    descriptions: "-",
  },
  {
    reportDate: "9 มิถุนายน 2568 เวลา 11:11",
    users: "Usernam2",
    questions: "learn d คือระบบอะไร",
    assistants: "AI Search PMG",
    feedback: "Dislike",
    descriptions: "คำตอบยังไม่สมบูรณ์",
  },
  {
    reportDate: "10 มิถุนายน 2568 เวลา 08:35",
    users: "Usernam12",
    questions: "น้ำมันเกียร์ 75W-80 ใช้กับรถรุ่น dadsadsadsa",
    assistants: "GIS assistant",
    feedback: "Dislike",
    descriptions: "อื่นๆ",
  },
  {
    reportDate: "11 มิถุนายน 2568 เวลา 10:30",
    users: "Usernam5",
    questions: "เข้าใช้งาน Mirai ไม่ได้",
    assistants: "MiRai Service desk assistant-new",
    feedback: "Dislike",
    descriptions: "ข้อมูลไม่ถูกต้อง",
  },
]

export type Payment = {
  reportDate: string
  users: string
  questions: string
  assistants: string
  feedback: "Like" | "Dislike"
  descriptions: string
}

export const columns: ColumnDef<Payment>[] = [
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

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState("")

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

  return (
    <div className="w-full">
        <div className="flex justify-between pb-2 pt-1">
            <div>
              {/* <FilterModal/> */}
                <ButtonFilter/>
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
  
                <Button variant={"outline"}><ArrowDownToLine/>Download</Button>
            </div>
        </div>
        <p className="mb-2">Today</p>
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
                  >
                    <TableCell>{index+1}</TableCell>
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
