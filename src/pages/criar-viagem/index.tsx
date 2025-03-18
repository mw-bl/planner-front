import { FormEvent, useState } from "react"
import { createPortal } from "react-dom"
import { useNavigate } from "react-router-dom"
import { InviteGuestsModal } from "./convidar-participantes-modal"
import { ConfirmTripModal } from "./confirmar-viagem-modal"
import { TripPlanning } from "./planejamento-viagem"
import { DateRange } from "react-day-picker"
import { api } from "../../services/axios"
import { format } from "date-fns"

export function CreateTrip() {

  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  const [emailsToInvite, setEmailsToInvite] = useState([
    'diego@rocketseat.com.br',
    'jessica.white44@yahoo.com'
  ])

  function openGuestsInput() {
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false)
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) return

    if (emailsToInvite.includes(email)) return

    setEmailsToInvite((emailsToInvite) => [
      ...emailsToInvite,
      email
    ])

    event.currentTarget.reset()
  }

  function removeEmailToInvite(email: string) {
    const emailsToInviteWithoutRemoved = emailsToInvite.filter((emailToInvite) => emailToInvite !== email)

    setEmailsToInvite(emailsToInviteWithoutRemoved)
  }

  async function createTrip() {

    if (!destination
      || (!eventStartAndEndDates?.from || !eventStartAndEndDates.to)
      || emailsToInvite.length === 0
      || (!ownerName || !ownerEmail)
    ) {
      return
    }

    setIsLoading(true)
    try {
      const response = await api.post('/trips', {
        destination,
        starts_at: eventStartAndEndDates?.from,
        ends_at: eventStartAndEndDates?.to,
        emails_to_invite: emailsToInvite,
        owner_name: ownerName,
        owner_email: ownerEmail,
      })
      setIsLoading(false)

      const { tripId } = response.data

      navigate(`/trips/${tripId}`)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const displayedDate = eventStartAndEndDates?.from && eventStartAndEndDates.to ?
    format(eventStartAndEndDates.from, "dd' de 'LLL")
      .concat(' até ')
      .concat(format(eventStartAndEndDates.to, "dd' de 'LLL"))
    : null

  return (
    <div className="h-screen flex items-center justify-center text-center bg-pattern bg-no-repeat bg-center">
      <TripPlanning
        openGuestsInput={openGuestsInput}
        closeGuestsInput={closeGuestsInput}
        emailsToInvite={emailsToInvite}
        isGuestsInputOpen={isGuestsInputOpen}
        openConfirmTripModal={openConfirmTripModal}
        openGuestsModal={openGuestsModal}
        destination={destination}
        setDestination={setDestination}
        eventStartAndEndDates={eventStartAndEndDates}
        setEventStartAndEndDates={setEventStartAndEndDates}
      />

      {
        isGuestsModalOpen &&
        createPortal(
          <InviteGuestsModal
            closeGuestsModal={closeGuestsModal}
            emailsToInvite={emailsToInvite}
            addNewEmailToInvite={addNewEmailToInvite}
            removeEmailToInvite={removeEmailToInvite}
          />
          , document.body)
      }

      {
        isConfirmTripModalOpen &&
        createPortal(
          <ConfirmTripModal
            closeConfirmTripModal={closeConfirmTripModal}
            addNewEmailToInvite={addNewEmailToInvite}
            createTrip={createTrip}
            destination={destination}
            displayedDate={displayedDate}
            ownerName={ownerName}
            setOwnerName={setOwnerName}
            ownerEmail={ownerEmail}
            setOwnerEmail={setOwnerEmail}
            isLoading={isLoading}
          />
          , document.body)
      }
    </div >
  )
}