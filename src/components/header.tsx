"use client";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import Link from "next/link";
import { NavItems } from "@/stores/navbar";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className='sticky top-0 z-50 w-full border-b shadow-lg backdrop-blur-md border-neutral-800/50 supports-[backdrop-filter]:bg-neutral-950/95'>
      <div className='container flex justify-between items-center px-4 mx-auto h-16 sm:px-6 lg:px-8'>
        <Link
          href='/'
          className='flex items-center transition-all duration-200 group'
        >
          <Image
            src={Logo}
            alt='Markhor Bots'
            width={48}
            height={48}
            className='object-contain w-8 h-8 transition-transform duration-300 sm:w-10 sm:h-10 group-hover:rotate-12'
          />
        </Link>

        <nav className='flex items-center space-x-4'>
          {NavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='text-sm font-medium transition-colors duration-200 text-neutral-300 hover:text-neutral-100'
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div>{!session}</div>
      </div>
    </header>
  );
}
