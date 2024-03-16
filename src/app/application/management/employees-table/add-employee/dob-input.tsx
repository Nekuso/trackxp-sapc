"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "./dob-calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export default function SampleDatePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild id="dob" name="dob">
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal bg-lightComponentBg border-slate-600/50 rounded-lg text-white hover:bg-lightComponentBg hover:text-white",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-white" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span className="text-white/35">Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className=" w-auto p-0 border-none rounded-lg bg-transparent overflow-hidden shadow-2xl"
      >
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={date}
          onSelect={setDate}
          fromYear={1960}
          toYear={2900}
          className="text-white bg-lightComponentBg border-slate-600/50"
        />
      </PopoverContent>
    </Popover>
  );
}
