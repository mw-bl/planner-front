import { Mail, User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";

type ConfirmTripCreationProps = {
  closeConfirmTripModal: () => void
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
  createTrip: () => void
  destination: string
  displayedDate: string | null
  ownerName: string
  setOwnerName: (name: string) => void
  ownerEmail: string
  setOwnerEmail: (email: string) => void
  isLoading: boolean
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  addNewEmailToInvite,
  createTrip,
  destination,
  displayedDate,
  ownerName,
  setOwnerName,
  ownerEmail,
  setOwnerEmail,
  isLoading,
}: ConfirmTripCreationProps) {
  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className='w-[540px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Confirmar criação da viagem</h2>
            <button type='button' onClick={closeConfirmTripModal}>
              <X className='size-5 text-zinc-400 hover:text-zinc-300' />
            </button>
          </div>
          <p className='text-sm leading-[160%] text-zinc-400'>
            Para concluir a criação da viagem para {' '}
            <span className='text-zinc-100 font-bold'>{destination}</span>
            {" nas datas de "}
            <span className='text-zinc-100 font-bold'>{displayedDate}</span>
            {" preencha seus dados abaixo:"}
          </p>
        </div>
        <form
          onSubmit={addNewEmailToInvite}
          className='flex flex-col gap-3'
        >
          <div className='flex flex-col gap-2'>
            <div
              className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'
            >
              <User className='size-5 text-zinc-400' />
              <input
                name='name'
                className='bg-transparent flex-1 placeholder-zinc-400 outline-none'
                placeholder='Seu nome completo'
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
            </div>
            <div
              className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'
            >
              <Mail className='size-5 text-zinc-400' />
              <input
                type="email"
                name='email'
                className='bg-transparent flex-1 placeholder-zinc-400 outline-none'
                placeholder='Seu e-mail pessoal'
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
              />
            </div>
          </div>
          <Button
            type='submit'
            onClick={createTrip}
            disabled={isLoading}
          >
            {isLoading && <Loader variant="secondary" />} Confirmar criação de viagem
          </Button>
        </form>
      </div>
    </div>
  )
}