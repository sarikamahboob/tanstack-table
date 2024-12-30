import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";
import { useMemo, useState } from "react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { User } from "../../Types/types";
import { USERS } from "../lib/data";


const useTableData = () => {
  const [data, setData] = useState<User[]>(USERS); 
  const columnHelper = createColumnHelper<User>();

  const columns = useMemo(() => [
    columnHelper.display({
      id: "select-col",
      header: ({ table }) => (
        <span className="flex justify-center items-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </span>
      ),
      cell: ({ row }) => (
        <span className="flex justify-center items-center">
          <Checkbox
            className="bg-white"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </span>
      ),
    }),
    columnHelper.display({
      id: "expand",
      header: () => (
        <span className="flex justify-center items-center">
          <FaCirclePlus />
        </span>
      ),
      cell: ({ row }) =>
        row.getCanExpand() ? (
          <Button
            className="bg-white flex justify-center items-center"
            onClick={row.getToggleExpandedHandler()}
          >
            {row.getIsExpanded() ? (
              <FaCircleMinus color="blue" />
            ) : (
              <FaCirclePlus color="blue" />
            )}
          </Button>
        ) : null,
    }),
    columnHelper.accessor("", {
      id: "SI.No.",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: () => <span>SI. No.</span>,
    }),
    columnHelper.accessor("userId", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>User ID</span>,
    }),
    columnHelper.accessor("profile", {
      id: "profile",
      cell: (info) => (
        <img
          src={info?.getValue()}
          alt="Profile"
          className="rounded-full w-10 h-10 object-cover"
        />
      ),
      header: () => <span>Profile</span>,
    }),
    columnHelper.accessor("firstName", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>First Name</span>,
    }),
    columnHelper.accessor("lastName", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>Last Name</span>,
    }),
    columnHelper.accessor(
      (fullName) => `${fullName.firstName} ${fullName.lastName}`,
      {
        id: "fullName",
        header: () => <span>Full Name</span>,
        size: 300,
      }
    ),
    columnHelper.accessor("age", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>Age</span>,
      footer: (props) => {
        const totalAge = props.table
          .getFilteredRowModel()
          .rows.reduce((acc, val) => acc + Number(val.getValue("age")), 0);
        return <span>Total: {totalAge}</span>;
      },
    }),
    columnHelper.accessor("visits", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>Visits</span>,
    }),
    columnHelper.accessor("progress", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>Progress</span>,
      footer: (props) => {
        const rows = props.table.getCoreRowModel().rows;
        const totalProgress = rows.reduce(
          (sum, row) => sum + (row.getValue("progress") || 0),
          0
        );
        return <span>Total: {totalProgress}</span>;
      },
    }),
    columnHelper.accessor("birthDate", {
      id: "birthDate",
      cell: (info) => (
        <span>{moment(info.getValue()).format("DD/MM/YYYY")}</span>
      ),
      header: () => <span>BirthDate</span>,
    }),
    columnHelper.display({
      id: "delete",
      header: () => (
        <span className="flex justify-center items-center">
          <MdDeleteForever />
        </span>
      ),
      cell: ({ row }) => (
        <Button
          className="bg-red-600 rounded flex justify-center items-center w-8"
          onClick={() =>
            setData((prevData) =>
              prevData.filter((user) => user.userId !== row.original.userId)
            )
          }
        >
          <MdDeleteForever color="white" size={25} />
        </Button>
      ),
    }),
  ], [columnHelper]);

  const columnsIds = useMemo(
    () => columns.map((column) => column.id as string),
    []
  )

  const initialColumnVisibility = useMemo(()=> {
    return columnsIds.reduce((acc: {[id:string]:boolean}, val) => {
      acc[val] = true;
      return acc
    }, {} )
  }, [])

  return { columns, data, columnsIds, initialColumnVisibility };
};

export default useTableData;
