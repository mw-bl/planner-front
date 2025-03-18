import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/Button";

type InviteGuestsStepProps = {
  openGuestsModal: () => void
  emailsToInvite: string[]
  openConfirmTripModal: () => void
}

export function InviteGuestsStep({
  openGuestsModal,
  emailsToInvite,
  openConfirmTripModal
}: InviteGuestsStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <button type='button' onClick={openGuestsModal} className='flex flex-1 items-center gap-2 text-left'>
        <UserRoundPlus className='size-5 text-zinc-400' />
        {emailsToInvite.length > 0 && <span
          className='bg-transparent text-lg w-full text-zinc-100 outline-none'
        >
          {emailsToInvite.length} pessoa(s) convidada(s)
        </span>}
        {emailsToInvite.length === 0 && <span
          className="bg-transparent text-lg w-full text-zinc-400 outline-none"
        >
          Quem estará na viagem?
        </span>}
      </button>
      <Button onClick={openConfirmTripModal} >
        Confirmar Viagem
        <ArrowRight className='size-5 ' />
      </Button>
    </div>
  )
}