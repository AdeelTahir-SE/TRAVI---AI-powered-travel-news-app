import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header
      className="
    w-full absolute flex flex-row items-center justify-center pt-[40px] px-[20px] sm:px-[25px] md:px-[70px] lg:px-[90px] xl:[120px] 2xl:px-[140px] z-50
  "
    >
      <nav className="flex flex-row items-center justify-between w-full h-full">
        <Link href="/">
          <Image
            src="/logos/navbar-text.svg"
            alt="logo"
            width={150}
            height={70}
            className="h-full w-auto"
          />
        </Link>

        <ul className="hidden sm:flex flex-row items-center gap-[60px]">
          <li className="font-inter font-normal text-[20px] leading-[30px] -tracking-[0.02em] text-white">
            <Link href="/">Home</Link>
          </li>
          <li className="font-inter font-normal text-[20px] leading-[30px] -tracking-[0.02em] text-white">
            <Link href="/">About</Link>
          </li>
          <li className="font-inter font-normal text-[20px] leading-[30px] -tracking-[0.02em] text-white">
            <Link href="/">Contact</Link>
          </li>
        </ul>

        <Link
          href="/"
          className="hidden sm:flex items-center justify-center py-[24px] px-[30px] bg-[#F8A900] text-black gap-[10px] rounded-[800px] text-[20px] font-semibold font-inter leading-[100%]"
        >
          Get Started
        </Link>

        <div className="flex sm:hidden items-center justify-center bg-[#F8A900] rounded-full w-[58px] h-[58px]">
          <Image
            src="/icons/hamburger.svg"
            alt="menu"
            width={32}
            height={32}
            className="w-auto h-auto"
          />
        </div>
      </nav>
    </header>
  );
}
