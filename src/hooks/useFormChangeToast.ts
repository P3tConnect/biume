'use client';

import { useEffect } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

const FORM_CHANGES_TOAST_ID = 'form-changes';

interface UseFormChangeToastProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: () => void | Promise<void>;
  message?: string;
  description?: string;
  actionLabel?: string;
  position?: 'top-center' | 'bottom-center';
  delay?: number;
}

export function useFormChangeToast<T extends FieldValues>({
  form,
  onSubmit,
  message = 'Modifications en attente',
  description = 'Pensez à sauvegarder vos changements',
  actionLabel = 'Sauvegarder',
  position = 'bottom-center',
  delay = 500,
}: UseFormChangeToastProps<T>) {
  useEffect(() => {
    let isSubmitting = false;

    const subscription = form.watch(() => {
      if (form.formState.isDirty && !isSubmitting) {
        const timeoutId = setTimeout(() => {
          toast.message(message, {
            id: FORM_CHANGES_TOAST_ID,
            description,
            action: {
              label: actionLabel,
              onClick: async () => {
                isSubmitting = true;
                try {
                  await onSubmit();
                } finally {
                  isSubmitting = false;
                }
              },
            },
            duration: Infinity,
            position,
            className:
              'group toast bg-white dark:bg-zinc-900 backdrop-blur-sm border border-border dark:border-zinc-800 shadow-lg dark:shadow-2xl rounded-2xl',
            classNames: {
              title: 'font-medium text-zinc-900 dark:text-zinc-100',
              description: 'text-zinc-600 dark:text-zinc-400 text-sm',
              actionButton:
                'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 h-8 px-4 py-2',
            },
          });
        }, delay);

        return () => {
          clearTimeout(timeoutId);
        };
      } else {
        toast.dismiss(FORM_CHANGES_TOAST_ID);
      }
    });

    return () => {
      subscription.unsubscribe();
      toast.dismiss(FORM_CHANGES_TOAST_ID);
    };
  }, [
    form,
    form.watch,
    form.formState.isDirty,
    message,
    description,
    actionLabel,
    position,
    delay,
    onSubmit,
  ]);

  return {
    hasChanges: form.formState.isDirty,
    isSubmitting: form.formState.isSubmitting,
  };
}
