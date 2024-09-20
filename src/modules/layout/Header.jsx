// Added By : bhautik
// Created At: 28-5-2024
// Description: header file
// Ticket ID: 001

import React from "react";
import settingicon from "../../images/setting-icon.svg";
import notification from "../../images/notification-Icons.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header p-5 bg-gray_50">
      <div className=" py-4 px-[30px] bg-gradient-to-r from-[#9A500A] to-[#FBC553] rounded-[14px]">
        <div className="flex justify-between items-center">
          <div className="">
            <span className=" text-white text-sm  leading-5 font-light">System</span>
            <h6 className=" font-pop font-semibold text-base  leading-5 text-white mt-[14px]">
              Dashboard
            </h6>
          </div>

          <div className="flex">
            <Link to="/" className="mr-3">
              <img src={settingicon} alt="setting-icon" />
            </Link>
            <Link to="/">
              <img src={notification} alt="notification" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
