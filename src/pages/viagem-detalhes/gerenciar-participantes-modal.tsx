import { AtSign, Plus, Undo2, X } from "lucide-react";
import { Button } from "../../components/Button";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { api } from "../../services/axios";

type ParticipantProps = {
  id: string
  name?: string
  email: string
  is_confirmed: boolean
}

type ManageGuestsProps = {
  participants: ParticipantProps[]
  closeManageGuestsModal: () => void
}

export function ManageGuestsModal({
  participants,
  closeManageGuestsModal,
}: ManageGuestsProps) {
  const { tripId } = useParams()

  const [participantsAux, setParticipantsAux] = useState<ParticipantProps[]>(participants)
  const [participantsToAdd, setParticipantsToAdd] = useState<ParticipantProps[]>([])
  const [participantsToRemove, setParticipantsToRemove] = useState<ParticipantProps[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const allParticipants = [...participantsAux, ...participantsToAdd, ...participantsToRemove]

  function removeParticipantToRemove(participantId: string) {
    const participant = participantsToRemove.find(participant => participant.id === participantId)
    if (participant) {
      if (!participant.id.includes('add')) {
        setParticipantsAux([...participantsAux, { ...participant, id: participant.id.replace('remove', '') }])
      }
      setParticipantsToRemove(prevState => prevState.filter(participant => participant.id !== participantId))
    }
  }

  function addParticipantToRemove(participant: ParticipantProps) {
    if (participant.id.includes('add')) {
      setParticipantsToAdd(prevState => prevState.filter(participantAdd => participantAdd.id !== participant.id))
    } else {
      setParticipantsAux(prevState => prevState.filter(participantAux => participantAux.id !== participant.id))
      setParticipantsToRemove([...participantsToRemove, { ...participant, id: 'remove' + participant.id }])
    }
  }

  function addParticipantToAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString() ?? ''


    setParticipantsToAdd([...participantsToAdd, {
      id: `add-${participantsToAdd.length}-${email}`,
      email,
      is_confirmed: false,
    }])

    event.currentTarget.reset()
  }

  async function manageParticipants() {
    try {
      setIsLoading(true)
      await Promise.all([
        participantsToAdd.map(async (participant) => {
          await api.post(`/trips/${tripId}/invites`, {
            email: participant.email
          })
        }),
        participantsToRemove.map(async (participant) => {
          await api.delete(`/participants/${participant.id.replace('remove', '')}/trip/${tripId}`)
        })
      ])
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
    window.document.location.reload()
  }

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Gerenciar convidados</h2>
            <button type='button' onClick={closeManageGuestsModal}>
              <X className='size-5 text-zinc-400 hover:text-zinc-300' />
            </button>
          </div>
          <p className='text-sm text-zinc-400'>
            Insira ou remova convidados.
          </p>
        </div>
        <div className='flex flex-wrap gap-2'>
          {allParticipants.map((participant) => (
            <div key={participant.id} className={
              participant.id.includes('remove') ? 'border-b-2 border-red-500'
                : participant.id.includes('add') ? 'border-b-2 border-green-500' : ''
            }>
              <div className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
                <span className='text-zinc-300'>{participant.email}</span>
                {participant.id.includes('remove') ?
                  <button
                    type='button'
                    onClick={() => removeParticipantToRemove(participant.id)}
                  >
                    <Undo2 className='size-4 text-zinc-400 hover:text-zinc-300' />
                  </button>
                  :
                  <button
                    type='button'
                    onClick={() => addParticipantToRemove(participant)}
                  >
                    <X className='size-4 text-zinc-400 hover:text-zinc-300' />
                  </button>
                }
              </div>
            </div>
          ))}
        </div>

        <div className='w-full h-px bg-zinc-800' />

        <form
          className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'
          onSubmit={addParticipantToAdd}
        >
          <div className='px-2 flex items-center flex-1 gap-2'>
            <AtSign className='size-5 text-zinc-400' />
            <input
              type="email"
              name='email'
              className='bg-transparent flex-1 placeholder-zinc-400 outline-none'
              placeholder='Digite o e-mail do convidado'
            />
          </div>
          <Button
            type='submit'
            variant="secondary"
          >
            Adicionar E-mail
            <Plus className='size-5' />
          </Button>
          <Button
            type='button'
            onClick={manageParticipants}
            disabled={isLoading}
          >
            {isLoading && <Loader variant="secondary" />} Salvar
            <Plus className='size-5' />
          </Button>
        </form>
      </div>
    </div>
  )
}