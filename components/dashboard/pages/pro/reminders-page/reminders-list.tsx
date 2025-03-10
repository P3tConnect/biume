import Image from "next/image"
import React from "react"

type Client = {
  avatar: string
  client: string
  animal: string
  adresse: string
  status: string
}

const RemindersList = async () => {
  const clients: Client[] = [
    {
      avatar: "https://randomuser.me/api/portraits/men/74.jpg",
      client: "Jonathan Doe Hope",
      animal: "Chien",
      adresse: "12Th lorem ipsum xx",
      status: "Terminée",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/80.jpg",
      client: "Jonathan Doe Hope",
      animal: "Chien",
      adresse: "12Th lorem ipsum xx",
      status: "en cours",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/38.jpg",
      client: "Jonathan Doe Hope",
      animal: "Chat",
      adresse: "12Th lorem ipsum xx",
      status: "en cours",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      client: "Jonathan Doe Hope",
      animal: "Lapin",
      adresse: "12Th lorem ipsum xx",
      status: "en cours",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/98.jpg",
      client: "Jonathan Doe Hope",
      animal: "Chat",
      adresse: "12Th lorem ipsum xx",
      status: "Terminée",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/50.jpg",
      client: "Jonathan Doe Hope",
      animal: "Chien",
      adresse: "12Th lorem ipsum xx",
      status: "Terminée",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/87.jpg",
      client: "Jonathan Doe Hope",
      animal: "Chien",
      adresse: "12Th lorem ipsum xx",
      status: "en cours",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      client: "Jonathan Doe Hope",
      animal: "Chat",
      adresse: "12Th lorem ipsum xx",
      status: "en cours",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/40.jpg",
      client: "Jonathan Doe Hope",
      animal: "Lapin",
      adresse: "12Th lorem ipsum xx",
      status: "en cours",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/53.jpg",
      client: "Jonathan Doe Hope",
      animal: "Chien",
      adresse: "12Th lorem ipsum xx",
      status: "Terminée",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/78.jpg",
      client: "Jane Doe Hope",
      animal: "Chien",
      adresse: "12Th lorem ipsum xx",
      status: "Terminée",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/49.jpg",
      client: "Jane Doe Hope",
      animal: "Chat",
      adresse: "12Th lorem ipsum xx",
      status: "Terminée",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/14.jpg",
      client: "Jane Doe Hope",
      animal: "Chien",
      adresse: "12Th lorem ipsum xx",
      status: "en cours",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/98.jpg",
      client: "Jane Doe Hope",
      animal: "Chat",
      adresse: "12Th lorem ipsum xx",
      status: "en cours",
    },
  ]

  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-background">
          <thead>
            <tr>
              <th className="pb-2 py-2 border-b-2 border-gray-300 text-start text-xl text-black font-bold tracking-wider dark:text-white">
                Client
              </th>
              <th className="pb-2 py-2 border-b-2 border-gray-300 text-center text-xl text-black font-bold tracking-wider dark:text-white">
                Animal
              </th>
              <th className="pb-2 py-2 border-b-2 border-gray-300 text-center text-xl text-black font-bold tracking-wider dark:text-white">
                Adresse
              </th>
              <th className="pb-2 py-2 border-b-2 border-gray-300 text-center text-xl text-black font-bold tracking-wider dark:text-white">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={index} className="bg-white-50">
                <td className="px-2 py-2 flex items-center justify-start text-start whitespace-no-wrap border-b border-gray-200">
                  <Image src={client.avatar} alt="Avatar" className="rounded-full mr-4" width={40} height={40} />
                  {client.client}
                </td>
                <td className="px-2 py-2 whitespace-no-wrap border-b text-center border-gray-200">{client.animal}</td>
                <td className="px-2 py-2 whitespace-no-wrap border-b text-center border-gray-200">{client.adresse}</td>
                <td className="px-2 py-2 whitespace-no-wrap border-b text-center border-gray-200">
                  <span
                    className={`px-4 py-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      client.status === "Terminée" ? "bg-green-100 text-primary" : "bg-purple-100 text-secondary"
                    }`}
                  >
                    {client.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RemindersList
