export function exportToCSV(rows, columns, filename = "export.csv") {
  if (!rows || rows.length === 0) return;

  const escape = (value) => {
    const s = value == null ? "" : String(value);
    if (s.includes(";") || s.includes('"') || s.includes("\n")) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const header = columns.map((c) => escape(c.label)).join(";");
  const body = rows
    .map((row) =>
      columns.map((c) => escape(typeof c.value === "function" ? c.value(row) : row[c.value])).join(";")
    )
    .join("\n");

  // BOM для корректной кириллицы в Excel
  const csv = "\uFEFF" + header + "\n" + body;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}