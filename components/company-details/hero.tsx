import Image from "next/image";
import React from "react";
import { Avatar, AvatarImage } from "../ui";
import { User } from "lucide-react";

const CompanyDetailsHero = () => {
  return (
    <section className="relative w-full h-[400px] overflow-hidden">
      {/* <Image
        src="/api/placeholder/800/400"
        alt="Placeholder image"
        layout="fill"
        objectFit="cover"
        priority
      /> */}
      <Image
        src={"/assets/images/default-company-bg-img.jpg"}
        alt="company hero image"
        width={1404}
        height={938}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-tr from-primary via-gray-700 to-primary opacity-55"></div>
      <div className="absolute w-full flex justify-between items-center px-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
        <h1 className="text-4xl font-extrabold">Welcome to Our Site</h1>
        <div className="h-56 w-56 rounded-xl bg-gray-500 flex items-center justify-center border border-1 border-border">
          <User size={100} />
        </div>
      </div>
    </section>
  );
};

export default CompanyDetailsHero;
