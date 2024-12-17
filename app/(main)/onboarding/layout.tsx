import { currentUser } from "@/src/lib";
import { ReactNode } from "react";

const OnBoardingLayout = async ({
  pro,
  client,
}: {
  pro: ReactNode;
  client: ReactNode;
}) => {
  const user = await currentUser();

  if (user.isPro === true) {
    return <>{pro}</>;
  }

  return <>{client}</>;
};

export default OnBoardingLayout;
