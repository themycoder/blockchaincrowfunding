import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useStateContext } from "../context";
import { CustomButton } from "./";
import { logo, menu, search, thirdweb } from "../assets";
import { navlinks } from "../constants";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6 p-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl shadow-lg">
      {/* Search Bar */}
      {/* <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1e293b] rounded-[50px]">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#cbd5e1] text-white bg-transparent outline-none"
        />

        <div className="w-[72px] h-full rounded-[20px] bg-[#5eead4] flex justify-center items-center cursor-pointer hover:bg-[#38bdf8] transition-all duration-300">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div> */}

      {/* Desktop Navigation */}
      <div className="sm:flex hidden flex-row justify-end gap-4 items-center">
        <CustomButton
          btnType="button"
          title={address ? "Create a campaign" : "Connect"}
          styles={address ? "bg-[#34d399]" : "bg-[#9333ea] hover:bg-[#7e22ce]"}
          handleClick={() => {
            if (address) navigate("create-campaign");
            else connect();
          }}
        />

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2b3a42] flex justify-center items-center cursor-pointer hover:ring-4 hover:ring-[#34d399] transition-all duration-300">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Small Screen Navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2b3a42] flex justify-center items-center cursor-pointer hover:ring-4 hover:ring-[#34d399] transition-all duration-300">
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        {/* Mobile Drawer */}
        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1e293b] z-10 shadow-xl py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700 rounded-t-lg`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 hover:bg-[#4b5563] ${
                  isActive === link.name && "bg-[#3b4753]"
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#34d399]" : "text-[#cbd5e1]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? "Create a campaign" : "Connect"}
              styles={
                address ? "bg-[#34d399]" : "bg-[#9333ea] hover:bg-[#7e22ce]"
              }
              handleClick={() => {
                if (address) navigate("create-campaign");
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
