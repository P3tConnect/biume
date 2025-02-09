import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Form, NavLink } from '@remix-run/react';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import registerImage from '../assets/images/login-image.jpg';

export async function action({ request, context }: ActionFunctionArgs) {
  const { authService } = context;

  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const sessionToken = crypto.randomUUID();

  const user = await authService.signUp(
    {
      email: email as string,
      password: password as string,
      name: name as string,
    },
    sessionToken
  );

  if (user) {
    return redirect('/');
  }

  return null;
}

const LoginPage = () => {
  return (
    <div className='w-screen flex items-center justify-between max-h-screen m-5'>
      <div className='flex flex-col items-center justify-center w-1/2 space-y-4'>
        <h1 className='text-4xl font-bold text-primary'>Connexion</h1>
        <p className='text-gray-600 dark:text-gray-400 max-w-96 text-center pb-14'>
          Ceci est du texte de description pour justifier de l'utilité de
          s'inscrire sur notre plateforme PawThera
        </p>
        <Form
          method='post'
          className='flex flex-col items-center justify-center w-1/2 space-y-4'
        >
          <Input
            className='w-full rounded-3xl'
            type='text'
            placeholder='Nom'
            name='name'
          />
          <Input
            className='w-full rounded-3xl'
            type='email'
            placeholder='Email'
            name='email'
          />
          <Input
            className='w-full rounded-3xl'
            type='password'
            placeholder='Mot de passe'
            name='password'
          />
          <NavLink to='/forgot-password' className='pb-5'>
            <p className='text-xs underline'>Mot de passe oublié ?</p>
          </NavLink>
          <Button className='w-full rounded-3xl' type='submit'>
            Se connecter
          </Button>

          <p className='text-muted-foreground text-sm py-5'>Ou</p>

          <Button
            className='w-full h-10 rounded-3xl flex items-center justify-center gap-2'
            variant='outline'
          >
            <img
              src={'/assets/svg/facebook-icon.svg'}
              width={20}
              height={20}
              alt='facebook icon'
            />
            <p className='text-muted-foreground'>Se connecter avec Facebook</p>
          </Button>
          <Button
            className='w-full h-10 rounded-3xl flex items-center justify-center gap-2'
            variant='outline'
          >
            <img
              src={'/assets/svg/google-icon.svg'}
              width={20}
              height={20}
              alt='google icon'
            />
            <p className='text-muted-foreground'>Se connecter avec Google</p>
          </Button>

          <p className='text-sm font-normal pt-5'>
            Vous n'avez pas encore de compte ?{' '}
            <NavLink
              to='/sign-up'
              className='dark:text-blue-300 text-blue-600 hover:cursor-pointer'
            >
              Inscrivez vous !
            </NavLink>
          </p>
        </Form>
      </div>
      <div className='w-1/2 h-screen py-10 px-5'>
        <img
          width={678}
          height={1149}
          src={registerImage}
          alt='login image with a dog an its owner'
          className='rounded-3xl w-full h-full object-cover'
        />
      </div>
    </div>
  );
};

export default LoginPage;
