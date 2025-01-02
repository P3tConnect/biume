const ClientCompleteStep = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
      <p className="text-8xl">🥳</p>
      <div className="flex flex-col text-center">
        <h1 className="text-2xl font-bold">
          Bravo ! Vous avez terminé le processus d'inscription
        </h1>
        <p className="text-muted-foreground text-sm">
          Vous pouvez maintenant utiliser votre compte personnel.
        </p>
        <p className="text-muted-foreground text-sm">
          N'hésitez pas à nous contacter si vous avez des questions
        </p>
      </div>
    </div>
  );
};

export default ClientCompleteStep;
