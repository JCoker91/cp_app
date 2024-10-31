import { Navbar, NavbarContent, NavbarItem, NavbarBrand } from "@nextui-org/navbar";
import { GearIcon, MarvelLogo } from "@/components/icons";
import { NavLinks } from "@/components/nav_links";
import {User} from "@nextui-org/user";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
// import clsx from "clsx";
// import { link as linkStyles } from "@nextui-org/theme";
// import { Avatar } from "@nextui-org/react";
import { ThemeSwitch } from "@/components/theme-switch";

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
        <NavLinks />
      </NavbarContent>
      {/* <NavbarContent className="hidden sm:flex gap-4" justify="center" >
      </NavbarContent> */}
      <NavbarContent className="hidden lg:flex" justify="end">   
        <NavbarItem>
          <ThemeSwitch />  
        </NavbarItem>    
        <NavbarItem>
          <User
            name="Nick Fury"
            description="nick.fury@mail.com"
            avatarProps={{
              src: "/avatars/nick.fury.png",
            }}
          />
          </NavbarItem>
            <NavbarItem>
              <Link 
                href="/about/settings">
                <GearIcon color="grey"/>
              </Link>
            </NavbarItem>    
      </NavbarContent>
    </Navbar>
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="container mx-auto max-w-7xl pt-4 px-4 ">
        {children}
      </div>
    </section>
    </>
  );
}
