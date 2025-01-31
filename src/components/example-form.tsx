"use client";

import { useAction } from "@/lib/safe-action/use-action";
import { createUser } from "@/actions/example.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function ExampleForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { execute, error, validation, isLoading } = useAction(createUser);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await execute({
      name,
      email,
    });

    if (result) {
      // Réinitialiser le formulaire
      setName("");
      setEmail("");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom"
          className={validation?.name ? "border-red-500" : ""}
        />
        {validation?.name && (
          <p className="text-sm text-red-500">{validation.name.message}</p>
        )}
      </div>

      <div>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={validation?.email ? "border-red-500" : ""}
        />
        {validation?.email && (
          <p className="text-sm text-red-500">{validation.email.message}</p>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Chargement..." : "Créer"}
      </Button>
    </form>
  );
} 