import React from 'react'
import { Spinner } from "@/components/loader"

const HomeLoading = () => {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      {/* Fond avec gradients similaires à la page d'accueil */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/20 to-transparent opacity-50 dark:opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-secondary/20 to-transparent opacity-50 dark:opacity-30 blur-3xl"></div>
      </div>

      <Spinner size="large" />
    </div>
  )
}

export default HomeLoading