import { Navbar, NavbarContent, NavbarItem, NavbarBrand } from "@nextui-org/navbar";
import { MarvelLogo } from "@/components/icons";
import { NavLinks } from "@/components/nav_links";
import {User} from "@nextui-org/user";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import clsx from "clsx";
import { link as linkStyles } from "@nextui-org/theme";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <Navbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
      
        <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex justify-start items-center gap-1" href="/">
              <MarvelLogo size={112}/>
            </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center" >
      <NavLinks />
      </NavbarContent>
      <NavbarContent className="hidden lg:flex" justify="end">       
        <NavbarItem>
          <User
            name="Nick Fury"
            description="nick.fury@mail.com"
            avatarProps={{
              src: "/avatars/nick.fury.png",
            }}
          />
          </NavbarItem>      
      </NavbarContent>
    </Navbar>
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        {children}
      </div>
    </section>
    </>
  );
}
