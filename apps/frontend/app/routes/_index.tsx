import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { Header } from "../components/landing-page/header";
import { ProLanding } from "../components/landing-page/pro-landing";
import { UserLanding } from "../components/landing-page/user-landing";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const version = url.searchParams.get('version') || 'user';
  return json({ version });
}

export default function Index() {
  const { version } = useLoaderData<typeof loader>();

  return (
    <div className="w-screen h-screen">
      <Header />
      <main className='pt-16'>
        {version === 'user' ? <UserLanding /> : <ProLanding />}
      </main>
    </div>
  );
}
