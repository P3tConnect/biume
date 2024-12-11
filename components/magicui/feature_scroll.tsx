"use client";

import React from "react";
import Safari from "./safari";
import Image from "next/image";

// If using Next.js, uncomment the following line
// import Image from 'next/image';

interface FeatureScrollProps {
  direction: "ltr" | "rtl";
  imageSrc: string;
  children: React.ReactNode;
  topPosition?: string;
}

export const FeatureScrollContainer: React.FC<FeatureScrollProps> = ({
  direction,
  children,
  imageSrc,
  topPosition = "50%",
}) => {
  const isLTR = direction === "ltr";

  return (
    <div className="w-full">
      <div className="lg:hidden flex flex-col gap-y-10">
        {/* If using Next.js, replace img with Image component */}
        <Image
          src={imageSrc}
          width={300}
          height={300}
          alt="Scrolling"
          className={`w-full max-w-[300px] mx-auto mb-4 ${isLTR ? "order-1" : "order-2"
            }`}
        />
        <div className={isLTR ? "order-2" : "order-1"}>{children}</div>
      </div>
      <div className="hidden lg:grid lg:grid-cols-2 h-fit w-full justify-center items-start relative">
        <div
          className="sticky flex justify-center items-center"
          style={{ top: topPosition }}
        >
          {children}
        </div>
        <div
          className={`flex items-center justify-center w-full h-fit ${isLTR ? "" : "row-start-1"
            }`}
        >
          {/* If using Next.js, replace img with Image component */}
          <Safari
            src={imageSrc}
            url="pawthera.com"
            className="w-full max-w-[900px]"
          />
          {/* <img
            src={imageSrc}
            alt="Scrolling"
            className="w-full max-w-[300px]"
          /> */}
        </div>
      </div>
    </div>
  );
};

export function FeatureScroll1() {
  return <section></section>;
}
