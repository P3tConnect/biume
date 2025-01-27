'use client';

import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

const mockData = [
  { month: 'Jan', revenue: 1200 },
  { month: 'Fév', revenue: 1900 },
  { month: 'Mar', revenue: 1600 },
  { month: 'Avr', revenue: 2100 },
  { month: 'Mai', revenue: 2400 },
  { month: 'Juin', revenue: 2000 },
  { month: 'Juil', revenue: 2800 },
  { month: 'Août', revenue: 3100 },
  { month: 'Sept', revenue: 2900 },
  { month: 'Oct', revenue: 3300 },
  { month: 'Nov', revenue: 3500 },
  { month: 'Déc', revenue: 3800 },
];

export function FinancialStatsWidget() {
  const { data, isLoading } = useQuery({
    queryKey: ['financial-stats'],
    queryFn: async () => {
      // Simuler un délai de chargement
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mockData;
    },
  });

  if (isLoading) {
    return <Skeleton className="w-full h-[300px]" />;
  }

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Statistiques Financières</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
} 