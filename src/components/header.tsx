/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import Link from "next/link";
import { NavItems } from "@/stores/navbar";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { SiDiscord } from "react-icons/si";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className='sticky  top-0 z-50 w-full border-b shadow-lg backdrop-blur-md border-neutral-800/50 supports-[backdrop-filter]:bg-background/95'>
      <div className='container flex relative justify-between items-center px-4 mx-auto h-16 sm:px-6 lg:px-8'>
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

        {/* Desktop navigatie */}
        <nav className='hidden items-center space-x-4 md:flex'>
          {NavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium rounded-lg px-2 py-1.5 transition-all duration-200 hover:text-old-gold-300 hover:drop-shadow-[0_0_0.3rem_#d4af37] ${
                  isActive
                    ? "text-old-gold-300 drop-shadow-[0_0_0.3rem_#d4af37]"
                    : "text-gray-300"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Rechterzijde + mobiele toggle */}
        <div className='flex gap-3 items-center sm:gap-4'>
          <Link
            href='https://discord.gg/CtQSEyFx6n'
            className='hidden md:block text-gray-300 hover:text-old-gold-300 hover:drop-shadow-[0_0_0.3rem_#d4af37]'
            aria-label='Join our Discord'
          >
            <SiDiscord className='w-6 h-6 sm:w-8 sm:h-8' />
          </Link>

          <button
            type='button'
            aria-label='Open menu'
            aria-controls='mobile-menu'
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className='inline-flex justify-center items-center p-2 text-gray-300 rounded-md transition md:hidden hover:text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-old-gold-500 focus:ring-offset-2 focus:ring-offset-neutral-900'
          >
            <svg
              className={`h-6 w-6 transition-transform duration-200 ${isMobileMenuOpen ? "rotate-90" : "rotate-0"}`}
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              aria-hidden='true'
            >
              {isMobileMenuOpen ? (
                <path d='M18 6L6 18M6 6l12 12' />
              ) : (
                <>
                  <line x1='3' y1='6' x2='21' y2='6' />
                  <line x1='3' y1='12' x2='21' y2='12' />
                  <line x1='3' y1='18' x2='21' y2='18' />
                </>
              )}
            </svg>
          </button>

          <UserDropdown />
        </div>

        <div
          id='mobile-menu'
          className={`md:hidden absolute h-screen inset-x-0 top-full origin-top rounded-b-lg border border-neutral-800/70 bg-neutral-900/95 shadow-xl backdrop-blur-md transition-all duration-150 ${
            isMobileMenuOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className='px-4 py-3 space-y-1'>
            {NavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block rounded-md px-3 py-2 text-base font-medium transition-colors active:scale-[0.98] ${
                    isActive
                      ? "text-old-gold-300 bg-neutral-800/60"
                      : "text-gray-200 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href='https://discord.gg/CtQSEyFx6n'
              onClick={() => setIsMobileMenuOpen(false)}
              className='block rounded-md px-3 py-2 text-base font-medium text-gray-200 hover:bg-neutral-800 hover:text-white transition-colors active:scale-[0.98]'
            >
              Discord
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function UserDropdown() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  if (status !== "authenticated" || !session?.user) {
    return (
      <button
        onClick={() => signIn("discord")}
        className='px-4 py-2 font-medium text-sm rounded-md transition-all duration-300 text-white bg-old-gold-500/70 shadow-[inset_0_2px_8px_#d3b42a] hover:bg-old-gold-600 hover:shadow-lg hover:shadow-old-gold-500/20 hover:translate-y-[-1px] border border-old-gold-300/30'
      >
        Login with Discord
      </button>
    );
  }

  const username =
    (session.user as any)?.global_name ||
    (session.user as any)?.username ||
    session.user.name ||
    "User";

  const username2 =
    (session.user as any)?.username || session.user.name || "User";
  const discordId = (session.user as any).id;
  const avatarHash = (session.user as any).avatar;
  const fallbackIndex = Number.parseInt(String(discordId ?? "0"), 10) % 5;
  const avatarUrl =
    discordId && avatarHash
      ? `https://cdn.discordapp.com/avatars/${discordId}/${avatarHash}.png?size=64`
      : `https://cdn.discordapp.com/embed/avatars/${isNaN(fallbackIndex) ? 0 : fallbackIndex}.png`;

  return (
    <div className='relative' ref={menuRef}>
      <button
        type='button'
        aria-haspopup='menu'
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className='group inline-flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium text-white'
      >
        <span className='inline-flex relative items-center'>
          <Image
            src={avatarUrl}
            alt={`${username} avatar`}
            width={48}
            height={48}
            className='object-cover w-8 h-8 rounded-full ring-1 ring-neutral-700'
          />
        </span>
        <span className='hidden sm:block max-w-[140px] truncate'>
          {username}
        </span>
        {/* Caret */}
        <svg
          viewBox='0 0 20 20'
          fill='currentColor'
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"} opacity-80`}
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z'
            clipRule='evenodd'
          />
        </svg>
      </button>

      {/* Dropdown panel */}
      <div
        role='menu'
        aria-label='User menu'
        className={`absolute right-0 mt-2 w-56 origin-top-right rounded-lg border border-neutral-800/70 bg-neutral-900/95 shadow-xl backdrop-blur-md ring-1 ring-black/0 focus:outline-none transition-all duration-150 ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* User info */}
        <div className='flex gap-3 items-center px-4 py-3 border-b border-neutral-800/70'>
          <Image
            src={avatarUrl}
            alt={`${username} avatar`}
            width={48}
            height={48}
            className='object-cover w-10 h-10 rounded-full ring-1 ring-neutral-700'
          />
          <div className='min-w-0'>
            <p className='text-sm font-semibold text-white truncate'>
              {username}
            </p>
            <p className='text-xs truncate text-neutral-400'>
              {username2} ({(session.user as any).id})
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className='py-1'>
          <a
            href='/dashboard'
            className='flex gap-3 items-center px-4 py-2 text-sm transition-colors text-neutral-200 hover:bg-neutral-800 hover:text-white'
            role='menuitem'
          >
            Dashboard
          </a>
          <a
            href='/billing'
            className='flex gap-3 items-center px-4 py-2 text-sm transition-colors text-neutral-200 hover:bg-neutral-800 hover:text-white'
            role='menuitem'
          >
            Billing
          </a>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className='flex gap-3 items-center px-4 py-2 w-full text-sm text-left transition-colors text-neutral-200 hover:bg-neutral-800 hover:text-white'
            role='menuitem'
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
