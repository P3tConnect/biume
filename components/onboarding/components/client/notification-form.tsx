"use client";

// import { Form, Button } from "@/components/ui";
// import { CreateUserSchema } from "@/src/db/user";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, Controller } from "react-hook-form";
// import { z } from "zod";
// import { Checkbox } from "@/components/ui/checkbox";

const NotificationForm = () => {
  // const form = useForm<z.infer<typeof CreateUserSchema>>({
  //   resolver: zodResolver(CreateUserSchema),
  //   defaultValues: {
  //     smsNotification: false,
  //     emailNotification: false,
  //   },
  // });

  // const { control, handleSubmit } = form;

  // const onSubmit = (data: z.infer<typeof CreateUserSchema>) => {
  //   console.log("Form data:", data);
  //   // Ajouter la logique pour soumettre le formulaire ici
  // };

  return (
    <></>
    // <Form {...form}>
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <div className="flex flex-row items-center justify-center content-center text-center gap-3">
    //       <Controller
    //         name="smsNotification"
    //         control={control}
    //         render={({ field }) => (
    //           <Checkbox
    //             checked={field.value}
    //             onChange={(e) =>
    //               field.onChange((e.target as HTMLInputElement).checked)
    //             }
    //             name={field.name}
    //             ref={field.ref}
    //           />
    //         )}
    //       />
    //       <h3>Choisir de recevoir les notifications par SMS</h3>
    //     </div>
    //     <div className="flex flex-row items-center justify-center content-center text-center gap-3">
    //       <Controller
    //         name="emailNotification"
    //         control={control}
    //         render={({ field }) => (
    //           <Checkbox
    //             checked={field.value}
    //             onChange={(e) =>
    //               field.onChange((e.target as HTMLInputElement).checked)
    //             }
    //             name={field.name}
    //             ref={field.ref}
    //           />
    //         )}
    //       />
    //       <h3>Choisir de recevoir les notifications par email</h3>
    //     </div>
    //     <Button type="submit">Valider</Button>
    //   </form>
    // </Form>
  );
};

export default NotificationForm;
