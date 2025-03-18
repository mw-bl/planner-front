import { createBrowserRouter } from "react-router-dom";
import { CreateTrip } from "./pages/criar-viagem";
import { TripDetails } from "./pages/viagem-detalhes";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateTrip />
  },
  {
    path: '/trips/:tripId',
    element: <TripDetails />
  }
])