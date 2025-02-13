"use client";

import { useActionMutation, useActionQuery } from "@/src/hooks/action-hooks";
import { createUser } from "@/src/actions/example.action";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type CreateUserInput = z.infer<typeof createUserSchema>;

export function CreateUserForm() {
  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const createUserMutation = useActionMutation(createUser, {
    onSuccess: (data) => {
      console.log("User created:", data);
      form.reset();
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    createUserMutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...form.register("name")}
          className="block w-full mt-1"
        />
        {form.formState.errors.name && (
          <p className="text-red-500">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...form.register("email")}
          className="block w-full mt-1"
        />
        {form.formState.errors.email && (
          <p className="text-red-500">{form.formState.errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={createUserMutation.isPending}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {createUserMutation.isPending ? "Creating..." : "Create User"}
      </button>

      {createUserMutation.isError && (
        <p className="text-red-500">{createUserMutation.error.message}</p>
      )}
    </form>
  );
}

// Example of using useActionQuery
export function UserProfile() {
  const userQuery = useActionQuery(
    createUser,
    {
      name: "John Doe",
      email: "john@example.com",
    },
    {
      enabled: false, // Only enable when you want to fetch
    },
  );

  if (userQuery.isPending) {
    return <div>Loading...</div>;
  }

  if (userQuery.isError) {
    return <div>Error: {userQuery.error.message}</div>;
  }

  return (
    <div>
      <h1>{userQuery.data.name}</h1>
      <p>{userQuery.data.email}</p>
      <p>ID: {userQuery.data.id}</p>
      <p>Organization: {userQuery.data.organizationId}</p>
    </div>
  );
}
