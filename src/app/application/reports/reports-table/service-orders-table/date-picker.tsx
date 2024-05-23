/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState, useTransition } from "react";
import { addDays, format, formatISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "./date-calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "@/components/ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { setFilteredOrderServices } from "@/redux/slices/filteredOrderServices";

export default function DatePickerWithRange({
  className,
  data,
  setFilteredData,
}: any) {
  const currentSession = useSelector((state: any) => state.currentSession);
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();

  const formatToTimestampz = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss.SSS");
    return `${formattedDate}000+00`;
  };

  const [date, setDate] = useState<any | undefined>({
    from: formatToTimestampz(addDays(new Date(), -7)).toString(),
    to: formatToTimestampz(new Date()).toString(),
  });

  const [convertedDate, setConvertedDate] = useState({
    from: "",
    to: "",
  });

  useEffect(() => {
    if (date?.from && date?.to) {
      setConvertedDate({
        from: formatISO(new Date(date.from)),
        to: formatISO(new Date(date.to)),
      });
    }
  }, [date]);

  function sortArrayByDate(array: any[], startDate: Date, endDate: Date) {
    return array
      .filter(
        (item) =>
          new Date(item.created_at) >= startDate &&
          new Date(item.created_at) <= endDate
      )
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
  }

  async function onSubmit() {
    startTransition(async () => {
      const filtered = sortArrayByDate(
        data,
        new Date(convertedDate.from),
        new Date(convertedDate.to)
      );
      setFilteredData(filtered);
      toast({
        title: "Success",
        description: "Data filtered successfully",
      });
      new Promise((resolve) => setTimeout(resolve, 500)).then(() => {});
    });
  }

  return (
    <div className={cn("flex gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "min-w-[200px] justify-start text-left font-normal bg-lightComponentBg border-lightBorder text-white/80 rounded-lg h-10 px-4 hover:bg-lightComponentBgHover hover:text-white/100",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <div>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </div>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className=" mr-10 mt-2 w-auto p-0 border-none rounded-lg bg-transparent overflow-hidden shadow-2xl"
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            className="text-white bg-lightComponentBg border-slate-600/50"
          />
        </PopoverContent>
      </Popover>
      <Button
        className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 bg-white/90 hover:bg-white active:scale-95 transition-all duration-300 text-black"
        type="submit"
        onClick={() => onSubmit()}
      >
        <span className={cn({ hidden: isPending })}>Filter</span>
        <AiOutlineLoading3Quarters
          className={cn(" animate-spin", { hidden: !isPending })}
        />
      </Button>
    </div>
  );
}
