import React from "react";
import {
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaEnvelope,
  FaCircle,
} from "react-icons/fa";

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label }) => (
  <div className="flex gap-2 items-center hover:text-white">
    <FaCircle className="h-3" />
    <a
      href={href}
      className="text-white/70  transition-all duration-200 hover:text-white hover:scale-110"
    >
      {label}
    </a>
  </div>
);

const Footer: React.FC = () => {
  return (
    <div className="relative border-t-2 border-white/30 p-4">
      <div className="w-full flex flex-col md:flex-row p-4">
        <div className="w-full md:w-[20%] flex flex-col gap-4 text-white justify-center items-center mb-4 md:mb-0">
          <div className="flex justify-center items-center">
            <img
              src="./icon.png"
              alt="icon"
              className="h-20 w-20 object-contain"
            />
          </div>
          <div className="text-xl font-bold">Chess Master</div>
        </div>

        <div className="w-full md:w-[50%] flex flex-col md:flex-row justify-around border-l-2 border-white/70 p-2 md:p-0 text-white/70 gap-4">
          <div>
            <div className="flex gap-6 text-lg">
              <div className="flex flex-col">
                <NavLink href="#" label="Home" />
                <NavLink href="#" label="About" />
                <NavLink href="#" label="Features" />
                <NavLink href="#" label="Contact" />
              </div>
              <div className="flex flex-col">
                <NavLink href="#" label="Leaderboard" />
                <NavLink href="#" label="FAQ" />
              </div>
            </div>
          </div>
          <div className="text-white/80 text-center mt-4">
            <p>Connect with us on social media!</p>

            <div className="z-10 flex gap-4 mt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-3xl text-white/80 hover:text-gray-500 transition-all duration-200 hover:scale-125" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-3xl text-white/80 hover:text-pink-400 transition-all duration-200 hover:scale-125" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-3xl text-white/80 hover:text-blue-400 transition-all duration-200 hover:scale-125" />
              </a>
              <a href="mailto:support@chessmaster.com">
                <FaEnvelope className="text-3xl text-white/80 hover:text-yellow-300 transition-all duration-200 hover:scale-125" />
              </a>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[30%] flex flex-col justify-end items-center md:items-end absolute right-0 bottom-0">
          <div className="absolute right-auto md:right-0 bottom-0 w-auto p-1 z-0 opacity-30 md:opacity-100">
            <img
              src="./footer2.png"
              alt="footer"
              className="w-full h-64 object-contain"
            />
          </div>
          {/* <img
            src="./footer2.png"
            alt="footer"
            className="w-full h-64 object-contain bg-white"
          /> */}
        </div>
      </div>
      <div>
        <div className="text-white text-center mt-6">
          <p>© 2024 Chess Master, All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
