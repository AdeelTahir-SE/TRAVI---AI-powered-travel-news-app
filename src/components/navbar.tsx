import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header
      className="
    fixed top-[40px]
    left-[20px]
    sm:left-[30px]
    md:left-[50px]
    lg:left-[70px]
    xl:left-[100px]
    2xl:left-[140px]
    w-[400px]
    sm:w-[700px]
    md:w-[800px]
    lg:w-[960px]
    xl:w-[1100px]
    2xl:w-[1640px]
    
  "
    >
      <nav className="flex flex-row items-center justify-between w-full h-full">
        <Image
          src="/logos/navbar-text.svg"
          alt="logo"
          width={150}
          height={70}
          className="h-full w-auto"
        />

        <ul className="hidden sm:flex flex-row items-center gap-[60px]">
          <li className="font-inter font-normal text-[20px] leading-[30px] -tracking-[0.02em] text-white">
            Home
          </li>
          <li className="font-inter font-normal text-[20px] leading-[30px] -tracking-[0.02em] text-white">
            About
          </li>
          <li className="font-inter font-normal text-[20px] leading-[30px] -tracking-[0.02em] text-white">
            Contact
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
