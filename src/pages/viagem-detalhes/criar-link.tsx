import { Link2, Tag, X } from "lucide-react";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { useState } from "react";
import { api } from "../../services/axios";
import { useParams } from "react-router-dom";

type CreateLinkProps = {
  closeCreateLinkModal: () => void
}

export function CreateLink({
  closeCreateLinkModal
}: CreateLinkProps) {

  const { tripId } = useParams()

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function addNewLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if(title === '' || url === '') return
    
    setIsLoading(true)
    await api.post(`/trips/${tripId}/links`, {
      title,
      url
    })
    setIsLoading(false)

    window.document.location.reload()
  }

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className='w-[540px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Cadastrar link</h2>
            <button type='button' onClick={closeCreateLinkModal}>
              <X className='size-5 text-zinc-400 hover:text-zinc-300' />
            </button>
          </div>
          <p className='text-sm leading-[160%] text-zinc-400'>
            Todos convidados podem visualizar os links importantes.
          </p>
        </div>
        <form
          onSubmit={addNewLink}
          className='flex flex-col gap-3'
        >
          <div className='flex flex-col gap-2'>
            <div
              className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'
            >
              <Tag className='size-5 text-zinc-400' />
              <input
                className='bg-transparent flex-1 placeholder-zinc-400 outline-none'
                placeholder='Título do link'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div
              className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'
            >
              <Link2 className='size-5 text-zinc-400' />
              <input
                type="url"
                className='bg-transparent flex-1 placeholder-zinc-400 outline-none'
                placeholder='URL'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>
          <Button
            type='submit'
            disabled={isLoading}
          >
            {isLoading && <Loader variant="secondary" />} Salvar link
          </Button>
        </form>
      </div>
    </div>
  )
}