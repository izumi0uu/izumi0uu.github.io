import { format } from "date-fns";

const dateFormats = {
  /** Jan 13, 2024 */
  cardDate: "MMM dd, yyyy",
  /** 2024-02-26 */
  isoDate: "yyyy-MM-dd",
  /** Tue, 16th July, 9am */
  shortDate: "do MMMM, haaa",
} as const;

const formatDate = (date: Date): string => format(date, dateFormats.cardDate);

const formatDateIso = (date: Date): string => format(date, dateFormats.isoDate);

const shortDate = (date: Date): string => format(date, dateFormats.shortDate);

export { formatDate, formatDateIso, shortDate };
