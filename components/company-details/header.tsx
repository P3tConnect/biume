import Image from "next/image";
import React from "react";
import { Button } from "../ui";

const OrganizationDetailsHeader = () => {
  return (
    <div className="absolute top-2 bg-background h-16 w-screen rounded-full flex justify-between items-center px-5">
      <Image
        src={"/assets/images/Logo couleur et noir.png"}
        alt="logo biume"
        width={218}
        height={66}
        className="w-20 sm:w-20 md:w-32 lg:w-44"
      />
      <Button className="bg-black text-white rounded-full">Connexion</Button>
    </div>
  );
};

export default OrganizationDetailsHeader;
