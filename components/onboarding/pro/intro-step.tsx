import Image from "next/image";
import { ArrowRight } from "lucide-react";

const IntroStep = () => {
  return (
    <div className="w-full h-full flex flex-row justify-between items-center gap-12 p-8">
      <div className="relative w-1/2 h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl" />
        <Image
          src={"/assets/images/login-image.jpg"}
          alt="start-onboarding-image"
          width={100}
          height={100}
          className="rounded-2xl w-full h-full object-cover shadow-lg"
          priority
        />
      </div>

      <div className="w-1/2 h-full flex flex-col justify-center space-y-6 pr-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Vous souhaitez vous inscrire en tant que professionnel ?
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Dans ce processus de création de votre établissement, nous vous
            guiderons à travers quelques étapes simples pour configurer votre
            profil professionnel.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
            <ArrowRight size={16} />
          </div>
          <span>Commencez votre parcours en quelques minutes</span>
        </div>
      </div>
    </div>
  );
};

export default IntroStep;
