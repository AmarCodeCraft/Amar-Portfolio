import React, { useEffect, useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = memo(() => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((title) => {
    setActive(title);
  }, []);

  const handleMobileNavClick = useCallback((title) => {
    setToggle(false);
    setActive(title);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-20 transition-all duration-300 ${
        scrolled
          ? "glass py-3"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt="Amar CodeCraft logo"
            className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-110"
            width={36}
            height={36}
          />
          <p className="text-white text-[18px] font-bold cursor-pointer flex font-display">
            Amar&nbsp;
            <span className="sm:block hidden text-secondary">
              | CodeCraft
            </span>
          </p>
        </Link>

        {/* Desktop Navigation */}
        <ul className="list-none hidden sm:flex flex-row gap-8" role="menubar">
          {navLinks.map((nav) => (
            <li key={nav.id} role="menuitem">
              <a
                href={`#${nav.id}`}
                className={`relative text-[16px] font-medium cursor-pointer transition-colors duration-200 ${
                  active === nav.title
                    ? "text-white"
                    : "text-secondary hover:text-white"
                }`}
                onClick={() => handleNavClick(nav.title)}
              >
                {nav.title}
                {/* Active indicator dot */}
                {active === nav.title && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Resume / CTA button */}
        <a
          href="#contact"
          className="hidden sm:block text-sm font-semibold px-5 py-2 rounded-full border border-accent/50 text-accent hover:bg-accent/10 transition-all duration-200 hover:border-accent"
        >
          Let's Talk
        </a>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            onClick={() => setToggle(!toggle)}
            className="w-[28px] h-[28px] flex items-center justify-center"
            aria-label={toggle ? "Close menu" : "Open menu"}
            aria-expanded={toggle}
          >
            <img
              src={toggle ? close : menu}
              alt=""
              className="w-[28px] h-[28px] object-contain"
              width={28}
              height={28}
            />
          </button>

          {/* Mobile Menu Dropdown */}
          <div
            className={`${
              !toggle ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
            } transition-all duration-200 p-6 glass absolute top-16 right-0 mx-4 my-2 min-w-[200px] z-10 rounded-2xl`}
            role="menu"
          >
            <ul className="list-none flex flex-col gap-4">
              {navLinks.map((nav) => (
                <li key={nav.id} role="menuitem">
                  <a
                    href={`#${nav.id}`}
                    className={`font-medium cursor-pointer text-[16px] block py-1 transition-colors duration-200 ${
                      active === nav.title
                        ? "text-white"
                        : "text-secondary hover:text-white"
                    }`}
                    onClick={() => handleMobileNavClick(nav.title)}
                  >
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
