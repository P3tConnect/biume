"use client"

import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui"

import { Bell } from "lucide-react"
import React from "react"

const Notifications = () => {
  // Nombre temporaire de notifications (sera remplacé par la logique fonctionnelle plus tard)
  const notificationCount = 5

  // Fausses notifications temporaires
  const tempNotifications = [
    {
      id: 1,
      title: "Nouveau rendez-vous",
      description: "Dr. Martin a un nouveau rendez-vous demain à 14h00",
      time: "Il y a 10 minutes",
      read: false,
    },
    {
      id: 2,
      title: "Rappel",
      description: "N'oubliez pas de confirmer le rendez-vous avec Félix le chat",
      time: "Il y a 30 minutes",
      read: false,
    },
    {
      id: 3,
      title: "Mise à jour",
      description: "Le dossier de Max a été mis à jour avec de nouvelles informations",
      time: "Il y a 1 heure",
      read: true,
    },
    {
      id: 4,
      title: "Paiement reçu",
      description: "Vous avez reçu un paiement de 50€ pour la consultation d'hier",
      time: "Il y a 3 heures",
      read: true,
    },
    {
      id: 5,
      title: "Message",
      description: "Mme Dubois vous a envoyé un message concernant son chien",
      time: "Il y a 5 heures",
      read: false,
    },
  ]

  // Nombre de notifications non lues
  const unreadCount = tempNotifications.filter(notification => !notification.read).length

  return (
    <DropdownMenu>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-full h-8 w-8 p-0 bg-card relative">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-red-600 text-white">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">Notifications</TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-80" side="bottom" align="end">
        <DropdownMenuLabel className="font-bold">Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
          {tempNotifications.length > 0 ? (
            tempNotifications.map(notification => (
              <div key={notification.id} className="p-3 hover:bg-muted rounded-md cursor-pointer flex items-start">
                {!notification.read && (
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0"></div>
                )}
                <div className={notification.read ? "ml-4" : ""}>
                  <div className="font-medium text-sm">{notification.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{notification.description}</div>
                  <div className="text-xs text-muted-foreground mt-2 italic">{notification.time}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-muted-foreground">Aucune notification</div>
          )}
        </DropdownMenuGroup>
        {tempNotifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button variant="outline" size="sm" className="w-full">
                Marquer tout comme lu
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Notifications
