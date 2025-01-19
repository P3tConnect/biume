import { clientSettingsSchema } from '@/app/(main)/dashboard/user/[userId]/settings/page';
import { Form } from '@/components/ui';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

const ClientSettingsForm = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof clientSettingsSchema>>;
}) => {
  return (
    <Form {...form}>
      <form></form>
    </Form>
  );
};

export default ClientSettingsForm;
