'use client';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { NavbarItem } from '@nextui-org/navbar';
import NextLink from 'next/link';

const links = [
    {
      name: 'Staff',
      href: '/about/staff',      
    },    
    {
      name: 'Classes',
      href: '/about/classes',      
    },    
    {
      name: 'Evaluations',
      href: '/about/evaluations',      
    },    
  ];


  export function NavLinks() {
    const pathname = usePathname();
   
    return (
      <>
        {links.map((link) => {
          return (
            <NavbarItem>
            <NextLink
                  className={clsx(
                    "", {
                        "text-primary font-medium" : pathname === link.href,
                    }
                  )}
                  key={link.href}
                  href={link.href}
                >
                {link.name}
              </NextLink>
            </NavbarItem>
          );
        })}
      </>
    );
  }   