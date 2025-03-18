import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/Button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ptBR } from "date-fns/locale/pt-BR";
import { format } from "date-fns";

type DestinationAndDateStepProps = {
  isGuestsInputOpen: boolean
  openGuestsInput: () => void
  closeGuestsInput: () => void
  destination: string
  setDestination: (destination: string) => void
  eventStartAndEndDates: DateRange | undefined
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  openGuestsInput,
  closeGuestsInput,
  destination,
  setDestination,
  eventStartAndEndDates,
  setEventStartAndEndDates
}: DestinationAndDateStepProps) {

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  const displayedDate = eventStartAndEndDates?.from && eventStartAndEndDates.to ?
    format(eventStartAndEndDates.from, "dd' de 'LLL")
      .concat(' até ')
      .concat(format(eventStartAndEndDates.to, "dd' de 'LLL"))
    : null

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className='flex flex-1 items-center gap-2'>
        <MapPin className='size-5 text-zinc-400' />
        <input
          className="bg-transparent text-lg flex-1 placeholder-zinc-400 outline-none"
          type="text"
          placeholder="Para onde você vai?"
          disabled={isGuestsInputOpen}
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <button
        title={displayedDate ?? 'Quando?'}
        onClick={openDatePicker}
        disabled={isGuestsInputOpen}
        className='flex items-center gap-2 text-left w-[240px]'
      >
        <Calendar className='size-5 text-zinc-400' />
        <span
          className="text-lg text-zinc-400 w-40 flex-1"
        >
          {displayedDate ?? 'Quando?'}
        </span>
      </button>

      {isDatePickerOpen &&
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Selecione a data</h2>
                <button type='button' onClick={closeDatePicker}>
                  <X className='size-5 text-zinc-400 hover:text-zinc-300' />
                </button>
              </div>
            </div>
            <DayPicker
              mode="range"
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
              locale={ptBR}
              fixedWeeks={true}
              showOutsideDays={true}
              classNames={{
                cell: 'p-0 [&:has(.day-range-end)]:rounded-e-full [&:has(.day-range-start)]:rounded-s-full [&:not(&:has([aria-selected]))>button:hover]:bg-lime-200 [&:not(&:has([aria-selected]))>button:hover]:text-lime-950 [&:has(.day-range-middle)>button]:bg-transparent [&:has(.day-range-middle)>button]:border-transparent [&:has([aria-selected]):first-child]:rounded-s-full [&:has([aria-selected]):last-child]:rounded-e-full [&:has([aria-selected])]:bg-lime-100',
                day: 'size-10 rounded-full aria-selected:opacity-100',
                day_selected: "bg-lime-300 text-lime-950 hover:bg-lime-400",
                day_today: 'border-2 border-lime-300 font-bold',
                day_range_start: 'day-range-start',
                day_range_middle: 'day-range-middle',
                day_range_end: 'day-range-end',
                button: 'hover:bg-lime-200 hover:text-lime-950 cursor-pointer',
              }}
            />
          </div>
        </div>
      }

      <div className='w-px h-6 bg-zinc-800' />

      {isGuestsInputOpen &&
        <Button variant="secondary" onClick={closeGuestsInput} >
          Alterar local/data
          <Settings2 className='size-5' />
        </Button>
      }
      {!isGuestsInputOpen &&
        <Button onClick={openGuestsInput}>
          Continuar
          <ArrowRight className='size-5 ' />
        </Button>}
    </div>
  )
}