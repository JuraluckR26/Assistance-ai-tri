"use client"
import React, { useMemo, useState, useCallback, useEffect } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowDownToLine, Eye, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ResponseHistory, ResultHistoryItem } from "@/types/history.type"
import { ButtonFilter } from "./ButtonFilter"
import { exportReportsToCSV } from "./ExportFeedbacksToCSV"
import ModalDetail from "./ModalDetail"
import { formatDate } from "@/utils/formatting"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { searchContent } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export type ReportRow = {
  no: number
  reportDate: string
  questions: string
  assistants: string
  users: string
  feedback: string
  feedbackDetail: string
  response: string
  system: string
  module: string
  function: string
  ticket: string
  aiResult: string
  custom1: string
  custom2: string
  custom3: string
}
function mapHistoryToRows(history: ResponseHistory | null): ReportRow[] {
  const list = history?.result_history ?? []
  
  return list.map((it, idx) => ({
    no: idx + 1,
    reportDate: it.createdDate,
    questions: it.searchText || "-",
    assistants: it.assistantName || "-",
    users: it.createdBy || it.loginId || "-",
    feedback: (it.feedback && it.feedback.trim()) ? it.feedback : "No feedback",
    feedbackDetail: it.feedbackDetail || "-",
    response: it.resultText || "-",
    system: it.system || "-",
    module: it.module || "-",
    function: it.function || "-",
    ticket: it.ticket || "-",
    aiResult: it.aiResult || "-",
    custom1: it.custom1 || "-",
    custom2: it.custom2 || "-",
    custom3: it.custom3 || "-",
  }))
}

const createReportColumns = (
  historyData: ResponseHistory | null,
  setSelectedData: (data: ResultHistoryItem | null) => void,
  setOpenDetail: (open: boolean) => void
): ColumnDef<ReportRow>[] => [
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const originalIndex = row.original.no - 1;
            const fullData = historyData?.result_history?.[originalIndex] || null;
            setSelectedData(fullData);
            setOpenDetail(true);
          }}
          className="flex items-center gap-1 cursor-pointer"
        >
          <Eye className="h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "no",
    header: "No.",
    enableSorting: false,
    cell: ({ row }) => <div>{row.original.no}</div>,
  },
  {
    accessorKey: "reportDate",
    header: "Report Date",
    cell: ({ row }) => (
      <div className="capitalize" title={row.original.reportDate}>
        {formatDate(row.original.reportDate)}
      </div>
    ),
  },
  {
    accessorKey: "questions",
    header: "Questions",
    cell: ({ row }) => (
      <div className="truncate max-w-[240px]" title={row.original.questions}>
        {row.original.questions}
      </div>
    ),
  },
  {
    accessorKey: "assistants",
    header: "Assistants",
    cell: ({ row }) => (
      <div className="truncate max-w-[240px]" title={row.original.assistants}>
        {row.original.assistants}
      </div>
    ),
  },
  {
    accessorKey: "users",
    header: "Users",
    cell: ({ row }) => (
      <div className="truncate max-w-[120px]" title={row.original.users}>
        {row.original.users}
      </div>
    ),
  },
  {
    accessorKey: "feedback",
    header: "Feedback",
    cell: ({ row }) => {
      const fb = row.original.feedback
      const cls =
        fb === "Good" ? "bg-green-500" :
        fb === "Bad" ? "bg-red-500" :
        "bg-gray-300 text-gray-600"
      return (
        <Badge variant={"default"} className={`inline-block rounded-full ${cls}`}>{fb}</Badge>
      )
    },
  },
  {
    accessorKey: "feedbackDetail",
    header: "Feedback Detail",
    cell: ({ row }) => (
      <div className="truncate max-w-[120px]" title={row.original.feedbackDetail}>
        {row.original.feedbackDetail}
      </div>
    ),
  },
  {
    accessorKey: "system",
    header: "System",
    cell: ({ row }) => (
      <div className="truncate max-w-[120px]" title={row.original.system}>
        {row.original.system}
      </div>
    ),
  },
  {
    accessorKey: "module",
    header: "Module",
    cell: ({ row }) => (
      <div className="truncate max-w-[120px]" title={row.original.module}>
        {row.original.module}
      </div>
    ),
  },
  {
    accessorKey: "function",
    header: "Function",
    cell: ({ row }) => (
      <div className="truncate max-w-[120px]" title={row.original.function}>
        {row.original.function}
      </div>
    ),
  },
  {
    accessorKey: "ticket",
    header: "Ticket",
    cell: ({ row }) => (
      <div className="truncate max-w-[120px]" title={row.original.ticket}>
        {row.original.ticket}
      </div>
    ),
  },
  {
    accessorKey: "aiResult",
    header: "Result",
    cell: ({ row }) => (
      <div className="truncate max-w-[120px]" title={row.original.aiResult}>
        {row.original.aiResult}
      </div>
    ),
  },
  {
    accessorKey: "custom1",
    header: "Custom 1",
    cell: ({ row }) => (
      <div className="truncate max-w-[120px]" title={row.original.custom1}>
        {row.original.custom1}
      </div>
    ),
  },
  {
    accessorKey: "custom2",
    header: "Custom 2",
    cell: ({ row }) => (
      <div className="truncate max-w-[120px]" title={row.original.custom2}>
        {row.original.custom2}
      </div>
    ),
  },
  {
    accessorKey: "custom3",
    header: "Custom 3",
    cell: ({ row }) => (
      <div className="truncate max-w-[120px]" title={row.original.custom3}>
        {row.original.custom3}
      </div>
    ),
  }
]

