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

  if (user.id !== "DRQ_3kM1FUUyS0omjba4S") {
    return <>{pro}</>;
  }

  return <>{client}</>;
};

export default OnBoardingLayout;
