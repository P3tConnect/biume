'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from '@/components/ui';
import { Euro, TrendingUp, ChevronRight, Receipt } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/src/lib/auth-client';

// Types
type ExpenseSummary = {
  category: string;
  amount: number;
  icon: string;
  change: number;
};

// Données de test
const expensesSummary: ExpenseSummary[] = [
  {
    category: 'Ce mois',
    amount: 1000,
    icon: '📅',
    change: 8.7,
  },
  {
    category: 'Moyenne/animal',
    amount: 250,
    icon: '🐾',
    change: -2.3,
  },
  {
    category: 'Prochain RDV',
    amount: 65,
    icon: '🏥',
    change: 0,
  },
];

const ClientExpensesWidget = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return (
    <Card className='rounded-xl'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='flex items-center gap-2'>
          <Receipt className='size-5' />
          Dépenses
        </CardTitle>
        <Button
          variant='ghost'
          size='sm'
          className='text-sm'
          onClick={() => router.push(`/dashboard/user/${userId}/expenses`)}
        >
          Détails
          <ChevronRight className='size-4 ml-1' />
        </Button>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          {expensesSummary.map((item, index) => (
            <div
              key={index}
              className='flex items-center justify-between p-3 rounded-lg bg-accent/50'
            >
              <div className='flex items-center gap-3'>
                <div className='text-2xl'>{item.icon}</div>
                <div>
                  <p className='text-sm font-medium'>{item.category}</p>
                  <p className='text-lg font-bold'>{item.amount}€</p>
                </div>
              </div>
              {item.change !== 0 && (
                <div
                  className={`flex items-center gap-1 text-sm ${item.change > 0 ? 'text-red-500' : 'text-green-500'
                    }`}
                >
                  <TrendingUp
                    className={`size-4 ${item.change > 0 ? '' : 'rotate-180'}`}
                  />
                  <span>{Math.abs(item.change)}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientExpensesWidget; 