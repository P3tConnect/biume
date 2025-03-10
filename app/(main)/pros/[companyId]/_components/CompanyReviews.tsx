import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Star } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui"
import { Rating } from "@/src/db"

interface CompanyReviewsProps {
  reviews: Rating[]
}

export function CompanyReviews({ reviews }: CompanyReviewsProps) {
  return (
    <div>
      {reviews.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-muted-foreground">Aucun avis client disponible pour le moment.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{review.writer.name}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{review.writer.name}</p>
                    <div className="flex">
                      {Array.from({ length: review.rate }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(review.createdAt!), "d MMM yyyy", {
                    locale: fr,
                  })}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
