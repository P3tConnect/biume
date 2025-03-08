import { SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import React from "react"

import { Button, Card, CardContent, CardHeader } from "@/components/ui"

const LastClientMonthWidget = () => {
  const clients = [
    {
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "Alice Smith",
      address: "1234 Elm Street, Springfield",
    },
    {
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      name: "John Doe",
      address: "5678 Oak Avenue, Metropolis",
    },
    {
      image: "https://randomuser.me/api/portraits/women/46.jpg",
      name: "Emily Johnson",
      address: "9012 Pine Road, Gotham",
    },
    {
      image: "https://randomuser.me/api/portraits/men/47.jpg",
      name: "Michael Brown",
      address: "3456 Maple Street, Smallville",
    },
    {
      image: "https://randomuser.me/api/portraits/women/48.jpg",
      name: "Sophia Davis",
      address: "7890 Birch Lane, Star City",
    },
    {
      image: "https://randomuser.me/api/portraits/men/49.jpg",
      name: "James Wilson",
      address: "2468 Cedar Drive, Central City",
    },
    {
      image: "https://randomuser.me/api/portraits/women/50.jpg",
      name: "Olivia Taylor",
      address: "1357 Palm Court, Coast City",
    },
    {
      image: "https://randomuser.me/api/portraits/men/51.jpg",
      name: "William Martinez",
      address: "8642 Pineview Boulevard, Riverdale",
    },
    {
      image: "https://randomuser.me/api/portraits/women/52.jpg",
      name: "Isabella Anderson",
      address: "5793 Oakwood Terrace, Hill Valley",
    },
    {
      image: "https://randomuser.me/api/portraits/men/53.jpg",
      name: "Ethan Thomas",
      address: "3579 Redwood Street, Bedford Falls",
    },
    {
      image: "https://randomuser.me/api/portraits/women/54.jpg",
      name: "Mia Garcia",
      address: "1245 Cherry Blossom Lane, Twin Peaks",
    },
    {
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      name: "Benjamin Harris",
      address: "4321 Ashwood Avenue, Silent Hill",
    },
    {
      image: "https://randomuser.me/api/portraits/women/56.jpg",
      name: "Charlotte Clark",
      address: "6789 Sycamore Drive, Emerald City",
    },
    {
      image: "https://randomuser.me/api/portraits/men/57.jpg",
      name: "Daniel Lewis",
      address: "9630 Willow Way, Raccoon City",
    },
  ]
  const maxVisibleClients = 4

  return (
    <Card className="w-full h-full flex flex-col rounded-3xl">
      <CardHeader className="flex flex-row w-full justify-between">
        <h1 className="font-bold text-2xl">Derniers clients</h1>
        <div className="flex flex-row gap-3">
          <Button variant="secondary" className="text-black rounded-2xl" size="sm">
            <div className="flex flex-row gap-2 items-center text-center">
              <SlidersHorizontal size={15} />
              Filtrer
            </div>
          </Button>
          <Button variant="secondary" className="text-black rounded-2xl" size="sm">
            Voir tous
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-between items-center w-full mt-3">
          <h1 className="">Client</h1>
          <h1>Adresses</h1>
        </div>
        <div className="mt-3">
          <ul className="space-y-2">
            {clients.slice(0, maxVisibleClients).map((client, index) => (
              <li key={index} className="flex items-center gap-4 justify-between">
                <div className="flex flex-row gap-2 items-center">
                  <Image
                    src={client.image}
                    alt={client.name}
                    className="w-10 h-10 rounded-full"
                    width={20}
                    height={20}
                  />
                  <label htmlFor={`client-${index}`} className="text-sm font-medium">
                    {client.name}
                  </label>
                </div>
                <label className="text-xs text-gray-500">{client.address}</label>
              </li>
            ))}
          </ul>
          {clients.length > maxVisibleClients && <p className="flex text-center justify-center items-center">...</p>}
        </div>
      </CardContent>
    </Card>
  )
}

export default LastClientMonthWidget
