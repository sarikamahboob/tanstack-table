import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { convertCamelToTitleCase } from "@/lib/Table.utils";
import { Table } from "@tanstack/react-table";
import { useState } from "react";
import { BsBoxFill } from "react-icons/bs";
import { User } from "../../../../Types/types";

interface ColumnSelector {
  table: Table<User>;
  columnsIds: string[];
}

const ColumnVisibilitySelector = ({table,
  columnsIds}: ColumnSelector) => {
  const [columnVisibilityCheckboxState, setColumnVisibilityCheckboxState] = useState<{ [id: string]: boolean }>(
    () =>
      columnsIds.reduce((acc: { [id: string]: boolean }, id) => {
        acc[id] = true; 
        return acc;
      }, {})
  );

  const handleCheckboxChange = (id: string, checked: boolean) => {
    console.log({id, checked});
    setColumnVisibilityCheckboxState((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger><BsBoxFill size={30} /></PopoverTrigger>
        <PopoverContent>
          <RadioGroup 
            defaultValue="all"
            onValueChange={(value) => {
              table.setColumnVisibility(
                columnsIds?.reduce((acc: { [id: string]: boolean }, val) => {
                  console.log(acc[val], 'value')
                  acc[val] = value === "all";
                  return acc;
                }, {})
              );
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all"  />
              <Label htmlFor="all">Show All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none">Show None</Label>
            </div>
          </RadioGroup>
          <div className="flex flex-col mt-4 gap-2">
            {columnsIds.map((id) => (
              <div key={id} className="flex items-center gap-2">
                <Checkbox
                  id={id}
                  checked={columnVisibilityCheckboxState[id]}
                  onCheckedChange={(checked) => {
                    handleCheckboxChange(id, checked);
                    table.setColumnVisibility({
                      ...columnVisibilityCheckboxState,
                      [id]: checked,
                    });
                  }}
                />
                <label
                  htmlFor={id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {convertCamelToTitleCase(id)}
                </label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ColumnVisibilitySelector