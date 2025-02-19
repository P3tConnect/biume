'use client';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  clientName: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export function RecentReviewsWidget() {
  const reviews: Review[] = [
    {
      id: '1',
      clientName: 'Marie D.',
      rating: 5,
      comment: 'Service exceptionnel, très satisfaite !',
      date: '2024-03-19',
    },
    {
      id: '2',
      clientName: 'Pierre L.',
      rating: 4,
      comment: 'Très professionnel, je recommande.',
      date: '2024-03-18',
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
          }`}
      />
    ));
  };

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Avis Clients Récents</h3>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
              <Avatar>
                <AvatarImage src={review.avatar} />
                <AvatarFallback>{review.clientName.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{review.clientName}</span>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex gap-0.5 my-1">{renderStars(review.rating)}</div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
} 