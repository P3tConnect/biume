import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Plus, UserPlus } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Email invalide"),
  role: z.enum(["member", "admin", "owner"], {
    required_error: "Veuillez sélectionner un rôle",
  }),
});

type FormData = z.infer<typeof schema>;

interface AddMemberButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  disabled?: boolean;
  maxMembers?: number;
  activeMembers?: number;
}

const AddMemberButton = ({
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  maxMembers = 10,
  activeMembers = 0,
}: AddMemberButtonProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      role: "member",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    // TODO: Implement team member addition logic
  };

  const isAtCapacity = activeMembers >= maxMembers;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={className}
          disabled={disabled || isAtCapacity}
        >
          {size === "icon" ? (
            <UserPlus className="h-4 w-4" />
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un membre
              {isAtCapacity && " (Capacité maximale atteinte)"}
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un membre à l&apos;équipe</DialogTitle>
          <DialogDescription>
            {isAtCapacity ? (
              <div className="text-destructive">
                Vous avez atteint la limite de {maxMembers} membres. Mettez à
                niveau votre forfait pour ajouter plus de membres.
              </div>
            ) : (
              <>
                Invitez un nouveau membre à rejoindre votre équipe. Ils
                recevront une invitation par email.
                <div className="mt-1 text-xs">
                  {activeMembers} membre{activeMembers > 1 ? "s" : ""} sur{" "}
                  {maxMembers} utilisé{maxMembers > 1 ? "s" : ""}
                </div>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@example.com"
                      {...field}
                      disabled={isAtCapacity}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rôle</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isAtCapacity}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="member">Membre</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="owner">Propriétaire</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isAtCapacity}>
                Ajouter
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberButton;
