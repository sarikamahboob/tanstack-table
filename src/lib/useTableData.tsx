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
      size: 120
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
        size: 40
    }),
    columnHelper.accessor("", {
      id: "si-no",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: () => <span>SI. No.</span>,
      size: 420
    }),
    columnHelper.accessor("userId", {
      id: "user-id",
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>User ID</span>,
      size: 150
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
      size: 160
    }),
    columnHelper.accessor("firstName", {
      id: "first-name",
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>First Name</span>,
      size: 390
    }),
    columnHelper.accessor("lastName", {
      id: "last-name",
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>Last Name</span>,
      size: 350
    }),
    columnHelper.accessor(
      (fullName) => `${fullName.firstName} ${fullName.lastName}`,
      {
        id: "full-name",
        header: () => <span>Full Name</span>,
        size: 300,
      }
    ),
    columnHelper.accessor("age", {
      id: "age",
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>Age</span>,
      footer: (props) => {
        const totalAge = props.table
          .getFilteredRowModel()
          .rows.reduce((acc, val) => acc + Number(val.getValue("age")), 0);
        return <span>Total: {totalAge}</span>;
      },
      size: 100
    }),
    columnHelper.accessor("visits", {
      id: "visits",
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>Visits</span>,
      size: 150
    }),
    columnHelper.accessor("progress", {
      id: "progress",
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
      size: 160
    }),
    columnHelper.accessor("birthDate", {
      id: "birthDate",
      cell: (info) => (
        <span>{moment(info.getValue()).format("DD/MM/YYYY")}</span>
      ),
      header: () => <span>BirthDate</span>,
      size: 170
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
      size: 80
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
