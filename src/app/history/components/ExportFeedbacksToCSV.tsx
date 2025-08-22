import { Reports, ResponseItem } from "./Table";

export function exportReportsToCSV(rows: Reports[], filename = "report_table.csv") {
  const headers = [
    "No.",
    "Report Date",
    "Users",
    "Questions",
    "Assistants",
    "Response",
    "Feedback",
    "Descriptions",
  ];

  function stringifyResponse(items?: ResponseItem[]) {
    if (!items || items.length === 0) return "";
    // รวมเป็นหลายบรรทัด: "1) ชื่อ - เนื้อหา"
    return items
      .map((it, i) => `${i + 1}. ${it.title}\r\n${it.description}`)
      .join("\r\n\r\n");
  }

  const q = (s: string) => `"${s.replace(/"/g, '""')}"`;

  const csvRows = [
    headers,
    ...rows.map((row, idx) => [
      idx + 1,
      q(row.reportDate),
      q(row.users),
      q(row.questions),
      q(row.assistants),
      q(stringifyResponse(row.response)),
      q(row.feedback),
      q(row.descriptions),
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
