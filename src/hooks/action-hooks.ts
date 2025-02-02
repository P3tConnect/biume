import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { ActionResult } from "@/src/lib/action-utils";

type ServerAction<TInput, TOutput> = (
  input: TInput,
) => Promise<ActionResult<TOutput>>;

type ActionMutationOptions<TInput, TOutput> = Omit<
  UseMutationOptions<TOutput, Error, TInput>,
  "mutationFn"
>;

type ActionQueryOptions<TInput, TOutput> = Omit<
  UseQueryOptions<TOutput, Error, TOutput, (string | TInput)[]>,
  "queryKey" | "queryFn"
>;

export function useActionMutation<TInput, TOutput>(
  action: ServerAction<TInput, TOutput>,
  options?: ActionMutationOptions<TInput, TOutput>,
) {
  return useMutation<TOutput, Error, TInput>({
    mutationFn: async (input: TInput) => {
      const result = await action(input);
      if (result.error || !result.data) {
        throw new Error(result.error || "Une erreur est survenue");
      }
      return result.data;
    },
    ...options,
  });
}

export function useActionQuery<TInput, TOutput>(
  action: ServerAction<TInput, TOutput>,
  input: TInput,
  options?: ActionQueryOptions<TInput, TOutput>,
) {
  return useQuery<TOutput, Error, TOutput, (string | TInput)[]>({
    queryKey: ["action", action.name, input],
    queryFn: async () => {
      const result = await action(input);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data!;
    },
    ...options,
  });
}
