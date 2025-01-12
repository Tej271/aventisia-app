import React, { useState, useMemo } from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

export const ModelBuildTable = ({ rows }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [sorting, setSorting] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  const pageSize = 10;

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: () => "Model Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("type", {
        header: () => "Model Type",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("description", {
        header: () => "Description",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("createdOn", {
        header: () => "Created On",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("lastTrainedOn", {
        header: () => "Last Trained On",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("status", {
        header: () => "Status",
        cell: (info) => (
          <button className="px-8 py-1 bg-green-100 text-green-600">{info.getValue()}</button>
        ),
      }),
      columnHelper.display({
        id: "action",
        header: () => "Action",
        cell: () => <div className="cursor-pointer text-2xl py-2">&#8942;</div>,
      }),
    ],
    []
  );

  const filteredData = useMemo(() => {
    let filteredRows = rows;

    if (searchTerm) {
      filteredRows = filteredRows.filter((row) =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (dateRange.start && dateRange.end) {
      filteredRows = filteredRows.filter((row) => {
        const createdDate = new Date(row.createdOn);
        return createdDate >= new Date(dateRange.start) && createdDate <= new Date(dateRange.end);
      });
    }

    return filteredRows;
  }, [rows, searchTerm, dateRange]);

  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, pageIndex, pageSize]);

  const table = useReactTable({
    data: paginatedData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by Name, ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 w-1/3 rounded"
        />
        <button
          className="border px-4 py-2 rounded bg-gray-200 ml-2"
          onClick={() => alert("Filters button clicked")}
        >
          Filters
        </button>
        <input
          type="date"
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          className="border px-4 py-2 rounded ml-2"
        />
        <input
          type="date"
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          className="border px-4 py-2 rounded ml-2"
        />
      </div>
      <table className="table-auto w-full mt-6">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-center cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : header.column.columnDef.header()}
                  <span className="ml-2 text-gray-500">
                    {header.column.getIsSorted() === "asc"
                      ? "↑"
                      : header.column.getIsSorted() === "desc"
                      ? "↓"
                      : "⇅"}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b text-center">
              {row.getVisibleCells().map((cell, index) =>
                cell.id.includes(`status`) ? (
                  <td key={cell.id}>
                    <button
                      className={`px-8 py-1  ${
                        cell.getValue() === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      } rounded-md`}
                    >
                      {cell.getValue()}
                    </button>
                  </td>
                ) : cell.id.includes(`action`) ? (
                  <td>
                    <div className="cursor-pointer text-center text-2xl py-2">&#8942;</div>
                  </td>
                ) : (
                  <td key={cell.id} className="px-4 py-2 text-center">
                    {cell.getValue()}
                  </td>
                )
              )}
              <hr />
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => setPageIndex((old) => Math.max(old - 1, 0))}
          disabled={pageIndex === 0}
        >
          Previous
        </button>
        <span>
          Page {pageIndex + 1} of {Math.ceil(filteredData.length / pageSize)}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() =>
            setPageIndex((old) => Math.min(old + 1, Math.ceil(filteredData.length / pageSize) - 1))
          }
          disabled={pageIndex >= Math.ceil(filteredData.length / pageSize) - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};
