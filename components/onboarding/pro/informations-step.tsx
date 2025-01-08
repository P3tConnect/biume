import { UseFormReturn } from "react-hook-form";
import InformationsForm from "../components/pro/informations-form";
import { z } from "zod";
import { onboardingSchema } from "../components/stepper";

const ProInformationsStep = ({ form }: { form: UseFormReturn<z.infer<typeof onboardingSchema>> }) => {
  return <InformationsForm formUtils={form} />;
};

export default ProInformationsStep;
