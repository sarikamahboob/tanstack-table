import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from "@/components/ui/menubar";
import { flexRender } from '@tanstack/react-table';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";

const TableHeader = ({header}:any) => {
  const isSorted = header.column.getIsSorted()
  const isPinned = header.column.getIsPinned()
  return (
    <th 
      key={header.id} 
      className="capitalize px-3.5 py-2 text-white"
      style={{ width: header.getSize() , position: 'relative', ...(isPinned && {background:"rgb(97,6,79)"})}}
      colSpan={header.colSpan}
    >
      <Menubar className="absolute right-[7px] top-[3px] bg-transparent border-none shadow-none">
        <MenubarMenu>
          <MenubarTrigger className="px-0"><HiOutlineDotsVertical /></MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={header.column.getToggleSortingHandler()}>
              {
                isSorted === 'desc' ? "Sort Asc" : "Sort Desc"
              }
            </MenubarItem>
            {
              isPinned !== "right" && (
                <>
                  <MenubarSeparator />
                  <MenubarItem 
                    onClick={() => header.column.pin("right")
                  }>
                    Pin to Right
                  </MenubarItem>
                </>
              )
            }
            {
              isPinned !== "left" && (
                <>
                  <MenubarSeparator />
                  <MenubarItem 
                    onClick={() => header.column.pin("left")
                  }>
                    Pin to Left
                  </MenubarItem>
                </>
              )
            }
            {
              isPinned && (
                <>
                  <MenubarSeparator />
                  <MenubarItem 
                    onClick={() => header.column.pin(false)
                  }>
                    Unpin
                  </MenubarItem>
                </>
              )
            }
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <div className="flex items-center">
        {flexRender(header.column.columnDef.header, header.getContext())}
        {
          isSorted && <div>
            { isSorted === 'desc' && <IoIosArrowRoundUp /> }
            { isSorted === 'asc' && <IoIosArrowRoundDown />}
          </div>
        }
      </div>
    </th>
  )
}

export default TableHeader