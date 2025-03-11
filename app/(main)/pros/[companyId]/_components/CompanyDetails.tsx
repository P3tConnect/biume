"use client"

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  Clipboard,
  Clock,
  Heart,
  MapPin,
  MessageSquare,
  Phone,
  Settings,
  Share2,
  Star,
  Users,
} from "lucide-react"
import { Organization } from "@/src/db"
import { useEffect, useRef, useState } from "react"

import { ActionResult } from "@/src/lib"
import { BookingCard } from "./BookingCard"
import { Button } from "@/components/ui"
import { CompanyOptions } from "./CompanyOptions"
import { CompanyReviews } from "./CompanyReviews"
import { CompanyServices } from "./CompanyServices"
import { CompanyTeam } from "./CompanyTeam"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/src/lib/utils"

// Types et constantes
interface CompanyDetailsProps {
  data: ActionResult<Organization>
}

// Sections pour la navigation
const sections = [
  { id: "about", name: "À propos", icon: <Clipboard className="w-5 h-5" /> },
  { id: "team", name: "Équipe", icon: <Users className="w-5 h-5" /> },
  { id: "services", name: "Services", icon: <Settings className="w-5 h-5" /> },
  { id: "options", name: "Options", icon: <Settings className="w-5 h-5" /> },
  { id: "reviews", name: "Avis", icon: <MessageSquare className="w-5 h-5" /> },
]

