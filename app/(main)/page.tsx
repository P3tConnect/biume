import ClientHome from "@/components/landing-page/client-home";

export default async function Home({ searchParams }: { searchParams: Promise<{ version?: string }> }) {

  const { version } = await searchParams;

  return (
    <ClientHome searchParams={{ version }} />
  );
}
