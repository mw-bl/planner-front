import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/axios";
import { createPortal } from "react-dom";
import { CreateLink } from "./criar-link";

type LinkProps = {
  id: string
  trip_id: string
  title: string
  url: string
}

export function ImportantLinks() {

  const { tripId } = useParams()
  const [links, setLinks] = useState<LinkProps[]>([])
  const [isOpenCreateLinkModal, setIsOpenCreateLinkModal] = useState(false)

  function openCreateLinkModal() {
    setIsOpenCreateLinkModal(true)
  }

  function closeCreateLinkModal() {
    setIsOpenCreateLinkModal(false)
  }

  useEffect(() => {
    api.get(`/trips/${tripId}/links`).then(response => setLinks(response.data.links))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">
        {links.map(link => (
          <div key={link.id} className="flex items-center justify-between">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">{link.title}</span>
              <a href={link.url} target="_blank" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                {link.url}
              </a>
            </div>
            <Link2 className="text-zinc-400 size-5 shrink-0" />
          </div>
        ))}
      </div>
      <Button
        variant="secondary"
        className="w-full justify-center"
        onClick={openCreateLinkModal}
      >
        <Plus className='size-5' />
        Cadastrar novo link
      </Button>
      {isOpenCreateLinkModal && createPortal(
        <CreateLink
          closeCreateLinkModal={closeCreateLinkModal}
        />,
        document.body,
      )}
    </div>
  )
}