import Logo from "@/assets/images/logo.png";
import { FooterLinks } from "@/stores/footer";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id='footer'
      className='border-t bg-brackground/50 border-neutral-800/50'
    >
      <div className='container px-4 py-12 mx-auto sm:px-6 lg:px-8'>
        <div className='grid gap-8 md:grid-cols-4'>
          <div>
            <div className='flex items-center mb-4 space-x-2'>
              <Image
                src={Logo}
                alt='logo'
                width={50}
                height={50}
                className='w-6 h-6'
              />
              <span className='text-sm font-bold text-white'>Markhor Bots</span>
            </div>
            <p className='text-xs text-white/80'>
              Streamline your FiveM community with our powerfull Discord Bot.
              Easy setup, advanced features and seamingless integration with
              Tebex.
            </p>
          </div>

          {FooterLinks.map((item) => (
            <div key={item.title} className='flex flex-col'>
              <h3 className='mb-4 text-sm font-semibold text-white'>
                {item.title}
              </h3>
              {item.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
