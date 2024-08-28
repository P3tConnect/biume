"use client";

import { Button, Input } from "@/components/ui";

import { Loader } from "lucide-react";
import { emailSchema } from "@/src/lib/schemas";
import { newSubWaitList } from "@/src/actions";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CallToActionSection() {
  const t = useTranslations("LandingPage");

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isLoading },
  //   reset,
  // } = useForm<z.infer<typeof emailSchema>>({
  //   resolver: zodResolver(emailSchema),
  //   defaultValues: {
  //     email: "",
  //   },
  // });

  // const onSubmit = handleSubmit(async (data) => {
  //   const response = await newSubWaitList({ email: data.email });

  //   if (response?.serverError) {
  //     toast.error(response.serverError);
  //   } else {
  //     reset();
  //   }
  // });

  return (
    <section
      id="cta"
      className="h-full w-full bg-transparent -z-40 flex justify-center items-center pt-10 pb-20 overflow-hidden relative px-4 md:px-10"
    >
      <div className="rounded-[32px] w-full bg-transparent/10 border-1 border-[#D8D8D8] px-6 md:px-20 py-6 md:py-10 mx-auto dark:bg-black/30 dark:border-gray-300/50">
        <div className="flex flex-col xl:flex-row justify-between items-center md:items-center content-center text-start gap-8 md:gap-16">
          <div className="flex flex-col items-center md:items-center justify-center content-center text-center md:text-left">
            <h1 className="font-extrabold text-[36px] md:text-[56px] leading-[4rem] md:leading-[5.5rem]">
              Notre application vous plait ?
            </h1>
          </div>
          <div className="rounded-[32px] bg-white h-auto md:h-[368px] w-full md:w-[712px] p-6 md:p-10 text-[20px] md:text-[24px]">
            <div className="flex flex-col text-center items-center justify-center content-center text-black">
              <p>
                Rejoignez-nous et inscrivez-vous <br />
                <span className="font-extrabold">
                  sur la liste d&apos;attente
                </span>
              </p>
              <form
                className="w-full gap-3 flex flex-col items-center justify-center mt-6 md:mt-10"
                // onSubmit={onSubmit}
              >
                <Input
                  placeholder="Email"
                  className="border border-gray-400/70 w-full md:w-[400px] rounded-full"
                  type="email"
                  // {...register("email")}
                />
                {/* {errors.email && (
                  <p className="font-medium text-red-400">
                    {errors.email.message}
                  </p>
                )} */}
                {/* {isLoading ? (
                  <Loader />
                ) : (*/}
                <Button
                  type="submit"
                  className="bg-black text-white w-full md:w-[276px] h-[48px] md:h-[56px] rounded-full hover:bg-black hover:text-white mt-6 md:mt-10"
                >
                  {t("ctaSection.cta")}
                </Button>
                {/* )} */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
