import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/Button";
import { api } from "../../services/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { ManageGuestsModal } from "./gerenciar-participantes-modal";

type ParticipantProps = {
  id: string
  name?: string
  email: string
  is_confirmed: boolean
}

export function Guests() {

  const { tripId } = useParams()
  const [participants, setParticipants] = useState<ParticipantProps[]>([])
  const [isOpenManageGuestsModal, setIsOpenManageGuestsModal] = useState(false)

  function openManageGuestsModal() {
    setIsOpenManageGuestsModal(true)
  }

  function closeManageGuestsModal() {
    setIsOpenManageGuestsModal(false)
  }

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {participants.map((participant, index) => (
          <div key={participant.id} className="w-full flex items-center justify-between">
            <div className="text-left space-y-1.5">
              <span className="block font-medium text-zinc-100">{participant.name ?? `Convidado ${index}`}</span>
              <span className="block text-sm text-zinc-400 truncate">
                {participant.email}
              </span>
            </div>
            {participant.is_confirmed && <CheckCircle2 className="size-5 shrink-0 text-green-400" />}
            {!participant.is_confirmed && <CircleDashed className="text-zinc-400 size-5 shrink-0" />}
          </div>
        ))}
      </div>
      <Button variant="secondary" onClick={openManageGuestsModal} className="w-full justify-center">
        <UserCog className='size-5' />
        Gerenciar convidados
      </Button>
      {isOpenManageGuestsModal &&
        createPortal(
          <ManageGuestsModal
            closeManageGuestsModal={closeManageGuestsModal}
            participants={participants}
          />,
          document.body
        )
      }
    </div>
  )
}