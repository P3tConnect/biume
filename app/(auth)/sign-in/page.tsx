"use client";

import { Button, Input } from "@/components/ui";
import { loginSchema } from "@/src/lib";
import { signIn } from "@/src/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const LoginPage = () => {
  redirect("/");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    await signIn.email(
      {
        email: data.email,
        password: data.password,
        rememberMe: false,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: (ctx) => {
          console.log(ctx, "ctx");
          toast.success("Connexion réussie ! Vous allez être redirigé ...");
          router.push(`/dashboard/user/${ctx.data.user.id}`);
        },
        onError: (error) => {
          setLoading(false);
          console.log(error, "error");
          toast.error(`Error : ${error.error.message}`);
        },
      },
    );
  });

  return (
    <div className="w-screen flex items-center justify-between max-h-screen px-5">
      <div className="flex flex-col items-center justify-center w-1/2 space-y-4">
        <h1 className="text-4xl font-bold text-primary">Connexion</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-96 text-center pb-14">
          Ceci est du texte de description pour justifier de l&apos;utilité de
          s&apos;inscrire sur notre plateforme Biume
        </p>
        <form
          className="flex flex-col items-center justify-center w-1/2 space-y-4"
          onSubmit={onSubmit}
        >
          <Input
            className="w-96 rounded-3xl"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          <Input
            className="w-96 rounded-3xl"
            type="password"
            placeholder="Mot de passe"
            {...register("password")}
          />
          <Link href="/forgot-password" className="pb-5">
            <p className="text-xs underline">Mot de passe oublié ?</p>
          </Link>
          <Button disabled={loading} className="w-96 rounded-3xl" type="submit">
            Se connecter
          </Button>

          <p className="text-muted-foreground text-sm py-5">Ou</p>

          <Button
            className="w-full h-10 rounded-3xl flex items-center justify-center gap-2"
            variant="outline"
            disabled={loading}
          >
            <Image
              src={"/assets/svg/facebook-icon.svg"}
              width={20}
              height={20}
              alt="facebook icon"
            />
            <p className="text-muted-foreground">Se connecter avec Facebook</p>
          </Button>
          <Button
            className="w-full h-10 rounded-3xl flex items-center justify-center gap-2"
            variant="outline"
            disabled={loading}
          >
            <Image
              src={"/assets/svg/google-icon.svg"}
              width={20}
              height={20}
              alt="google icon"
            />
            <p className="text-muted-foreground">Se connecter avec Google</p>
          </Button>

          <p className="text-sm font-normal pt-5">
            Vous n&apos;avez pas encore de compte ?{" "}
            <Link
              href="/sign-up"
              className="dark:text-blue-300 text-blue-600 hover:cursor-pointer"
            >
              Inscrivez vous !
            </Link>
          </p>
        </form>
      </div>
      <div className="w-1/2 h-screen py-10 px-5">
        <Image
          priority
          width={678}
          height={1149}
          quality={30}
          objectFit="cover"
          src={"/assets/images/login-image.jpg"}
          alt="login image with a dog an its owner"
          className="rounded-3xl w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
