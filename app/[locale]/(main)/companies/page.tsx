import DisponibilitiesSection from '@/components/company/disponibilities-section'
import CompanyDetailsHeader from '@/components/company/header'
import CompanyDetailsHero from '@/components/company/hero'
import RatesSection from '@/components/company/rates-section'
import RelevantCompanySection from '@/components/company/relevant-company-section'
import TabsSection from '@/components/company/tabs-section'
import ZoneSection from '@/components/company/zone-section'
import Footer from '@/components/landing/footer'
import React from 'react'

const CompanyListPage = () => {
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

export default CompanyListPage