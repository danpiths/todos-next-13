"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Trash } from "lucide-react";

import { cn } from "@/ui/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Combobox({
  options,
  typeofOption,
  deleteOptionFunction,
  value,
  setValue,
}: {
  options: { label: string; value: string }[];
  typeofOption: string;
  deleteOptionFunction?: (id: string) => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : `Select ${typeofOption}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={
              options.length > 0 ? `Search a ${typeofOption}...` : "Disabled"
            }
            disabled={options.length <= 0}
          />
          {options.length > 0 && (
            <CommandEmpty>No {typeofOption} found.</CommandEmpty>
          )}
          <CommandGroup>
            {options.length > 0 ? (
              options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={(currentLabel) => {
                    const currentValue = options.find(
                      (option) => option.label === currentLabel
                    )?.value;
                    if (currentValue) {
                      setValue(currentValue === value ? "" : currentValue);
                    }
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex w-full items-center">
                    <span className="flex-1">{option.label}</span>
                    {deleteOptionFunction && (
                      <Trash
                        className="h-4 w-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          0;
                          return deleteOptionFunction(option.value);
                        }}
                      />
                    )}
                  </div>
                </CommandItem>
              ))
            ) : (
              <div className="p-4 text-center text-sm">
                No {typeofOption} found.
              </div>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
