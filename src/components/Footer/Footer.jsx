import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Logo from '../Logo/Logo';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-14">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 lg:place-items-center">

                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">
                        <Logo logoSize="w-[75px]" textColor="text-primary" mainTextSize="text-2xl" subTextSize="text-lg" />
                    </h2>
                    <p className="text-sm mb-4 leading-relaxed">
                        Fresh, homemade meals prepared by trusted chefs near you.
                        Taste comfort, quality & care in every bite.
                    </p>

                    <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                            <FaPhoneAlt className="text-primary" />
                            +880 1700-000000
                        </p>
                        <p className="flex items-center gap-2">
                            <FaEnvelope className="text-primary" />
                            support@localchefbazaar.com
                        </p>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4 lg:text-center">
                        Working Hours
                    </h3>

                    <ul className="space-y-2 text-sm">
                        <li className="flex justify-between gap-8">
                            <span>Saturday – Thursday</span>
                            <span>9:00 AM – 10:00 PM</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Friday</span>
                            <span>4:00 PM – 10:00 PM</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Connect With Us
                    </h3>

                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition"
                        >
                            <FaFacebookF />
                        </a>

                        <a
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition"
                        >
                            <FaInstagram />
                        </a>

                        <a
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition"
                        >
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 mt-10 py-5 text-center text-sm">
                © {new Date().getFullYear()} LocalChefBazaar. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
