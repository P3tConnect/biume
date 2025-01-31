"use client";

import { useCallback, useState } from "react";
import { ActionState } from "./types";

export function useAction<Input, Output>(
  action: (data: Input) => Promise<ActionState<Input, Output>>,
) {
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<Output | undefined>();
  const [validation, setValidation] = useState<any | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (input: Input) => {
      setIsLoading(true);
      setError(undefined);
      setData(undefined);
      setValidation(undefined);

      try {
        const result = await action(input);

        if (result.error) {
          setError(result.error);
          return;
        }

        if (result.validation) {
          setValidation(result.validation);
          return;
        }

        setData(result.data);
        return result.data;
      } catch (e) {
        setError(e instanceof Error ? e.message : "Une erreur est survenue");
      } finally {
        setIsLoading(false);
      }
    },
    [action],
  );

  return {
    execute,
    error,
    data,
    validation,
    isLoading,
  };
}
