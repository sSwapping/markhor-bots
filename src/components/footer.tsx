import Logo from "@/assets/images/logo.png";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      id='footer'
      className='border-t bg-brackground/50 border-neutral-800/50'
    >
      <div className='container px-4 py-12 mx-auto sm:px-6 lg:px-8'>
        <div className='grid gap-8 md:grid-cols-4'>
          <div className='flex items-center mb-4 space-x-2'>
            <Image
              src={Logo}
              alt='logo'
              width={50}
              height={50}
              className='w-6 h-6'
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
