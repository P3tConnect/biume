"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Calendar, ChevronLeft, Heart, MapPin, Phone, Share2, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui"
import { Organization } from "@/src/db"

interface CompanyHeaderProps {
  company: Organization
}

export function CompanyHeader({ company }: CompanyHeaderProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const defaultImages = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
    "https://images.unsplash.com/photo-1470075801209-17f9ec0cada6",
    "https://images.unsplash.com/photo-1486299267070-83823f5448dd",
  ]

  const displayImages = defaultImages
  const averageRating =
    company.ratings && company.ratings.length > 0
      ? (company.ratings.reduce((acc, curr) => acc + curr.rate, 0) / company.ratings.length).toFixed(1)
      : "4.8"

  return (
    <div className="space-y-6 relative">
      {/* Fond décoratif */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/pros"
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ChevronLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Retour aux résultats
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                <Phone className="h-4 w-4" />
                Contacter
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                <Heart className="h-4 w-4" />
                Enregistrer
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto pt-6">
        <AnimatePresence>
          {isMounted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="aspect-[2/1] rounded-2xl overflow-hidden grid grid-cols-4 grid-rows-2 gap-2 border shadow-md"
            >
              <div className="col-span-2 row-span-2 relative">
                <Image
                  src={displayImages[0]}
                  alt={`${company.name} - Image principale`}
                  fill
                  className="object-cover hover:opacity-90 transition-opacity cursor-pointer"
                />
              </div>
              <div className="relative">
                <Image
                  src={displayImages[1]}
                  alt={`${company.name} - Image 2`}
                  fill
                  className="object-cover hover:opacity-90 transition-opacity cursor-pointer"
                />
              </div>
              <div className="relative">
                <Image
                  src={displayImages[2]}
                  alt={`${company.name} - Image 3`}
                  fill
                  className="object-cover hover:opacity-90 transition-opacity cursor-pointer"
                />
              </div>
              <div className="relative">
                <Image
                  src={displayImages[3]}
                  alt={`${company.name} - Image 4`}
                  fill
                  className="object-cover hover:opacity-90 transition-opacity cursor-pointer"
                />
              </div>
              <div className="relative">
                <Image
                  src={displayImages[4]}
                  alt={`${company.name} - Image 5`}
                  fill
                  className="object-cover hover:opacity-90 transition-opacity cursor-pointer rounded-tr-xl"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Title Section */}
      <div className="container mx-auto">
        <AnimatePresence>
          {isMounted && (
            <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between bg-card/50 backdrop-blur-sm rounded-xl p-6 border shadow-sm">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium">{averageRating}</span>
                    <span className="text-primary/70">({company.ratings?.length || 24})</span>
                  </div>

                  <div className="flex items-center gap-1 bg-muted/50 px-3 py-1 rounded-full">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {/* <span className="text-muted-foreground">
                      {company.address || "Paris"}
                    </span> */}
                  </div>

                  <div className="flex items-center gap-1 bg-muted/50 px-3 py-1 rounded-full">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Ouvert aujourd&apos;hui · 9:00 - 19:00</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                <Button className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Prendre rendez-vous
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Partager
                </Button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
