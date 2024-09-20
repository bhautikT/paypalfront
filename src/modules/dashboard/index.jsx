import React from "react";
import { Link } from "react-router-dom";
import structorg from "../../images/com-structure-organization.svg";
import employee from "../../images/employe-.svg";
import attendance from "../../images/attendance.svg";
import absences from "../../images/absences.svg";
import totalemp from "../../images/total-employee.svg";

// Added By : Prashant
// Created At: 28-5-2024
// Description: dashboard
// Ticket ID: 001
function Dashboard() {
  return (
    <div className="dashboard bg-gray_50 px-5 py-5">
      <div className="flex lg:flex-row  flex-col  gap-5">
        <div className="lg:w-3/12 w-full">
          <Link to="/">
            <div className=" bg-white rounded-[14px] px-[10px] pt-[18px] pb-4 flex flex-col text-center justify-center items-center">
              <img src={structorg} alt="company-Structure-Organization" />
              <h6 className=" mt-5 text-base leading-5 font-semibold font-pop text-primary_600">
                Company Structure and Organization
              </h6>
            </div>
          </Link>
        </div>
        <div className="lg:w-3/12 w-full">
          <Link to="/">
            <div className=" bg-white rounded-[14px] px-[10px] pt-[18px] pb-4 flex flex-col text-center justify-center items-center">
              <img src={employee} alt="employee" />
              <h6 className=" mt-5 text-base leading-5 font-semibold font-pop text-primary_600">
                Employees
              </h6>
            </div>
          </Link>
        </div>
        <div className="lg:w-3/12 w-full">
          <Link to="/">
            <div className=" bg-white rounded-[14px] px-[10px] pt-[18px] pb-4 flex flex-col text-center justify-center items-center">
              <img src={attendance} alt="attendance" />
              <h6 className=" mt-5 text-base leading-5 font-semibold font-pop text-primary_600">
                Attendance
              </h6>
            </div>
          </Link>
        </div>
        <div className="lg:w-3/12 w-full">
          <Link to="/">
            <div className=" bg-white rounded-[14px] px-[10px] pt-[18px] pb-4 flex flex-col text-center justify-center items-center">
              <img src={absences} alt="absences" />
              <h6 className=" mt-5 text-base leading-5 font-semibold font-pop text-primary_600">
                Absences
              </h6>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-6 flex lg:flex-row  flex-col  gap-5">
        <div className="lg:w-9/12 w-full">
          <div className="grid grid-cols-2 gap-5 ">
            <Link to="/">
              <div className=" bg-white rounded-[14px] p-5 flex justify-between items-center">
                <div>
                  <span className=" text-blue_600 font-pop font-medium text-lg ">
                    Total Employees
                  </span>
                  <h6 className="text-blue_600 text-5xl leading-7 font-medium mt-[22px] ">216</h6>
                </div>
                <div>
                  <img src={totalemp} alt="total-employee" />
                  <div className="mt-5 bg-primary_50 rounded-sm ">
                    <span>+2% Past month</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="lg:w-3/12 w-full">2</div>
      </div>
    </div>
  );
}

export default Dashboard;
