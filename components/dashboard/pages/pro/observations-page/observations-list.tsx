import { FilePenLine, Share2, X } from "lucide-react"
import Image from "next/image"
import React from "react"

import {
  Credenza,
  CredenzaClose,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui"

type Animal = {
  avatar: string
  name: string
  espece: string
  notes: string
}

const ObservationsList = async () => {
  const animals: Animal[] = [
    {
      avatar: "https://randomuser.me/api/portraits/men/65.jpg",
      name: "Animal Doe",
      espece: "Chien",
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/34.jpg",
      name: "Animal Doe",
      espece: "Chat",
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/40.jpg",
      name: "Animal Doe",
      espece: "Cheval",
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/25.jpg",
      name: "Animal Doe",
      espece: "Chien",
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/72.jpg",
      name: "Animal Doe",
      espece: "Lapin",
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/61.jpg",
      name: "Animal Doe",
      espece: "Cheval",
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/51.jpg",
      name: "Animal Doe",
      espece: "Chien",
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/46.jpg",
      name: "Animal Doe",
      espece: "Lapin",
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/29.jpg",
      name: "Animal Doe",
      espece: "Cheval",
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/39.jpg",
      name: "Animal Doe",
      espece: "Chien",
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/56.jpg",
      name: "Animal Doe",
      espece: "Lapin",
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/88.jpg",
      name: "Animal Doe",
      espece: "Cheval",
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/95.jpg",
      name: "Animal Doe",
      espece: "Chien",
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
  ]

  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-background">
          <thead>
            <tr>
              <th className="pb-2 py-2 border-b-2 border-gray-300 text-start text-xl text-black font-bold tracking-wider dark:text-white">
                Nom
              </th>
              <th className="pb-2 py-2 border-b-2 border-gray-300 text-center text-xl text-black font-bold tracking-wider dark:text-white">
                Espèce
              </th>
              <th className="pb-2 py-2 border-b-2 border-gray-300 text-center text-xl text-black font-bold tracking-wider dark:text-white">
                Notes
              </th>
              <th className="pb-2 py-2 border-b-2 border-gray-300 text-center text-xl text-black font-bold tracking-wider dark:text-white"></th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal, index) => (
              <tr key={index} className="bg-white dark:bg-background">
                <td className="px-2 py-2 flex items-center border-b border-gray-200">
                  <Image src={animal.avatar} alt="Avatar" className="rounded-full mr-4" width={40} height={40} />
                  {animal.name}
                </td>
                <td className="px-2 py-2 text-center border-b border-gray-200">{animal.espece}</td>
                <td className="px-2 py-2 border-b border-gray-200">{animal.notes}</td>
                <td className="px-2 py-2 text-center border-b border-gray-200 flex gap-2">
                  <Credenza>
                    <CredenzaTrigger asChild className="group hover:cursor-pointer">
                      <FilePenLine />
                    </CredenzaTrigger>
                    <CredenzaContent>
                      <CredenzaHeader>
                        <CredenzaTitle>Modifier l&apos;observation</CredenzaTitle>
                        <CredenzaClose>
                          <X />
                        </CredenzaClose>
                      </CredenzaHeader>
                    </CredenzaContent>
                  </Credenza>
                  <Credenza>
                    <CredenzaTrigger asChild className="group hover:cursor-pointer">
                      <Share2 />
                    </CredenzaTrigger>
                    <CredenzaContent>
                      <CredenzaHeader>
                        <CredenzaTitle>Partager l&apos;observation</CredenzaTitle>
                        <CredenzaClose>
                          <X />
                        </CredenzaClose>
                      </CredenzaHeader>
                    </CredenzaContent>
                  </Credenza>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ObservationsList
