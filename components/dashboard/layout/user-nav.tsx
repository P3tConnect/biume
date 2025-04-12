"use client"

import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Building, LayoutGrid, LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSubTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui"
import { getAllOrganizationsByUserId, getUserInformations } from "@/src/actions"
import { organization, signOut } from "@/src/lib/auth-client"

export function UserNav() {
  const { data: session, isLoading } = useQuery({
    queryKey: ["user-informations"],
    queryFn: () => getUserInformations({}),
  })
  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: () => getAllOrganizationsByUserId({}),
  })
  const router = useRouter()
  const userStatus = "active" // À remplacer par une vraie logique de statut si nécessaire

  // Liste des éléments du menu
  const menuItems = [
    {
      href: `/dashboard/user/${session?.data?.user.id}`,
      icon: <LayoutGrid className="w-4 h-4 text-muted-foreground" />,
      label: "Tableau de bord",
    },
    {
      href: `/dashboard/user/${session?.data?.user.id}/settings`,
      icon: <Settings className="w-4 h-4 text-muted-foreground" />,
      label: "Paramètres",
    },
  ]

  if (isLoading) {
    return (
      <div className="relative">
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full p-0 border border-transparent transition-colors duration-150"
          disabled
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="animate-pulse bg-primary/10">
              <span className="sr-only">Chargement</span>
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>
    )
  }

  return (
    <div className="relative">
      <DropdownMenu>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full p-0 border border-transparent hover:border-border transition-colors duration-150"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={session?.data?.user.image ?? undefined}
                    alt={session?.data?.user.name || "Avatar utilisateur"}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary/5 text-primary">
                    {session?.data?.user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {userStatus === "active" && (
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-background" />
                )}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs font-normal">
            Profil
          </TooltipContent>
        </Tooltip>

        <DropdownMenuContent className="w-56" align="end" sideOffset={6}>
          <motion.div initial={{ opacity: 0.9, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{session?.data?.user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{session?.data?.user.email}</p>
                {userStatus === "active" && (
                  <Badge
                    variant="outline"
                    className="mt-1 text-xs w-fit px-2 py-0 border-green-500/30 text-green-600 bg-green-50 dark:bg-green-950/20"
                  >
                    Connecté
                  </Badge>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {companies?.data?.length! > 0 && (
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg rounded-md p-2">
                    <Building className="w-4 h-4" />
                    <span className="font-medium">Entreprises</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="p-2 grid gap-1">
                      {companies?.data?.map((company: { id: string; name: string }, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <DropdownMenuItem
                            asChild
                            onClick={() => organization.setActive({ organizationId: company.id })}
                          >
                            <Link
                              href={`/dashboard/organization/${company.id}`}
                              className="flex items-center gap-3 p-2.5 rounded-md hover:bg-primary/5 transition-colors duration-200"
                            >
                              <div className="relative">
                                <Building className="w-4 h-4 text-primary/70" />
                                <motion.div
                                  className="absolute inset-0 bg-primary/10 rounded-full"
                                  whileHover={{ scale: 1.8, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                />
                              </div>
                              <span className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200">
                                {company.name}
                              </span>
                            </Link>
                          </DropdownMenuItem>
                        </motion.div>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
            )}
            {companies?.data?.length! > 0 && <DropdownMenuSeparator />}
            <DropdownMenuGroup>
              {menuItems.map((item, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () =>
                await signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/sign-in")
                    },
                  },
                })
              }
              className="text-rose-400 hover:text-rose-500 focus:text-rose-500 cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span>Se déconnecter</span>
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
