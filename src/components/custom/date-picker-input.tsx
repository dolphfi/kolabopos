"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"

interface DatePickerInputProps {
    date: Date | undefined
    onDateChange: (date: Date | undefined) => void
    label: string
    id: string
}

function formatDate(date: Date | undefined) {
    if (!date) {
        return ""
    }

    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}

export function DatePickerInput({ date, onDateChange, label, id }: DatePickerInputProps) {
    const [open, setOpen] = React.useState(false)
    const [month, setMonth] = React.useState<Date | undefined>(date)
    const [value, setValue] = React.useState(formatDate(date))

    // Sync local value when prop date changes
    React.useEffect(() => {
        setValue(formatDate(date))
        setMonth(date)
    }, [date])

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor={id} className="text-white">
                {label} <span className="text-red-500">*</span>
            </Label>
            <div className="relative flex gap-2">
                <Input
                    id={id}
                    value={value}
                    readOnly
                    placeholder="Pick a date"
                    className="bg-slate-900 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-orange-500 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 pr-10 cursor-pointer"
                    onClick={() => setOpen(true)}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                            e.preventDefault()
                            setOpen(true)
                        }
                    }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            id={`${id}-trigger`}
                            variant="ghost"
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2 hover:bg-white/10 text-slate-400 hover:text-white"
                        >
                            <CalendarIcon className="size-3.5" />
                            <span className="sr-only">Select date</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0 bg-slate-900 border-white/10 text-white"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                    >
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(newDate) => {
                                onDateChange(newDate)
                                setValue(formatDate(newDate))
                                setOpen(false)
                            }}
                            className="bg-slate-900 text-white"
                            classNames={{
                                day_selected: "bg-orange-500 text-white hover:bg-orange-500 hover:text-white focus:bg-orange-500 focus:text-white",
                                day_today: "bg-white/10 text-white",
                                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white text-white",
                                day_outside: "text-slate-500 opacity-50",
                                day_disabled: "text-slate-500 opacity-50",
                                day_range_middle: "aria-selected:bg-white/10 aria-selected:text-white",
                                day_hidden: "invisible",
                                nav_button: "border border-white/10 hover:bg-white/10 hover:text-white",
                                nav_button_previous: "absolute left-1",
                                nav_button_next: "absolute right-1",
                                caption: "flex justify-center pt-1 relative items-center text-white",
                                head_cell: "text-slate-500 rounded-md w-9 font-normal text-[0.8rem]",
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
