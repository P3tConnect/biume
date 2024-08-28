export function Bubbles() {
  return (
    <>
      <div className="absolute inset-0 top-[-110%] left-[10%] flex justify-center items-center -z-50">
        <div className="w-[667px] h-[558px] bg-[#6BDA97] rounded-full blur-3xl opacity-55"></div>
      </div>
      <div className="absolute inset-0  top-[-25%] right-[-15%] flex justify-center items-center -z-50">
        <div className="w-[1000px] h-[800px] rounded-full bg-gradient-to-r from-[#331CCCB2] via-[#B2387EB2] to-[#B2387EB2] opacity-[43%] blur-3xl"></div>
      </div>
      <div className="absolute inset-0 right-[80%] flex justify-center items-center -z-50">
        <div className="w-[800px] h-[800px] rounded-full bg-[#08297B] opacity-[43%] blur-3xl"></div>
      </div>
      <div className="absolute inset-0 bottom-[-60%] right-[80%] flex justify-center items-center -z-50">
        <div className="w-[696px] h-[695px] rounded-full bg-[#B2387E] opacity-35 blur-3xl"></div>
      </div>
      <div className="absolute inset-0 bottom-[-30%] left-[80%] flex justify-center items-center -z-50">
        <div className="w-[1000px] h-[700px] rounded-full bg-[#FF950080]  blur-3xl"></div>
      </div>
    </>
  );
}
