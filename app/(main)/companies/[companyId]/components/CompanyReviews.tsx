import { Avatar, AvatarFallback, Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Star } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

interface CompanyReviewsProps {
  reviews: Review[];
}

export function CompanyReviews({ reviews }: CompanyReviewsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Avis clients</CardTitle>
        <Button variant="ghost" size="sm">
          Voir tout
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {review.author.split(" ")[0][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{review.author}</p>
                    <div className="flex">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(review.date), "d MMM yyyy", {
                    locale: fr,
                  })}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 