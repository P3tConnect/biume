"use client";

import { Button, Input } from "@/components/ui";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { registerSchema } from "@/src/lib";
import { signUp } from "@/src/lib/auth-client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterClientPage = () => {
  redirect("/");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
        image: "",
        isPro: false,
        onBoardingComplete: false,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: (ctx) => {
          toast.success("Inscription réussie ! Vous allez être redirigé ...");
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
        <h1 className="text-4xl font-bold text-primary">Inscription</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-96 text-center pb-14">
          Ceci est du texte de description pour justifier de l&apos;utilité de
          s&apos;inscrire sur notre plateforme Biume
        </p>
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center justify-center w-1/2 space-y-4"
        >
          <Input
            className="w-96 rounded-3xl"
            type="text"
            placeholder="Nom d'utilisateur"
            {...register("name")}
          />
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

          <div className="h-5" />

          <Button className="w-96 rounded-3xl" type="submit" disabled={loading}>
            S&apos;inscrire
          </Button>

          <p className="text-muted-foreground text-sm py-5">Ou</p>

          <Button
            className="w-full h-10 rounded-3xl flex items-center justify-center gap-2"
            variant="outline"
          >
            <Image
              src={"/assets/svg/facebook-icon.svg"}
              width={20}
              height={20}
              alt="facebook icon"
            />
            <p className="text-muted-foreground">
              S&apos;inscrire avec Facebook
            </p>
          </Button>
          <Button
            className="w-full h-10 rounded-3xl flex items-center justify-center gap-2"
            variant="outline"
          >
            <Image
              src={"/assets/svg/google-icon.svg"}
              width={20}
              height={20}
              alt="google icon"
            />
            <p className="text-muted-foreground">S&apos;inscrire avec Google</p>
          </Button>
          <p className="text-sm font-normal pt-5">
            Vous avez déjà un compte ?{" "}
            <Link
              href="/sign-in"
              className="dark:text-blue-300 text-blue-600 hover:cursor-pointer"
            >
              Connectez vous !
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
          src={"/assets/images/register-image.jpg"}
          alt="login image with a dog an its owner"
          className="rounded-3xl w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default RegisterClientPage;
