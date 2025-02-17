"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import { CompanyHeader } from "./CompanyHeader";
import { CompanyTeam } from "./CompanyTeam";
import { CompanyServices } from "./CompanyServices";
import { CompanyOptions } from "./CompanyOptions";
import { CompanyReviews } from "./CompanyReviews";
import { Separator } from "@/components/ui";
import { Organization } from "@/src/db";
import { ActionResult } from "@/src/lib";
import { BookingCard } from "./BookingCard";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface CompanyDetailsProps {
  data: Promise<
    ActionResult<Organization>
  >;
}

export function CompanyDetails({ data }: CompanyDetailsProps) {
  const companyResult = use(data);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedPro, setSelectedPro] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <div className="h-screen w-screen bg-background">
      {companyResult?.data && (
        <CompanyHeader
          company={companyResult.data}
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
                {companyResult.data?.description}
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
              <h2 className="text-2xl font-semibold mb-6">L&apos;équipe</h2>
              {companyResult.data?.members && (
                <CompanyTeam professionals={companyResult.data.members} />
              )}
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
              <h2 className="text-2xl font-semibold mb-6">Nos options</h2>
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
              <h2 className="text-2xl font-semibold mb-6">Les avis clients</h2>
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
                services={companyResult.data?.services || []}
                professionals={companyResult.data?.members || []}
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
