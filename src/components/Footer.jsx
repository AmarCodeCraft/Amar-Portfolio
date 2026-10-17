import React, { memo } from "react";
import { FaInstagram, FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";

const socialLinks = [
  {
    href: "https://www.instagram.com/itx_amar_99/",
    icon: FaInstagram,
    label: "Instagram",
  },
  {
    href: "https://twitter.com",
    icon: FaXTwitter,
    label: "X (Twitter)",
  },
  {
    href: "https://www.linkedin.com",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/AmarCodeCraft/Amar-Portfolio.git",
    icon: FaGithub,
    label: "GitHub",
  },
];

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 bg-white border-t border-slate-200 text-slate-600" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
        {/* Social Links */}
        <div className="flex gap-4">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-all duration-200"
              aria-label={`Visit ${label} profile`}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-slate-500 text-sm text-center">
          &copy; {currentYear} Amar CodeCraft. Built with React & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
