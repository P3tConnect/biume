import React from "react"

import { Card, CardContent, CardHeader, CardTitle, Checkbox } from "@/components/ui"

const ReservationRequestWidget = () => {
  const clients = [
    "Alice Smith",
    "John Doe",
    "Emily Johnson",
    "Michael Brown",
    "Sophia Davis",
    "James Wilson",
    "Olivia Taylor",
    "William Martinez",
    "Isabella Anderson",
    "Ethan Thomas",
    "Mia Garcia",
    "Benjamin Harris",
    "Charlotte Clark",
    "Daniel Lewis",
  ]

  const maxVisibleClients = 10

  return (
    <Card className="w-full h-full flex flex-col rounded-3xl">
      <CardHeader className="flex flex-wrap w-full text-start justify-start">
        <CardTitle className="font-bold text-lg">Demande de réservation en cours</CardTitle>
      </CardHeader>
      <CardContent>
        <h1 className="border-b-[1px] border-b-gray-600 w-full">Client</h1>
        <div className="mt-3">
          <ul className="space-y-2">
            {clients.slice(0, maxVisibleClients).map((client, index) => (
              <li key={index} className="flex items-center gap-2">
                <Checkbox id={`client-${index}`} className="border border-border" />
                <label htmlFor={`client-${index}`} className="text-sm">
                  {client}
                </label>
              </li>
            ))}
          </ul>
          {clients.length > maxVisibleClients && (
            <p className="flex text-center items-center content-center justify-center">...</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ReservationRequestWidget
