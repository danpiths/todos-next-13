"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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
  typeofOptions,
}: {
  options: { label: string; value: string | number }[];
  typeofOptions: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | number>("");

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
            : `Select ${typeofOptions}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={
              options.length > 0 ? `Search ${typeofOptions}...` : "Disabled"
            }
            disabled={options.length <= 0}
          />
          {options.length > 0 && (
            <CommandEmpty>No {typeofOptions} found.</CommandEmpty>
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
                  {option.label}
                </CommandItem>
              ))
            ) : (
              <div className="p-4 text-center text-sm">
                No {typeofOptions} found.
              </div>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
