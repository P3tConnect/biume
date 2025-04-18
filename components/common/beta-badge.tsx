import { StarsIcon } from "lucide-react"

export const BetaBadge = () => {
  return (
    <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-full flex flex-row items-center gap-1">
      <StarsIcon className="w-4 h-4 font-bold" />
      <p>Beta</p>
    </span>
  )
}