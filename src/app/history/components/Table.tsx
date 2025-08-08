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

const data: Reports[] = [
  {
    reportDate: "2 มิถุนายน 2568 เวลา 09:15",
    users: "Username7",
    questions: "อะไหล่รถกระบะ",
    assistants: "AI Search PMG",
    feedback: "Like",
    descriptions: "-"
  },
  {
    reportDate: "3 มิถุนายน 2568 เวลา 10:45",
    users: "Username14",
    questions: "ขอคู่มือการใช้งานรถ",
    assistants: "IT10 Service desk assistant",
    feedback: "Dislike",
    descriptions: "คำตอบยังไม่สมบูรณ์"
  },
  {
    reportDate: "4 มิถุนายน 2568 เวลา 13:20",
    users: "Username21",
    questions: "บริการรถยกฉุกเฉิน",
    assistants: "GIS assistant",
    feedback: "Like",
    descriptions: "-"
  },
  {
    reportDate: "5 มิถุนายน 2568 เวลา 08:30",
    users: "Username3",
    questions: "การเคลมประกันภัย",
    assistants: "MiRai Service desk assistant-new",
    feedback: "Like",
    descriptions: "-"
  },
  {
    reportDate: "5 มิถุนายน 2568 เวลา 16:00",
    users: "Username11",
    questions: "ตารางคิวซ่อม",
    assistants: "AI Search PMG",
    feedback: "Dislike",
    descriptions: "อื่นๆ"
  },
  {
    reportDate: "6 มิถุนายน 2568 เวลา 09:50",
    users: "Username25",
    questions: "บริการตรวจเช็ครถฟรี",
    assistants: "IT10 Service desk assistant",
    feedback: "Like",
    descriptions: "-"
  },
  {
    reportDate: "7 มิถุนายน 2568 เวลา 11:05",
    users: "Username18",
    questions: "วิธีเปลี่ยนยางอะไหล่",
    assistants: "GIS assistant",
    feedback: "Like",
    descriptions: "-"
  },
  {
    reportDate: "8 มิถุนายน 2568 เวลา 15:25",
    users: "Username9",
    questions: "โปรโมชั่นยางรถยนต์",
    assistants: "MiRai Service desk assistant-new",
    feedback: "Dislike",
    descriptions: "ข้อมูลไม่ถูกต้อง"
  },
  {
    reportDate: "9 มิถุนายน 2568 เวลา 10:40",
    users: "Username27",
    questions: "ส่วนลดลูกค้าประจำ",
    assistants: "AI Search PMG",
    feedback: "Like",
    descriptions: "-"
  },
  {
    reportDate: "10 มิถุนายน 2568 เวลา 14:10",
    users: "Username2",
    questions: "ข้อมูลประกันภัย",
    assistants: "IT10 Service desk assistant",
    feedback: "Like",
    descriptions: "-"
  },
  {
    reportDate: "11 มิถุนายน 2568 เวลา 17:35",
    users: "Username29",
    questions: "การคืนสินค้าอะไหล่",
    assistants: "GIS assistant",
    feedback: "Dislike",
    descriptions: "-"
  },
  {
    reportDate: "12 มิถุนายน 2568 เวลา 09:00",
    users: "Username5",
    questions: "สอบถามวิธีจองคิวซ่อม",
    assistants: "MiRai Service desk assistant-new",
    feedback: "Like",
    descriptions: "-"
  },
  {
    reportDate: "13 มิถุนายน 2568 เวลา 10:15",
    users: "Username15",
    questions: "ศูนย์บริการใกล้บ้าน",
    assistants: "AI Search PMG",
    feedback: "Like",
    descriptions: "-"
  },
  {
    reportDate: "14 มิถุนายน 2568 เวลา 11:55",
    users: "Username20",
    questions: "เวลาทำการศูนย์บริการ",
    assistants: "IT10 Service desk assistant",
    feedback: "Dislike",
    descriptions: "-"
  },
  {
    reportDate: "15 มิถุนายน 2568 เวลา 08:45",
    users: "Username8",
    questions: "ราคาน้ำมันเครื่อง",
    assistants: "GIS assistant",
    feedback: "Like",
    descriptions: "-"
  },
  {
    reportDate: "16 มิถุนายน 2568 เวลา 12:05",
    users: "Username1",
    questions: "การผ่อนชำระค่าซ่อม",
    assistants: "MiRai Service desk assistant-new",
    feedback: "Like",
    descriptions: "-"
  },
  {
    reportDate: "17 มิถุนายน 2568 เวลา 13:30",
    users: "Username24",
    questions: "สอบถามอะไหล่แท้",
    assistants: "AI Search PMG",
    feedback: "Like",
    descriptions: "-"
  },
  {
    reportDate: "18 มิถุนายน 2568 เวลา 15:15",
    users: "Username12",
    questions: "ระยะทางในการรับประกัน",
    assistants: "IT10 Service desk assistant",
    feedback: "Dislike",
    descriptions: "-"
  },
  {
    reportDate: "19 มิถุนายน 2568 เวลา 16:45",
    users: "Username30",
    questions: "ชำระเงินออนไลน์ได้ไหม",
    assistants: "GIS assistant",
    feedback: "Like",
    descriptions: "-"
  },
  {
    reportDate: "20 มิถุนายน 2568 เวลา 09:25",
    users: "Username17",
    questions: "ใบเสนอราคารถเก๋ง",
    assistants: "MiRai Service desk assistant-new",
    feedback: "Like",
    descriptions: "-"
  }
];

export type Reports = {
  reportDate: string
  users: string
  questions: string
  assistants: string
  feedback: "Like" | "Dislike"
  descriptions: string
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
  
                <Button variant={"outline"}><ArrowDownToLine/>Download</Button>
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
