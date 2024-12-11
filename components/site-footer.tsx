import { DiscordLogoIcon, TwitterLogoIcon, LinkedInLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

const footerSocials = [
  {
    href: "https://www.linkedin.com/company/pawthera/",
    name: "LinkedIn",
    icon: <LinkedInLogoIcon className="h-4 w-4" />,
  },
  {
    href: "https://www.instagram.com/pawthera",
    name: "Instagram",
    icon: <InstagramLogoIcon className="h-4 w-4" />,
  },
];

export async function SiteFooter() {
  const t = await getTranslations("Footer");

  return (
    <footer>
      <div className="mx-auto w-full max-w-screen-xl xl:pb-2">
        <div className="md:flex md:justify-between px-8 p-4 py-16 sm:pb-16 gap-4">
          <div className="mb-12 flex-col flex gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                alt="company logo"
                src="https://i.imgur.com/ul79l8a.png"
                className="h-8 w-8 text-primary rounded-xl"
                width={50}
                height={50}
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                PawThera
              </span>
            </Link>
            <p className="max-w-xs">{t('slogan')}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex sm:items-center sm:justify-between border-t xl:border rounded-md border-dashed border-neutral-700/20 py-4 px-8 gap-2">
          <div className="flex space-x-5 sm:justify-center sm:mt-0">
            {footerSocials.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-600 fill-gray-500 hover:fill-gray-900 dark:hover:fill-gray-600"
              >
                {social.icon}
                <span className="sr-only">{social.name}</span>
              </Link>
            ))}
          </div>
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            Copyright © {new Date().getFullYear()}{" "}
            <Link href="/" className="cursor-pointer">
              PawThera
            </Link>
            . {t('rights')}
          </span>
        </div>
      </div>
      {/*   <SiteBanner /> */}
    </footer>
  );
}
