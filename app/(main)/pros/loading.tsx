const LoadingCompanies = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
          <div className="h-2.5 w-2.5 rounded-full bg-primary/80 animate-pulse" />
          <div className="h-2.5 w-2.5 rounded-full bg-primary/60 animate-pulse" />
          <div className="h-2.5 w-2.5 rounded-full bg-primary/40 animate-pulse" />
          <div className="h-2.5 w-2.5 rounded-full bg-primary/20 animate-pulse" />
        </div>
        <p className="text-sm text-muted-foreground font-medium">Chargement en cours...</p>
      </div>
    </div>
  )
}

export default LoadingCompanies
