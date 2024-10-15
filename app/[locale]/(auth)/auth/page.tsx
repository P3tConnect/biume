"use client";

import { Button, Input } from "@/components/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loginWithCredentials, registerNewUser } from "@/src/actions";
import { useServerActionMutation } from "@/src/hooks";
import { loginSchema, registerSchema } from "@/src/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Error } from "@/src/lib/types";
import { useSearchParams } from "next/navigation";

const errorAuthMap = {
  [Error.Configuration]: (
    <p className="text-red-400 font-medium text-lg">
      There was a problem when trying to authenticate. Please contact us if this
      error persists. Unique error code:{" "}
      <code className="rounded-sm bg-slate-100 p-1 text-xs">Configuration</code>
    </p>
  ),
  [Error.AccessDenied]: (
    <p>
      There was a problem when trying to authenticate. You are not authorized to
      access this resource. Please contact us if this error persists. Unique
      error code:{" "}
      <code className="rounded-sm bg-slate-100 p-1 text-xs">AccessDenied</code>
    </p>
  ),
  [Error.Verification]: (
    <p>
      There was a problem when trying to authenticate. Your account is not
      verified. Please contact us if this error persists. Unique error code:{" "}
      <code className="rounded-sm bg-slate-100 p-1 text-xs">Verification</code>
    </p>
  ),
  [Error.Default]: (
    <p>
      There was a problem when trying to authenticate. Please contact us if this
      error persists. Unique error code:{" "}
      <code className="rounded-sm bg-slate-100 p-1 text-xs">Default</code>
    </p>
  ),
};

const AuthPage = () => {
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState("login");
  const searchParams = useSearchParams();
  const error = searchParams.get("error") as Error;

  const { handleSubmit: loginHandleSubmit, register: loginRegister } = useForm<
    z.infer<typeof loginSchema>
  >({
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit: registerHandleSubmit, register } = useForm<
    z.infer<typeof registerSchema>
  >({
    resolver: zodResolver(registerSchema),
  });

  const { mutateAsync: loginMutateAsync, isPending: loginPending } =
    useServerActionMutation(loginWithCredentials, {
      onError({ name }) {
        if (name == "CredentialsSignin") {
          setMessage("Your account already exists");
        }
        if (name == "AccessDenied") {
          setMessage("Your account is not allowed to login");
        }
      },
    });

  const { mutateAsync: registerMutateAsync, isPending: registerPending } =
    useServerActionMutation(registerNewUser, {
      onError({ name }) {
        if (name == "CredentialsSignin") {
          setMessage("Your account already exists");
        }
        if (name == "AccessDenied") {
          setMessage("Your account is not allowed to login");
        }
      },
    });

  const loginOnSubmit = loginHandleSubmit(async (data) => {
    await loginMutateAsync(data);
  });

  const registerOnSubmit = registerHandleSubmit(async (data) => {
    await registerMutateAsync(data);
  });

  return (
    <div className="w-screen flex items-center justify-between max-h-screen px-5">
      <div className="flex flex-col items-center justify-center w-1/2 space-y-4">
        <h1 className="text-4xl font-bold text-secondary">
          {tab == "login" ? "Connexion" : "Inscription"}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-96 text-center pb-10">
          Ceci est du texte de description pour justifier de l'utilité de
          s'inscrire sur notre plateforme PawThera
        </p>
        <form
          className="flex flex-col items-center justify-center w-1/2 space-y-4 h-96"
          onSubmit={tab === "login" ? loginOnSubmit : registerOnSubmit}
        >
          <Tabs
            defaultValue="login"
            className="w-96 h-96"
            onValueChange={setTab}
          >
            <TabsList className="w-96 mb-5">
              <TabsTrigger value="login">Se connecter</TabsTrigger>
              <TabsTrigger value="register">S'inscrire</TabsTrigger>
            </TabsList>
            <TabsContent
              value="login"
              className="flex flex-col items-center justify-center space-y-4"
            >
              <Input
                className="w-96 rounded-3xl"
                type="email"
                placeholder="Email"
                {...loginRegister("email")}
              />
              <Input
                className="w-96 rounded-3xl"
                type="password"
                placeholder="Mot de passe"
                {...loginRegister("password")}
              />
              <Link href="/forgot-password" className="pb-5">
                <p className="text-xs underline">Mot de passe oublié ?</p>
              </Link>
              <Button
                className="w-96 rounded-3xl"
                variant={"secondary"}
                disabled={loginPending}
                type="submit"
              >
                Se connecter
              </Button>

              {error ? errorAuthMap[error] : null}
              {message && <p className="text-red-500 text-sm">{message}</p>}

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
                  Se connecter avec Facebook
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
                <p className="text-muted-foreground">
                  Se connecter avec Google
                </p>
              </Button>

              <p className="text-sm font-normal pt-5">
                Vous n'avez pas encore de compte ?{" "}
                <Link
                  href="/register"
                  className="dark:text-blue-300 text-blue-600 hover:cursor-pointer"
                >
                  Inscrivez vous !
                </Link>
              </p>
            </TabsContent>
            <TabsContent
              value="register"
              className="flex flex-col items-center justify-center space-y-4"
            >
              <Input
                className="w-96 rounded-3xl"
                type="text"
                placeholder="Nom"
                {...register("name")}
              />
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
                disabled={registerPending}
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
                <p className="text-muted-foreground">
                  S'inscrire avec Facebook
                </p>
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
              <p className="text-sm font-normal pt-5">
                Vous avez déjà un compte ?{" "}
                <Link
                  href="/login"
                  className="dark:text-blue-300 text-blue-600 hover:cursor-pointer"
                >
                  Connectez vous !
                </Link>
              </p>
            </TabsContent>
          </Tabs>
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
          className="rounded-[45px] w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthPage;
