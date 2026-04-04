import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import Logo from "../Logo/Logo";
import { siteInfo } from "../../config/siteInfo";

const Footer = () => {
  const { contact, socials } = siteInfo;
  const addressLines = contact.address
    ? contact.address.split("|").map((line) => line.trim()).filter(Boolean)
    : [];

  const socialLinks = [
    { name: "Facebook", url: socials.facebook, icon: FaFacebookF },
    { name: "Instagram", url: socials.instagram, icon: FaInstagram },
    { name: "LinkedIn", url: socials.linkedin, icon: FaLinkedinIn },
  ].filter((item) => item.url);

  return (
    <footer className="bg-gray-900 text-gray-300 pt-14">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 lg:place-items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            <Logo
              logoSize="w-[75px]"
              textColor="text-[#628141]"
              mainTextSize="text-2xl"
              subTextSize="text-lg"
            />
          </h2>
          <p className="text-sm mb-4 leading-relaxed">
            Fresh, homemade meals prepared by trusted chefs near you. Taste
            comfort, quality, and care in every bite.
          </p>

          <div className="space-y-2 text-sm">
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 hover:text-white transition"
              >
                <FaPhoneAlt className="text-[#628141]" />
                {contact.phone}
              </a>
            )}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 hover:text-white transition"
              >
                <FaEnvelope className="text-[#628141]" />
                {contact.email}
              </a>
            )}
            {addressLines.length > 0 && (
              <div className="text-xs text-gray-400 leading-relaxed">
                {addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4 lg:text-center">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/meals" className="hover:text-white transition">
                Meals
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition">
                Login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Connect With Us
          </h3>
          {socialLinks.length > 0 ? (
            <div className="flex gap-4">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Add social links in your environment settings.
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 py-5 text-center text-sm">
        (c) {new Date().getFullYear()} LocalChefBazaar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