export function CompanyDetails({ data }: CompanyDetailsProps) {
  const companyResult = data
  const [isMounted, setIsMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const [isBookingExpanded, setIsBookingExpanded] = useState(false)

  // Refs pour le défilement
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Traitement du défilement
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.9])
  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98])

  // Effet pour le montage du composant
  useEffect(() => {
    setIsMounted(true)

    // Observer pour détecter la section active au défilement
    const observer = new IntersectionObserver(
      entries => {
        entries.map(entry => {
          if (entry.isIntersecting) {
            // Trouver l'ID de la section active
            const id = Object.entries(sectionRefs.current).find(([_, el]) => el === entry.target)?.[0]
            if (id) setActiveSection(id)
          }
        })
      },
      { threshold: 0.5, rootMargin: "-20% 0px -30% 0px" }
    )

    // Observer chaque section
    Object.entries(sectionRefs.current).map(([_, ref]) => {
      if (ref instanceof HTMLElement) observer.observe(ref)
    })

    return () => {
      Object.entries(sectionRefs.current).map(([_, ref]) => {
        if (ref instanceof HTMLElement) observer.unobserve(ref)
      })
    }
  }, [isMounted])

  // Fonction pour défiler vers une section
  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId]
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setActiveSection(sectionId)
  }

  // Fonction pour enregistrer une référence de section
  const setSectionRef = (id: string, el: HTMLElement | null) => {
    sectionRefs.current[id] = el as HTMLDivElement | null
  }

  // Gestion du cas où les données ne sont pas disponibles
  if (!companyResult?.data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Aucune information disponible</p>
      </div>
    )
  }

  // Images par défaut pour la galerie
  const defaultImages = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
    "https://images.unsplash.com/photo-1470075801209-17f9ec0cada6",
    "https://images.unsplash.com/photo-1486299267070-83823f5448dd",
  ]

  // Calcul de la note moyenne si disponible
  const averageRating =
    companyResult.data.ratings && companyResult.data.ratings.length > 0
      ? (companyResult.data.ratings.reduce((acc, curr) => acc + curr.rate, 0) / companyResult.data.ratings.length)
        .toString()
        .substring(0, 3)
      : "0"

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          ref={containerRef}
          className="w-screen h-screen bg-background relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header flottant avec navigation et info essentielles */}
          <motion.header
            style={{ opacity: headerOpacity, scale: headerScale }}
            className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b shadow-sm rounded-lg"
          >
            <div className="container mx-auto py-3">
              <div className="flex justify-between items-center">
                <Link
                  href="/pros"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <ChevronLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                  <span className="font-medium">Retour</span>
                </Link>

                <AnimatePresence mode="wait">
                  <motion.div
                    key="company-info-mini"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-2"
                  >
                    <h1 className="text-lg font-bold truncate max-w-[200px] md:max-w-md">{companyResult.data.name}</h1>
                    <div className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded-full">
                      <Star className="h-3 w-3 fill-primary text-primary mr-1" />
                      <span className="text-xs font-medium">{averageRating}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Navigation par sections avec indicateur animé */}
            <div className="container mx-auto overflow-x-auto pb-2 hide-scrollbar">
              <div className="flex gap-2 md:gap-4 relative">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "py-2 px-3 md:px-4 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-colors relative",
                      activeSection === section.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {section.icon}
                    {section.name}
                    {activeSection === section.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.header>

          {/* Hero Banner */}
          <section className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10 z-10" />

            <div className="absolute inset-0 overflow-hidden">
              {/* Image de fond panoramique */}
              <Image
                src={defaultImages[0]}
                alt={`${companyResult.data.name} - Bannière`}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Overlay avec informations clés */}
            <div className="container relative z-20 mx-auto h-full flex flex-col justify-end pb-8 px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
                  {companyResult.data.name}
                </h1>

                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full">
                    <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                    <span className="font-medium">{averageRating}</span>
                    <span className="text-white/80">({companyResult.data.ratings?.length || 24})</span>
                  </div>

                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full">
                    <MapPin className="h-4 w-4" />
                    <span>Paris</span>
                  </div>

                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full">
                    <Clock className="h-4 w-4" />
                    <span>Ouvert · {companyResult.data.openAt} - {companyResult.data.closeAt}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="border-white/30 bg-black/30 text-white hover:bg-black/40 hover:text-white gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Contacter
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Contenu principal avec scroll horizontal */}
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-12 gap-6 lg:gap-10">
              {/* Contenu principal (côté gauche) */}
              <div className="col-span-12 lg:col-span-7 space-y-6 md:space-y-8">
                {/* Section À propos */}
                <motion.section
                  id="about"
                  ref={el => setSectionRef("about", el)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-card/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border shadow-sm overflow-hidden relative"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Clipboard className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-2xl font-semibold">À propos</h2>
                      </div>
                      <p className="text-muted-foreground">
                        {companyResult.data.createdAt?.getFullYear()
                          ? `Établi en ${companyResult.data.createdAt?.getFullYear()}`
                          : "Clinique vétérinaire professionnelle"}
                      </p>
                    </div>
                  </div>

                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p className="text-foreground/90 leading-relaxed">{companyResult.data?.description || ""}</p>
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-background/50 backdrop-blur-sm p-4 rounded-xl">
                        <p className="text-lg font-medium">10+</p>
                        <p className="text-sm text-muted-foreground">Années d&apos;expérience</p>
                      </div>
                      <div className="bg-background/50 backdrop-blur-sm p-4 rounded-xl">
                        <p className="text-lg font-medium">98%</p>
                        <p className="text-sm text-muted-foreground">Clients satisfaits</p>
                      </div>
                      <div className="bg-background/50 backdrop-blur-sm p-4 rounded-xl">
                        <p className="text-lg font-medium">24/7</p>
                        <p className="text-sm text-muted-foreground">Support d&apos;urgence</p>
                      </div>
                    </div>
                  </div>

                  {/* Élément décoratif animé */}
                  <motion.div
                    className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                </motion.section>

                {/* Section Équipe */}
                <motion.section
                  id="team"
                  ref={el => setSectionRef("team", el)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-card/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border shadow-sm overflow-hidden relative"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">Notre équipe</h2>
                  </div>

                  {companyResult.data?.members && <CompanyTeam professionals={companyResult.data.members} />}

                  {/* Élément décoratif animé */}
                  <motion.div
                    className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl -z-10"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                </motion.section>

                {/* Section Services */}
                <motion.section
                  id="services"
                  ref={el => setSectionRef("services", el)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border shadow-sm overflow-hidden relative"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Settings className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">Nos services</h2>
                  </div>

                  {companyResult.data?.services && <CompanyServices services={companyResult.data.services} />}

                  {/* Élément décoratif animé */}
                  <motion.div
                    className="absolute -top-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl -z-10"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                      duration: 9,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                </motion.section>

                {/* Section Options */}
                <motion.section
                  id="options"
                  ref={el => setSectionRef("options", el)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-card/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border shadow-sm overflow-hidden relative"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Settings className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">Nos options</h2>
                  </div>

                  {companyResult.data?.options && <CompanyOptions options={companyResult.data.options} />}
                </motion.section>

                {/* Section Avis */}
                <motion.section
                  id="reviews"
                  ref={el => setSectionRef("reviews", el)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-card/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border shadow-sm overflow-hidden relative"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">Avis clients</h2>
                  </div>

                  {companyResult.data?.ratings && <CompanyReviews reviews={companyResult.data.ratings} />}
                </motion.section>
              </div>

              {/* Booking Card (côté droit, sticky) */}
              <div className="col-span-12 lg:col-span-5">
                <div className="lg:sticky lg:top-[92px] mt-6 lg:mt-0">
                  <AnimatePresence mode="wait">
                    {/* Version mobile : Bouton + Carte expandable */}
                    <div className="lg:hidden w-full">
                      {!isBookingExpanded ? (
                        <motion.button
                          key="booking-button"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          onClick={() => setIsBookingExpanded(true)}
                          className="w-full py-4 px-6 bg-primary text-primary-foreground rounded-xl flex items-center justify-between shadow-lg"
                        >
                          <div className="flex items-center gap-3">
                            <CalendarDays className="h-5 w-5" />
                            <span className="font-medium">Prendre rendez-vous</span>
                          </div>
                          <ChevronDown className="h-5 w-5" />
                        </motion.button>
                      ) : (
                        <motion.div
                          key="booking-card-mobile"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="bg-card rounded-2xl border shadow-lg overflow-hidden backdrop-blur-sm"
                        >
                          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 flex items-center justify-between">
                            <div>
                              <h2 className="text-xl font-semibold">Prendre rendez-vous</h2>
                              <p className="text-muted-foreground text-sm">Sélectionnez un service et un praticien</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsBookingExpanded(false)}>
                              <ChevronDown className="h-5 w-5" />
                            </Button>
                          </div>
                          <BookingCard organization={companyResult.data} />
                        </motion.div>
                      )}
                    </div>

                    {/* Version desktop : Carte toujours visible */}
                    <motion.div
                      key="booking-card-desktop"
                      className="hidden lg:block bg-card rounded-2xl border shadow-lg overflow-hidden backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6">
                        <h2 className="text-2xl font-semibold">Prendre rendez-vous</h2>
                        <p className="text-muted-foreground">Réservez rapidement et facilement</p>
                      </div>
                      <BookingCard organization={companyResult.data} />

                      {/* Info complémentaire */}
                      <div className="p-6 border-t">
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <Clock className="h-5 w-5" />
                          <div>
                            <p className="font-medium text-foreground">Disponibilité rapide</p>
                            <p className="text-sm">Premier rendez-vous disponible demain</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Contact rapide */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-4 bg-card/40 backdrop-blur-md rounded-xl p-4 border hidden lg:block"
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Besoin d&apos;aide ?</p>
                        <p className="text-sm text-muted-foreground">Contactez-nous directement</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">
                        Appeler
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Bouton flottant de réservation (mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="fixed bottom-6 right-6 z-40 lg:hidden"
          >
            <Button
              size="lg"
              className="rounded-full h-14 w-14 shadow-lg p-0"
              onClick={() => setIsBookingExpanded(true)}
            >
              <CalendarDays className="h-6 w-6" />
            </Button>
          </motion.div>

          {/* Pied de page */}
          <footer className="mt-10 py-8 border-t">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} {companyResult.data.name} · Tous droits réservés
                </p>
                <div className="flex gap-4">
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Mentions légales
                  </a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Politique de confidentialité
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
