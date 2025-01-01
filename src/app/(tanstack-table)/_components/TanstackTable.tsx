"use client"

import { Input } from "@/components/ui/input"
import { fuzzyFilter } from "@/lib/Table.utils"
import useTableData from "@/lib/useTableData"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react"
import ColumnVisibilitySelector from "./ColumnVisibilitySelector"
import DownloadBtn from "./DownloadBtn"
import RowDetailView from "./RowDetailView"
import TableHeader from "./TableHeader"
const TanstackTable = () => {
  const { columns, data, columnsIds, initialColumnVisibility } = useTableData();
  const [globalFilter, setGlobalFilter] = useState("")
  
  const table = useReactTable({
    data,
    columns,
    // state: {
    //   globalFilter
    // },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: fuzzyFilter,
    enableRowSelection: true,
    getRowCanExpand: () => true,
    initialState: {
      columnVisibility: initialColumnVisibility,
    }
  })
  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="w-full flex gap-4">
          <ColumnVisibilitySelector table={table} columnsIds={columnsIds} />
          {/* <DebouncedInput 
            value={globalFilter ?? ""} 
            onChange={(value)=> setGlobalFilter(String(value))} className="p-2 bg-transparent outline-none border-b-2 w-56 focus:w-60 duration-380 border-indigo-500"
            placeholder="Search all columns..."
          /> */}
          <Input type="text" placeholder="Search..." onChange={(e) => table.setGlobalFilter(e.target.value)} className="w-[250px]" />
        </div>
        <DownloadBtn data={data} fileName={"peoples"}/>
      </div>
      <table className="border border-gray-700 w-full text-left">
        <thead className="bg-indigo-500 sticky top-0 z-10">
          {
            table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {
                  headerGroup.headers.map((header) => {
                    return <TableHeader key={header.id} header={header} />
                  })
                }
              </tr>
            ))
          }
        </thead>
        <tbody>
          {
            table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row,i) => (
              <>
                <tr key={row.id} className={
                  `${row.getIsSelected() ? "bg-[#36366e]" : "bg-gray-900"}`
                }>
                  {
                    row.getVisibleCells().map((cell)=> (
                      <td key={cell.id} className="px-3.5 py-2 text-white">
                        {
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        }
                      </td>
                    ))
                  }
                </tr>
                {
                  row.getIsExpanded() && <tr>
                    <td colSpan={row.getVisibleCells().length}>
                      <RowDetailView user={row.original} />
                    </td>
                  </tr>
                }
              </>
              ))
            ) : 
            <tr className="text-center h-32">
              <td colSpan={7}>No Record Found!</td>
            </tr>
          }
        </tbody>
        <tfoot className="bg-indigo-500">
          {
            table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {
                  footerGroup.headers.map((footer) => (
                    <th key={footer.id} className="capitalize px-3.5 py-2">
                      {flexRender(footer.column.columnDef.footer, footer.getContext())}
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </tfoot>
      </table>
      {/* pagination */}
      <div className="flex items-center justify-end gap-2">
        <button 
          onClick={()=> {
            table.firstPage()
          }} 
          disabled={!table.getCanPreviousPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {"<<"}
        </button>
        <button 
          onClick={()=> {
            table.previousPage()
          }} 
          disabled={!table.getCanPreviousPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {"<"}
        </button>
        <button 
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {">"}
        </button>
        <button 
          onClick={()=> {
            table.lastPage()
          }} 
          disabled={!table.getCanNextPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {
              table.getState().pagination.pageIndex + 1
            } of {
              table.getPageCount()
            }
          </strong>
        </span>
        <span className="flex items-center gap-1">
          Go to page:
          <input 
            type="number" 
            defaultValue={table.getState().pagination.pageIndex + 1} 
            onChange={(e)=> {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16 bg-transparent"
          />
        </span>
        <select 
          value={table.getState().pagination.pageSize}
          onChange={(e)=> {
            table.setPageSize(e.target.value)
          }}
          className="p-2 bg-transparent"
        >
          {
            [10,20,30,40,50].map((pagesize)=>(
              <option key={pagesize} value={pagesize} className="bg-slate-800">
                Show {pagesize}
              </option>
            ))
          }
        </select>
      </div>
    </div>
  )
}

export default TanstackTable