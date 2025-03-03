'use client';

import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';
import { Calendar, PawPrint, Plus, Users, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/src/lib/auth-client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const BookingDialog = ({ userId }: { userId: string }) => {
  const router = useRouter();

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Nouvelle réservation</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 py-4">
        <Button
          variant="outline"
          className="flex flex-col items-center gap-4 h-auto p-6"
          onClick={() => router.push(`/dashboard/user/${userId}/my-pros`)}
        >
          <Users className="h-8 w-8 text-blue-500" />
          <span className="text-sm">Reprendre rendez-vous</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col items-center gap-4 h-auto p-6"
          onClick={() => router.push('/pros')}
        >
          <UserPlus className="h-8 w-8 text-orange-500" />
          <span className="text-sm">Nouveau rendez-vous</span>
        </Button>
      </div>
    </DialogContent>
  );
};

const ClientQuickActionsWidget = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const quickActions = [
    {
      title: 'Nouvelle réservation',
      icon: Plus,
      color: 'bg-blue-500/10 text-blue-500',
      component: (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant='ghost'
              className='h-auto py-4 flex flex-col items-center gap-3 hover:bg-accent/50 transition-colors w-full'
            >
              <div className={`p-3 rounded-xl bg-blue-500/10 text-blue-500`}>
                <Plus className='size-5' />
              </div>
              <span className='text-sm font-medium'>Nouvelle réservation</span>
            </Button>
          </DialogTrigger>
          <BookingDialog userId={userId || ''} />
        </Dialog>
      ),
    },
    {
      title: 'Mes rendez-vous',
      icon: Calendar,
      color: 'bg-purple-500/10 text-purple-500',
      onClick: () => router.push(`/dashboard/user/${userId}/reservations`),
    },
    {
      title: 'Mes animaux',
      icon: PawPrint,
      color: 'bg-green-500/10 text-green-500',
      onClick: () => router.push(`/dashboard/user/${userId}/pets`),
    }
  ];

  return (
    <Card className='rounded-xl'>
      <CardHeader>
        <CardTitle>
          Actions rapides
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          {quickActions.map((action, index) => (
            action.component ? (
              <div key={index}>
                {action.component}
              </div>
            ) : (
              <Button
                key={index}
                variant='ghost'
                className='h-auto py-4 flex flex-col items-center gap-3 hover:bg-accent/50 transition-colors'
                onClick={action.onClick}
              >
                <div className={`p-3 rounded-xl ${action.color}`}>
                  <action.icon className='size-5' />
                </div>
                <span className='text-sm font-medium'>{action.title}</span>
              </Button>
            )
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientQuickActionsWidget; 