"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  // useEffect(() => {
  //   function handleClickOutside(e: MouseEvent) {
  //     if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
  //       // setOpen(false);
  //     }
  //   }

  //   if (open) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [open]);

  return (
    <header
      className="
        w-full absolute flex flex-row items-center justify-center 
        pt-[40px] px-[20px] sm:px-[25px] md:px-[70px] 
        lg:px-[90px] xl:[120px] 2xl:px-[140px] z-50
      "
    >
      <nav className="flex flex-row items-center justify-between w-full h-full">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logos/navbar-text.svg"
            alt="logo"
            width={150}
            height={70}
            className="h-full w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex flex-row items-center gap-[60px]">
          <li className="font-inter font-normal text-[20px] leading-[30px] -tracking-[0.02em] text-white">
            <Link href="/">Home</Link>
          </li>
          <li className="font-inter font-normal text-[20px] leading-[30px] -tracking-[0.02em] text-white">
            <Link href="/">About</Link>
          </li>
          <li className="font-inter font-normal text-[20px] leading-[30px] -tracking-[0.02em] text-white">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        {/* Desktop Button */}
        <Link
          href="/"
          className="hidden sm:flex items-center justify-center py-[24px] px-[30px] bg-[#F8A900] text-black gap-[10px] rounded-[800px] text-[20px] font-semibold font-inter leading-[100%]"
        >
          Get Started
        </Link>

        {/* Mobile Hamburger / X */}
        <div
          onClick={() => setOpen(!open)}
          className="flex sm:hidden items-center justify-center bg-[#F8A900] rounded-full w-[58px] h-[58px] cursor-pointer z-20"
        >
          {open ? (
            <Image
              src="/icons/close.svg" // <-- Make sure you add close.svg
              alt="close"
              width={32}
              height={32}
            />
          ) : (
            <Image
              src="/icons/hamburger.svg"
              alt="menu"
              width={32}
              height={32}
            />
          )}
        </div>

        {/* Mobile Menu Sliding Panel */}
        {open && (
          <div
            ref={menuRef}
            className="absolute top-[0px] left-0 w-full bg-white text-black shadow-xl rounded-b-2xl
                       flex flex-col gap-6 px-8 py-8 w-[250px] sm:hidden transition-all duration-300"
          >
            <Link href="/" className="text-[20px] font-inter">Home</Link>
            <Link href="/about" className="text-[20px] font-inter">About</Link>
            <Link href="/contact" className="text-[20px] font-inter">Contact</Link>

            <Link
              href="/"
              className="mt-4 py-3 px-5 bg-[#F8A900] text-black rounded-full text-center text-[18px] font-semibold"
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
