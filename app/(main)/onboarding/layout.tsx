import { currentUser } from "@/src/lib";
import { ReactNode } from "react";

const OnBoardingLayout = ({
  pro,
  client,
}: {
  pro: ReactNode;
  client: ReactNode;
}) => {
  // const user = currentUser();

  // if (user.isPro === false) {
  //   return <>{pro}</>;
  // }

  return <>{client}</>;
};

export default OnBoardingLayout;
