import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export async function loader({ context }: LoaderFunctionArgs) {
  const { remixService } = context;
  const hello = remixService.getHello();
  return json({
    data: hello
  });
}

export default function RemixRoute() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <h1 className='text-2xl font-bold'>{data}</h1>
    </div>
  );
} 