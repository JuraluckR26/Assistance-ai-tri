export function formatThaiDate(isoDate: string): string {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear() + 543;
  
    const thaiMonths = [
      "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
      "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
    ];
  
    return `${day} ${thaiMonths[month]} ${year}`;
}
  