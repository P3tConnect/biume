'use client';

import Stepper from '@/components/onboarding/components/stepper';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Dialog,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Skeleton,
} from '@/components/ui';
import { cn } from '@/src/lib';
import { signOut, useSession } from '@/src/lib/auth-client';
import Avvvatars from 'avvvatars-react';
import {
  BadgeCheck,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Settings,
  Sparkles,
  User2,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SidebarClientFooterComponent = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <Dialog onOpenChange={setOpen}>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              >
                {session?.user.image ? (
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <AvatarImage
                      src={session?.user.image}
                      alt={session?.user.name}
                      className='object-cover'
                    />
                    <AvatarFallback className='rounded-lg'>
                      <Skeleton className='h-8 w-8 rounded-lg bg-gray-200' />
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className='flex h-8 w-8 items-center justify-center'>
                    <Avvvatars
                      value={session?.user.email || ''}
                      size={32}
                      style='shape'
                    />
                  </div>
                )}
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    {session?.user.name}
                  </span>
                  <span className='truncate text-xs'>
                    {session?.user.email}
                  </span>
                </div>
                <ChevronsUpDown className='ml-auto size-4' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
              side={'right'}
              align='end'
              sideOffset={4}
            >
              <DropdownMenuLabel className='p-0 font-normal'>
                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                  {session?.user.image ? (
                    <Avatar className='h-8 w-8 rounded-lg'>
                      <AvatarImage
                        src={session?.user.image}
                        alt={session?.user.name}
                        className='object-cover'
                      />
                      <AvatarFallback className='rounded-lg'>
                        <Skeleton className='h-8 w-8 rounded-lg bg-gray-200' />
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className='flex h-8 w-8 items-center justify-center'>
                      <Avvvatars
                        value={session?.user.email || ''}
                        size={32}
                        style='shape'
                      />
                    </div>
                  )}
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    {isPending ? (
                      <>
                        <Skeleton className='h-4 w-full rounded-md bg-gray-200' />
                        <Skeleton className='h-4 w-full rounded-md bg-gray-200' />
                      </>
                    ) : (
                      <>
                        <span className='truncate font-semibold'>
                          {session?.user.name}
                        </span>
                        <span className='truncate text-xs'>
                          {session?.user.email}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DialogTrigger asChild>
                  <DropdownMenuItem className='gap-2'>
                    <Sparkles size={14} />
                    Become a pro
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className='gap-2'>
                  <BadgeCheck size={14} />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem className='gap-2'>
                  <CreditCard size={14} />
                  Billing
                </DropdownMenuItem>
                <Link href={`/dashboard/user/${session?.user.id}/settings`}>
                  <DropdownMenuItem className='gap-2'>
                    <Settings size={14} />
                    Settings
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='gap-2'
                onClick={async () =>
                  await signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        router.push('/sign-in');
                      },
                    },
                  })
                }
              >
                <LogOut size={14} />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <Stepper />
    </Dialog>
  );
};

export default SidebarClientFooterComponent;
