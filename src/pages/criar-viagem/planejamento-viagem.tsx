import { DateRange } from "react-day-picker";
import { DestinationAndDateStep } from "./steps/destino-e-datas";
import { InviteGuestsStep } from "./steps/convidar-participantes";

type TripPlanningProps = {
  openGuestsInput: () => void
  closeGuestsInput: () => void
  isGuestsInputOpen: boolean
  openGuestsModal: () => void
  emailsToInvite: string[]
  openConfirmTripModal: () => void
  destination: string
  setDestination: (destination: string) => void
  eventStartAndEndDates: DateRange | undefined
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
}


export function TripPlanning({
  openGuestsInput,
  closeGuestsInput,
  isGuestsInputOpen,
  openGuestsModal,
  emailsToInvite,
  openConfirmTripModal,
  destination,
  setDestination,
  eventStartAndEndDates,
  setEventStartAndEndDates
}: TripPlanningProps) {
  return (
    <div className="max-w-3xl w-full px-6 space-y-10">
      <div className='flex flex-col items-center gap-3'>
        <img src='/logo.svg' alt='plann.er' />
        <p className="text-zinc-300">Convide seus amigos e planeje sua próxima viagem!</p>
      </div>
      <div className='flex flex-col gap-4'>
        <DestinationAndDateStep
          openGuestsInput={openGuestsInput}
          closeGuestsInput={closeGuestsInput}
          isGuestsInputOpen={isGuestsInputOpen}
          destination={destination}
          setDestination={setDestination}
          eventStartAndEndDates={eventStartAndEndDates}
          setEventStartAndEndDates={setEventStartAndEndDates}
        />
        {
          isGuestsInputOpen &&
          <InviteGuestsStep 
            emailsToInvite={emailsToInvite}
            openConfirmTripModal={openConfirmTripModal}
            openGuestsModal={openGuestsModal}
          />
        }
      </div>
      <p className="text-sm text-zinc-500">
        Ao planejar sua viagem pela plann.er você automaticamente concorda
        <br />
        com nossos {" "}
        <a href="#" className="text-zinc-300 hover:underline">termos de uso</a>
        {" e "}
        <a href="#" className="text-zinc-300 hover:underline">políticas de privacidade</a>.</p>
    </div>
  )
}