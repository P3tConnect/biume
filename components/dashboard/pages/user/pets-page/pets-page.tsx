'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PawPrint,
  Calendar,
  Weight,
  Ruler,
  Heart,
  Search,
  Plus,
  Dog,
  Cat,
  Bird,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

// Données de démonstration
const mockPets = [
  {
    id: '1',
    name: 'Rex',
    type: 'Dog',
    birthDate: new Date('2020-01-01'),
    weight: 25,
    height: 60,
    furColor: 'Marron',
    eyeColor: 'Bleu',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
  },
  {
    id: '2',
    name: 'Minou',
    type: 'Cat',
    birthDate: new Date('2021-03-15'),
    weight: 4,
    height: 25,
    furColor: 'Noir et Blanc',
    eyeColor: 'Vert',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
  },
  {
    id: '3',
    name: 'Piou',
    type: 'Bird',
    birthDate: new Date('2022-06-30'),
    weight: 0.3,
    height: 15,
    furColor: 'Jaune',
    eyeColor: 'Noir',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3',
  },
];

const stats = [
  {
    name: 'Chiens',
    value: '2',
    icon: Dog,
  },
  {
    name: 'Chats',
    value: '3',
    icon: Cat,
  },
  {
    name: 'Oiseaux',
    value: '1',
    icon: Bird,
  },
];

const PetCard = ({ pet }: { pet: (typeof mockPets)[0] }) => {
  const age = Math.floor(
    (new Date().getTime() - pet.birthDate.getTime()) /
      (1000 * 60 * 60 * 24 * 365)
  );

  return (
    <Card className='overflow-hidden hover:shadow-lg transition-all duration-300'>
      <div className='relative h-48 overflow-hidden'>
        <img
          src={pet.image}
          alt={pet.name}
          className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
        />
        <div className='absolute top-2 right-2'>
          <Badge
            variant='secondary'
            className='font-semibold bg-background/80 backdrop-blur-sm'
          >
            {pet.type}
          </Badge>
        </div>
      </div>
      <CardHeader className='relative pb-2'>
        <div className='flex justify-between items-center'>
          <CardTitle className='text-xl flex items-center gap-2'>
            <Heart className='h-5 w-5 text-red-500 fill-red-500' />
            {pet.name}
          </CardTitle>
          <CardDescription className='flex items-center gap-1'>
            <Calendar className='h-4 w-4' />
            {age} {age > 1 ? 'ans' : 'an'}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className='grid gap-3'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex items-center gap-2'>
            <PawPrint className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm'>{pet.type}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Weight className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm'>{pet.weight} kg</span>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex items-center gap-2'>
            <div
              className='w-3 h-3 rounded-full'
              style={{ backgroundColor: pet.furColor }}
            />
            <span className='text-sm'>{pet.furColor}</span>
          </div>
          <div className='flex items-center gap-2'>
            <div
              className='w-3 h-3 rounded-full'
              style={{ backgroundColor: pet.eyeColor }}
            />
            <span className='text-sm'>{pet.eyeColor}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between gap-2 bg-muted/50'>
        <Button variant='outline' className='w-full'>
          Détails
        </Button>
        <Button variant='default' className='w-full'>
          Modifier
        </Button>
      </CardFooter>
    </Card>
  );
};

const PetsPage = () => {
  return (
    <div className='mx-auto p-6 space-y-8'>
      <div className='grid gap-4 md:grid-cols-3'>
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium'>{stat.name}</CardTitle>
              <stat.icon className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='flex flex-col md:flex-row gap-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input placeholder='Rechercher un animal...' className='pl-8' />
        </div>
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder="Type d'animal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tous</SelectItem>
            <SelectItem value='dog'>Chiens</SelectItem>
            <SelectItem value='cat'>Chats</SelectItem>
            <SelectItem value='bird'>Oiseaux</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <Plus className='mr-2 h-4 w-4' />
          Ajouter
        </Button>
      </div>

      <Tabs defaultValue='grid' className='w-full'>
        <TabsList className='mb-4'>
          <TabsTrigger value='grid'>Vue Grille</TabsTrigger>
          <TabsTrigger value='list'>Vue Liste</TabsTrigger>
        </TabsList>
        <TabsContent value='grid'>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {mockPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value='list'>
          <div className='space-y-4'>
            {mockPets.map((pet) => (
              <Card key={pet.id} className='flex items-center p-4'>
                <img
                  src={pet.image}
                  alt={pet.name}
                  className='w-16 h-16 rounded-full object-cover mr-4'
                />
                <div className='flex-1'>
                  <h3 className='font-semibold'>{pet.name}</h3>
                  <p className='text-sm text-muted-foreground'>{pet.type}</p>
                </div>
                <Button variant='ghost'>Voir plus</Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PetsPage;
