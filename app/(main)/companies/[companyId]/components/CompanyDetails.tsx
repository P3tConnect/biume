"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import { CompanyHeader } from "./CompanyHeader";
import { CompanyTeam } from "./CompanyTeam";
import { CompanyServices } from "./CompanyServices";
import { CompanyOptions } from "./CompanyOptions";
import { CompanyReviews } from "./CompanyReviews";
import { BookingCard } from "./BookingCard";
import { Separator } from "@/components/ui";
import { Organization, Service, Rating, Option } from "@/src/db";
import { ActionResult } from "@/src/lib";

// Mock data
const mockProfessionals = [
  {
    id: "1",
    name: "Dr. Sophie Martin",
    role: "Vétérinaire",
    speciality: "Chirurgie",
    rating: 4.8,
    reviews: 127,
    image: "/avatars/sophie-martin.jpg",
    availability: [
      { date: "2024-03-20", slots: ["09:00", "10:00", "14:00", "15:00"] },
      { date: "2024-03-21", slots: ["11:00", "13:30", "16:00"] },
    ],
  },
  {
    id: "2",
    name: "Dr. Thomas Bernard",
    role: "Vétérinaire",
    speciality: "Médecine générale",
    rating: 4.9,
    reviews: 93,
    image: "/avatars/thomas-bernard.jpg",
    availability: [
      { date: "2024-03-20", slots: ["10:30", "11:30", "15:30"] },
      { date: "2024-03-21", slots: ["09:30", "14:00", "16:30"] },
    ],
  },
];

const mockServices = [
  {
    id: "1",
    name: "Consultation générale",
    duration: "30 min",
    price: "50€",
  },
  {
    id: "2",
    name: "Vaccination",
    duration: "20 min",
    price: "40€",
  },
  {
    id: "3",
    name: "Chirurgie de stérilisation",
    duration: "1h30",
    price: "200€",
  },
];

const mockOptions = [
  {
    id: "1",
    name: "Parking gratuit",
    description: "Stationnement facile",
    icon: "🚗",
  },
  {
    id: "2",
    name: "Urgences 24/7",
    description: "Service d'urgence disponible",
    icon: "🏥",
  },
  {
    id: "3",
    name: "Téléconsultation",
    description: "Consultations en ligne",
    icon: "📱",
  },
  {
    id: "4",
    name: "Paiement facilité",
    description: "CB, espèces, paiement en plusieurs fois",
    icon: "💳",
  },
];

const mockReviews = [
  {
    id: "1",
    author: "Marie D.",
    rating: 5,
    date: "2024-02-15",
    comment:
      "Excellent accueil et professionnalisme remarquable. Je recommande vivement !",
  },
  {
    id: "2",
    author: "Pierre L.",
    rating: 4,
    date: "2024-02-10",
    comment: "Très bonne prise en charge de mon chat. Personnel attentionné.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface CompanyDetailsProps {
  company: Promise<
    ActionResult<{
      company: Organization;
      ratings: Rating[];
      options: Option[];
      services: Service[];
    }>
  >;
}

export function CompanyDetails({ company }: CompanyDetailsProps) {
  const companyResult = use(company);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedPro, setSelectedPro] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // const company = {
  //   id: companyId,
  //   name: "Clinique Vétérinaire du Parc",
  //   description:
  //     "Votre clinique vétérinaire de confiance, offrant des soins de qualité pour vos animaux de compagnie depuis 2010. Notre équipe expérimentée est à votre service pour tous types de soins, des consultations de routine aux interventions chirurgicales.",
  //   email: "contact@vetduparc.fr",
  //   phone: "+33 1 23 45 67 89",
  //   address: "123 Avenue du Parc, 75001 Paris",
  //   openingHours: {
  //     monday: "09:00 - 19:00",
  //     tuesday: "09:00 - 19:00",
  //     wednesday: "09:00 - 19:00",
  //     thursday: "09:00 - 19:00",
  //     friday: "09:00 - 19:00",
  //     saturday: "10:00 - 17:00",
  //     sunday: "Fermé",
  //   },
  //   rating: 4.8,
  //   reviews: 220,
  //   images: ["/clinique-1.jpg", "/clinique-2.jpg", "/clinique-3.jpg"],
  // };

  return (
    <div className="h-screen w-screen bg-background">
      {companyResult?.data && (
        <CompanyHeader
          company={companyResult.data.company}
          ratings={companyResult.data.ratings}
          options={companyResult.data.options}
          services={companyResult.data.services}
        />
      )}

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-7 space-y-8">
            {/* About Section */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between pb-6">
                <div>
                  <h2 className="text-2xl font-semibold">À propos</h2>
                  <p className="text-muted-foreground">
                    Clinique vétérinaire · Depuis 2010
                  </p>
                </div>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🏥</span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {companyResult?.data?.company.description}
              </p>
              <Separator className="my-8" />
            </motion.div>

            {/* Team Section */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-6">L'équipe</h2>
              <CompanyTeam professionals={mockProfessionals} />
              <Separator className="my-8" />
            </motion.div>

            {/* Services Section */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Nos services</h2>
              {companyResult.data?.services && (
                <CompanyServices services={companyResult.data.services} />
              )}
              <Separator className="my-8" />
            </motion.div>

            {/* Options Section */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Options</h2>
              {companyResult.data?.options && (
                <CompanyOptions options={companyResult.data.options} />
              )}
              <Separator className="my-8" />
            </motion.div>

            {/* Reviews Section */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Avis clients</h2>
              {companyResult.data?.ratings && (
                <CompanyReviews reviews={companyResult.data.ratings} />
              )}
            </motion.div>
          </div>

          {/* Booking Card */}
          <div className="col-span-12 lg:col-span-5">
            <motion.div
              className="sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BookingCard
                services={mockServices}
                professionals={mockProfessionals}
                selectedService={selectedService}
                selectedPro={selectedPro}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                setSelectedService={setSelectedService}
                setSelectedPro={setSelectedPro}
                setSelectedDate={setSelectedDate}
                setSelectedTime={setSelectedTime}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
