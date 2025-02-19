"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useActionMutation } from "@/src/hooks/action-hooks";
import { addToWaitList } from "@/src/actions/waitlist.action";
import { waitlistInsertSchema } from "@/src/db";

interface WaitListUserProps {
  children: React.ReactNode;
}

const WaitListUser = ({ children }: WaitListUserProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof waitlistInsertSchema>>({
    resolver: zodResolver(waitlistInsertSchema),
    defaultValues: {
      name: "",
      firstName: "",
      email: "",
      isPro: false,
      comment: "",
    },
  });

  const { handleSubmit } = form;

  const { mutateAsync } = useActionMutation(addToWaitList, {
    onSuccess: () => {
      setIsSuccess(true);
      toast.success("Inscription réussie !", {
        description: "Nous vous contacterons dès que possible.",
      });
      setTimeout(() => {
        setOpen(false);
        setIsSuccess(false);
        form.reset();
      }, 2000);
    },
    onError: () => {
      toast.error("Une erreur est survenue", {
        description: "Veuillez réessayer plus tard.",
      });
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      await mutateAsync(data);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Rejoignez l'aventure Biume
          </DialogTitle>
          <DialogDescription className="text-base">
            Soyez parmi les premiers à découvrir Biume. Remplissez le formulaire ci-dessous pour vous inscrire à notre liste d'attente.
          </DialogDescription>
        </DialogHeader>
        {!isSuccess ? (
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        {...field}
                        className="h-11 rounded-xl"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        {...field}
                        className="h-11 rounded-xl"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@example.com"
                        type="email"
                        {...field}
                        className="h-11 rounded-xl"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Un message à nous transmettre ? (optionnel)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Partagez-nous vos attentes, questions ou suggestions..."
                        className="rounded-xl resize-none min-h-[100px]"
                        disabled={isLoading}
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Inscription en cours...
                    </>
                  ) : (
                    "S'inscrire"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="rounded-full bg-primary/10 p-3">
              <CheckCircle2 className="h-8 w-8 text-primary animate-in zoom-in" />
            </div>
            <p className="text-lg font-medium text-center">
              Merci de votre inscription !
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Nous vous contacterons dès que possible pour vous donner accès à Biume.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WaitListUser;