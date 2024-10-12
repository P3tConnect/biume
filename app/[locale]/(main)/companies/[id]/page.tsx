import DisponibilitiesSection from '@/components/company-details/disponibilities-section'
import CompanyDetailsHeader from '@/components/company-details/header'
import CompanyDetailsHero from '@/components/company-details/hero'
import RatesSection from '@/components/company-details/rates-section'
import RelevantCompanySection from '@/components/company-details/relevant-company-section'
import TabsSection from '@/components/company-details/tabs-section'
import ZoneSection from '@/components/company-details/zone-section'
import { redirect } from 'next/navigation'
import React from 'react'
import { Footer } from 'react-day-picker'

const CompanyDetailPage = () => {
  redirect('/')
  return (
    <>
      <CompanyDetailsHero />
      <CompanyDetailsHeader />
      <div className='flex items-start justify-center h-full gap-5 p-5'>
        <TabsSection />
        <div className='flex flex-col items-center justify-center h-full w-1/2 gap-5'>
          <RatesSection />
          <DisponibilitiesSection />
        </div>
      </div>
      <ZoneSection />
      <RelevantCompanySection />
      <Footer />
    </>
  )
}

export default CompanyDetailPage