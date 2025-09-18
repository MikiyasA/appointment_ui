"use client";

import * as React from "react";
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
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Box, Center, Group, Select, Text } from "@mantine/core";
import { formatCamelCaseLabel } from "../config/utils";

type FormatterFunction<TData> = (value: any, row: TData) => React.ReactNode;

type GenericDataTableProps<TData extends object> = {
  data: TData[];
  columnHeadings: string[];
  columnFormatters?: Record<string, FormatterFunction<TData>>;
  selectable?: boolean;
  action?: (item: TData) => React.ReactNode;
  noDataText: string;
};

export function GenericDataTable<TData extends object>({
  data,
  columnHeadings,
  columnFormatters = {},
  selectable,
  action,
  noDataText,
}: GenericDataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo<ColumnDef<TData>[]>(() => {
    if (data?.length === 0) return [];

    const result: ColumnDef<TData>[] = [];

    if (selectable) {
      result.push({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      });
    }

    // Add user-defined columns

    columnHeadings.forEach((key) => {
      result.push({
        accessorKey: key,
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="p-0 text-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {formatCamelCaseLabel(String(key))}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const value = row.getValue(key);
          const formatter = columnFormatters?.[key];

          return (
            <div className="truncate capitalize text-center">
              {formatter ? formatter(value, row.original) : String(value)}
            </div>
          );
        },
      });
    });

    if (action) {
      result.push({
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const item = row.original; // TODO: item is row values
          return <>{action(item)} </>;
        },
      });
    }

    return result;
  }, [data, columnHeadings, columnFormatters, selectable, action]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const selectOptions = columnHeadings.map((heading) => ({
    value: heading,
    label: formatCamelCaseLabel(heading),
  }));
  const [selectFilter, setSelectFilter] = React.useState<string | null>(
    columnHeadings[1]
  );
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {data.length !== 0 && (
          <Group>
            <Select
              data={selectOptions}
              value={selectFilter}
              onChange={setSelectFilter}
              allowDeselect={false}
            />
            <Input
              placeholder={`Filter by ${formatCamelCaseLabel(
                selectFilter as string
              )}...`}
              value={
                (table
                  .getColumn(selectFilter as string)
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) => {
                table
                  .getColumn(selectFilter as string)
                  ?.setFilterValue(event.target.value);
              }}
              className="max-w-sm"
            />
          </Group>
        )}
        <DropdownMenu>
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
                    {formatCamelCaseLabel(column.id)}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border mt-1">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  {noDataText}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    if (cell.getValue() === null) {
                      return null;
                    } else {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {table.getRowCount() > 10 && (
          <div className="flex justify-between p-2">
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
