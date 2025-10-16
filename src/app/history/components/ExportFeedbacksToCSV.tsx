import { ReportRow } from "./Table";
import { formatDate } from "@/utils/formatting";

export function exportReportsToCSV(rows: ReportRow[], filename = "report_table.csv") {
  const headers = [
    "No.",
    "Report Date",
    "Questions",
    "Assistants",
    "Answer",
    "Users",
    "Feedback",
    "Feedback Detail",
    "System",
    "Module",
    "Function",
    "Ticket",
    "AI Result",
    "Custom 1",
    "Custom 2",
    "Custom 3"
  ];

  const q = (s: string) => `"${s.replace(/"/g, '""')}"`;

  const csvRows = [
    headers,
    ...rows.map((row) => [
      row.no,
      q(formatDate(row.reportDate)),
      q(row.questions),
      q(row.assistants),
      q(row.response),
      q(row.users),
      q(row.feedback),
      q(row.feedbackDetail),
      q(row.system),
      q(row.module),
      q(row.function),
      q(row.ticket),
      q(row.aiResult),
      q(row.custom1),
      q(row.custom2),
      q(row.custom3),
    ]),
  ];

  const csvContent = "\uFEFF" + csvRows.map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
