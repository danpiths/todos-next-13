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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/alert-dialog";
import { Loader2 } from "lucide-react";

export function Combobox({
  options,
  typeofOption,
  value,
  setValue,
  deleteOption,
}: {
  options: { label: string; value: string }[];
  typeofOption: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  deleteOption?: {
    deleteOptionFunction: (id: string) => void;
    deleteDialogDescription: string;
    deleteDialogDescriptionMain: string;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    optionBeingDeleted: string;
    setOptionBeingDeleted: React.Dispatch<React.SetStateAction<string>>;
  };
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
                <AlertDialog key={option.value}>
                  <CommandItem
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
                      {deleteOption && (
                        <AlertDialogTrigger
                          asChild
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={deleteOption.loading}
                          >
                            {deleteOption.loading &&
                            deleteOption.optionBeingDeleted === option.value ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash className="h-4 w-4" />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                      )}
                    </div>
                  </CommandItem>
                  {deleteOption && (
                    <AlertDialogContent className="">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure you want to delete{" "}
                          {typeofOption}: {option.label}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {deleteOption.deleteDialogDescription}{" "}
                          <span className="font-bold underline">
                            {deleteOption.deleteDialogDescriptionMain}
                          </span>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          disabled={deleteOption.loading}
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteOption.setOptionBeingDeleted(option.value);
                            return deleteOption.deleteOptionFunction(
                              option.value
                            );
                          }}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  )}
                </AlertDialog>
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