export function DataTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState("")
  const [historyData, setHistoryData] = useState<ResponseHistory | null>(null);
  const [hasFiltered, setHasFiltered] = useState<boolean>(false)
  const [openDetail, setOpenDetail] = useState(false)
  const [selectedData, setSelectedData] = useState<ResultHistoryItem | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [feedbackD, setFeedbackD] = useState("")
  const [selectedFeedback, setSelectedFeedback] = useState<string[]>([])
  const [filterValues, setFilterValues] = useState<{ assistance: string; dateOption: string }>({
    assistance: "",
    dateOption: "",
  });
  const dateLabelMap: Record<string, string> = {
    "today": "Today",
    "5days": "Last 5 days",
    "30days": "Last 30 days",
    "custom": "Custom date",
  };

  const handleSaveFromModal = useCallback((updated: ResultHistoryItem) => {
    setHistoryData(prev => {
      if (!prev) return prev;
      const next = {
        ...prev,
        result_history: prev.result_history.map(it =>
          it.id === updated.id ? { ...it, ...updated } : it
        )
      };
      return next;
    });
    setSelectedData(updated);
  }, []);

  const handleHistoryData = useCallback((data: ResponseHistory | null) => {
    setHistoryData(data);
    setHasFiltered(true);
  }, []);

  const handleLoadingChange = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const handleFeedbackChange = useCallback((feedback: string, checked: boolean) => {
    setSelectedFeedback(prev => {
      if (checked) {
        return [...prev, feedback];
      } else {
        return prev.filter(f => f !== feedback);
      }
    });
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedFeedback([]);
    setFeedbackD("");
  }, []);

  const rows = useMemo(() => mapHistoryToRows(historyData), [historyData])
  const columns = useMemo(() => {
    const baseColumns = createReportColumns(historyData, setSelectedData, setOpenDetail);
    
    // Add filter functions to specific columns
    return baseColumns.map(column => {
      if ('accessorKey' in column && column.accessorKey === "feedback") {
        return {
          ...column,
          filterFn: (row: { original: ReportRow }) => {
            if (selectedFeedback.length === 0) return true;
            return selectedFeedback.includes(row.original.feedback);
          }
        };
      }
      if ('accessorKey' in column && column.accessorKey === "feedbackDetail") {
        return {
          ...column,
          filterFn: (row: { original: ReportRow }) => {
            if (!feedbackD) return true;
            
            if (feedbackD === "อื่น ๆ") {
              const excludedValues = ["ข้อมูลไม่ถูกต้อง", "คำตอบยังไม่สมบูรณ์", "ไม่มีคำตอบ"];
              return Boolean(
                row.original.feedbackDetail && 
                row.original.feedbackDetail.trim() !== "" &&
                row.original.feedbackDetail.trim() !== "-" &&
                !excludedValues.some(excluded => 
                  row.original.feedbackDetail.toLowerCase().includes(excluded.toLowerCase())
                )
              );
            }
            
            return Boolean(row.original.feedbackDetail && row.original.feedbackDetail.toLowerCase().includes(feedbackD.toLowerCase()));
          }
        };
      }
      return column;
    });
  }, [historyData, setSelectedData, setOpenDetail, selectedFeedback, feedbackD])
  
  // Custom global filter function - exclude
  const globalFilterFn = (row: { original: ReportRow }, columnId: string, value: string) => {
    const search = value.toLowerCase();
    const searchableColumns = [
      'questions', 'users', 'system', 'module', 'function', 'ticket', 'aiResult', 'custom1', 'custom2', 'custom3'
    ];
    
    return searchableColumns.some(column => {
      const cellValue = (row.original as Record<string, unknown>)[column];
      return cellValue && cellValue.toString().toLowerCase().includes(search);
    });
  };

  const table = useReactTable({
    data: rows,                      
    columns: columns,        
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: globalFilterFn,
    state: { sorting, columnFilters, columnVisibility, rowSelection, globalFilter },
    enableColumnFilters: true,
  })

  // Trigger column filters when state changes
  useEffect(() => {
    // Set feedback column filter
    if (selectedFeedback.length > 0) {
      table.getColumn("feedback")?.setFilterValue(selectedFeedback);
    } else {
      table.getColumn("feedback")?.setFilterValue(undefined);
    }
  }, [selectedFeedback, table]);

  useEffect(() => {
    // Set feedbackDetail column filter
    if (feedbackD) {
      table.getColumn("feedbackDetail")?.setFilterValue(feedbackD);
    } else {
      table.getColumn("feedbackDetail")?.setFilterValue(undefined);
    }
  }, [feedbackD, table]);

  const handleExport = () => {
    exportReportsToCSV(rows, "report_table.csv");
  };

  return (
    <div className="w-full flex flex-col pb-2">
      <div className="flex justify-between py-2">
        <div>
          <ButtonFilter 
            onApply={setFilterValues} 
            onHistoryData={handleHistoryData}
            onResetFilter={() => setHasFiltered(false)}
            onLoadingChange={handleLoadingChange}
          />
        </div>
        <div className="flex flex-row gap-2 ml-2 items-center">
          <Input
            placeholder="Search table..."
            value={globalFilter ?? ""}
            onChange={(event) => {
              const value = event.target.value;
              table.setGlobalFilter(value);
            }}
            className="w-48 md:w-64 xl:w-100 rounded-full"
          />
          <TooltipProvider delayDuration={150}>
            <Popover>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild><Button variant="outline" className="cursor-pointer"><Filter/></Button></PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Filter</p>
                </TooltipContent>
              </Tooltip>
              <PopoverContent className="w-80 mr-3">
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-sm font-medium mb-3">Feedback</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="Good" 
                          checked={selectedFeedback.includes("Good")}
                          onCheckedChange={(checked) => handleFeedbackChange("Good", checked as boolean)}
                        />
                        <Label htmlFor="Good" className="font-normal text-sm">Good</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="Bad" 
                          checked={selectedFeedback.includes("Bad")}
                          onCheckedChange={(checked) => handleFeedbackChange("Bad", checked as boolean)}
                        />
                        <Label htmlFor="Bad" className="font-normal text-sm">Bad</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="noFeedback" 
                          checked={selectedFeedback.includes("No feedback")}
                          onCheckedChange={(checked) => handleFeedbackChange("No feedback", checked as boolean)}
                        />
                        <Label htmlFor="noFeedback" className="font-normal text-sm">No feedback</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="noFeedback" 
                          checked={selectedFeedback.length === 0}
                          disabled={selectedFeedback.length > 0}
                        />
                        <Label htmlFor="noFeedback" className="font-normal text-sm">All</Label>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Feedback Detail</p>
                    <Select value={feedbackD || "all"} onValueChange={(v) => setFeedbackD(v === "all" ? "" : v.trim())}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All feedback details" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All feedback details</SelectItem>
                        {searchContent.map((val, index) => (
                            <SelectItem 
                                key={index} 
                                value={val.text.trim()}
                            >{val.text.trim()}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button variant="outline" onClick={handleClearFilters} className="w-full">
                    Clear filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={"default"} onClick={handleExport} className="cursor-pointer"><ArrowDownToLine/></Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Export to CSV</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
        </div>
      </div>
      {hasFiltered && (
        <p className="mb-2">
            {dateLabelMap[filterValues.dateOption] || filterValues.dateOption}
        </p>
      )}
      <div className="rounded-md border">
        <div className="relative md:max-h-[1024px] lg:max-h-[1024px] xl:max-h-[1040px] overflow-auto">
          <Table className="">
            <TableHeader className="sticky top-0 bg-white">
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
            <TableBody
              className="
                [&_tr:nth-child(odd)]:bg-gray-100
                [&_tr:nth-child(even)]:bg-gray-50
                [&_tr[data-state=selected]]:bg-indigo-500
              "
            >
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <div>กำลังโหลดข้อมูล...</div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-gray-50"
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
                    className="h-30 text-center"
                  >
                    {!hasFiltered ? (
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <div className="text-lg">📊</div>
                        <div>ยังไม่มีข้อมูล</div>
                        <div className="text-sm">กรุณาใช้ Filter เพื่อค้นหาข้อมูล</div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <div className="text-lg">🔍</div>
                        <div>ไม่พบข้อมูล</div>
                        <div className="text-sm">ลองเปลี่ยนเงื่อนไขการค้นหา</div>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
        </div>
        <div className="flex-shrink-0 flex items-center justify-end space-x-2 py-2 px-4 bg-white border-t">
          <div className="text-muted-foreground flex-1 text-sm">
            Total {table.getFilteredRowModel().rows.length} row(s)
          </div>
        </div>
      </div>
      <ModalDetail open={openDetail} onOpenChange={setOpenDetail} data={selectedData} onSave={handleSaveFromModal} />
    </div>
  )
}