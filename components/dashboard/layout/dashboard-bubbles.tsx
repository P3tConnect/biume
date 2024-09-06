import React from 'react'

const DashboardBubbles = () => {
  return (
    <>
      <div className="absolute -top-64 left-20 -z-50">
        <div className="w-[800px] h-[800px] bg-primary rounded-full blur-3xl opacity-55"></div>
      </div>
      <div className="absolute -top-64 -right-64 -z-30">
        <div className="w-[800px] h-[800px] bg-secondary rounded-full blur-3xl opacity-55"></div>
      </div>
      <div className="absolute -bottom-64 -left-64 -z-50">
        <div className="w-[800px] h-[800px] bg-secondary rounded-full blur-3xl opacity-55"></div>
      </div>
      <div className="absolute -bottom-4 -right-64 -z-50">
        <div className="w-[800px] h-[800px] bg-primary rounded-full blur-3xl opacity-55"></div>
      </div>
    </>
  )
}

export default DashboardBubbles