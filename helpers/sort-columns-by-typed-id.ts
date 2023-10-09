import { columnTypes } from "@/components/literals";

export const getsortedColumns = (columns: Map<TypedColumn, Column>): Map<TypedColumn, Column> => {
  return new Map(
    Array.from(columns.entries())
      .sort((a, b) => (
        columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
      ))
  );
}