"use client";
import Image from "next/image";
import logo from "../../../assets/SabikaLogo.svg";
import hamburger from "../../../assets/HamburgerMenu.svg";
import NavbarMobileMenu from "./NavbarMobileMenu";
import { useState } from "react";

const NavbarMobile = ({ isOpen, setIsOpen }) => {
  const [inNavbar, setInNavbar] = useState(false);
  return (
    <>
      <div
        className={`flex items-center justify-between p-5 mx-auto ${
          inNavbar ? "hidden" : ""
        }`}
      >
        <div className="w-full">
          <Image src={logo} alt="logo" className="" loading="eager" />
        </div>
        <div className="relative">
          <Image
            loading="eager"
            src={hamburger}
            alt="hamburger"
            onClick={() => {
              setIsOpen((prev) => !prev);
              setInNavbar((prev) => !prev);
            }}
          />
        </div>
      </div>
      <NavbarMobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setInNavbar={setInNavbar}
      />
    </>
  );
};

export default NavbarMobile;
