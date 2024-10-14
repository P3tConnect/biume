"use client";

import { Button, Input } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { logger, registerSchema, signIn } from "@/src/lib";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerNewUser } from "@/src/actions/user.action";
import { useServerActionMutation } from "@/src/hooks";
import { redirect, useRouter } from "next/navigation";

const RegisterClientPage = (params: { locale: string }) => {
  // redirect('/')
  const [message, setMessage] = useState("");
  const router = useRouter();

  const { register, handleSubmit } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const { mutateAsync, isPending } = useServerActionMutation(registerNewUser);

  const onSubmit = handleSubmit(async (data) => {
    const response = await mutateAsync(data);

    if (response.ok) {
      router.push(`/${params.locale}/onboarding`);
    }

    if (response.message) {
      setMessage(response.message);
    }
  });

  return (
    <div className="w-screen flex items-center justify-between max-h-screen px-5">
      <div className="flex flex-col items-center justify-center w-1/2 space-y-4">
        <h1 className="text-4xl font-bold text-secondary">Inscription</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-96 text-center pb-14">
          Ceci est du texte de description pour justifier de l'utilité de
          s'inscrire sur notre plateforme PawThera
        </p>
        <form className="flex flex-col items-center justify-center w-1/2 space-y-4" onSubmit={onSubmit}>
          <Input className="w-96 rounded-3xl" type="text" placeholder="Nom" {...register("name")} />
          <Input
            className="rounded-3xl w-96"
            type="text"
            placeholder="Prénom"
            {...register("firstname")}
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

          <Button
            className="w-96 rounded-3xl"
            variant={"secondary"}
            disabled={isPending}
            type="submit"
          >
            S'inscrire
          </Button>

          {message && <p className="text-red-500 text-sm">{message}</p>}

          <p className="text-muted-foreground text-sm py-5">Ou</p>

          <Button
            className="w-96 h-10 rounded-3xl flex items-center justify-center gap-2"
            variant="outline"
          >
            <Image
              src={"/assets/svg/facebook-icon.svg"}
              width={20}
              height={20}
              alt="facebook icon"
            />
            <p className="text-muted-foreground">S'inscrire avec Facebook</p>
          </Button>
          <Button
            className="w-96 h-10 rounded-3xl flex items-center justify-center gap-2"
            variant="outline"
          >
            <Image
              src={"/assets/svg/google-icon.svg"}
              width={20}
              height={20}
              alt="google icon"
            />
            <p className="text-muted-foreground">S'inscrire avec Google</p>
          </Button>
          <p className="text-sm font-normal pt-5">Vous avez déjà un compte ? <Link href="/login" className="dark:text-blue-300 text-blue-600 hover:cursor-pointer">Connectez vous !</Link></p>
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
          className="rounded-[45px] w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default RegisterClientPage;
