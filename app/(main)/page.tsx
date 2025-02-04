'use client';

import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/landing-page/header';
import { UserLanding } from '@/components/landing-page/user-landing';
import { ProLanding } from '@/components/landing-page/pro-landing';

export default function Home() {
  const searchParams = useSearchParams();
  const version = searchParams.get('version') || 'user';

  return (
    <>
      <Header />
      <main className='pt-16'>
        {version === 'user' ? <UserLanding /> : <ProLanding />}
      </main>
    </>
  );
}
