import React from "react";
import logo from "../../images/logo.svg";
import passwordicon from "../../images/password-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const login = () => {
    localStorage.setItem("token", "login");
    navigate("/dashboard");
    toast.success("login");
  };
  return (
    <div className="login-screen">
      <div className="flex lg:flex-row  flex-col  gap-4 ">
        <div className="lg:w-7/12 w-full ">
          <div className=" px-[69px] py-[52px]">
            <img src={logo} alt="logo" />
            <div className="pt-[120px] px-[30px]">
              <div className=" ml-[50px] ">
                <h2 className=" text-5xl font-medium text-gray_900 leading-[1.8] mb-7">
                  Sign in
                </h2>
                <div className=" font-normal mb-10">
                  <span className=" text-gray_600 text-lg ">
                    Don’t have an account?
                  </span>{" "}
                  <Link to="/" className=" text-gray_900 underline text-base">
                    {" "}
                    Request Access Now
                  </Link>
                </div>

                <form>
                  <div className="mb-9">
                    <label
                      for="email"
                      className="block text-base  leading-6 text-gray_900 font-light mb-[14px]"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      placeholder="example@gmail.com"
                      className="block flex-1 border-0 bg-transparent py-4 pl-3 text-gray-900 placeholder:text-gray_600 placeholder:font-light focus:ring-0 sm:text-sm sm:leading-6 rounded-xl shadow-sm ring-1 ring-inset ring-gray_100 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full max-w-xl"
                    />
                  </div>

                  <div className="mb-10">
                    <label
                      for="password"
                      className="block text-base  leading-6 text-gray_900 font-light mb-[14px]"
                    >
                      Password
                    </label>
                    <div className="relative w-full max-w-xl">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="password"
                        placeholder="@#*%"
                        className="block flex-1 border-0 bg-transparent py-4 pl-3 text-gray-900 placeholder:text-gray_600 placeholder:font-light focus:ring-0 sm:text-sm sm:leading-6 rounded-xl shadow-sm ring-1 ring-inset ring-gray_100 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full max-w-xl"
                      />

                      <div className="absolute top-2  right-2 border-l  h-10 flex justify-center items-center w-12">
                        <Link to="/">
                          <img src={passwordicon} alt="password-icon" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className=" flex justify-between items-center w-full max-w-xl mb-10">
                    <div className=" items-center flex gap-2  text-base cursor-pointer">
                      <input type="checkbox" />
                      <label className="text-gray_900 text-base font-thin">
                        {" "}
                        Remember me
                      </label>
                    </div>
                    <button className="text-gray_900 underline text-base">
                      Forgot Password?
                    </button>
                  </div>

                  <button
                    className="w-full max-w-xl bg-primary_orange text-white py-5 rounded-[14px] text-xl font-semibold transition-all ease-in-out duration-300 hover:bg-transparent hover:text-primary_orange border border-transparent hover:border-primary_orange "
                    onClick={login}
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-5/12 w-full ">
          <div className=" bg-primary_orange py-[42px] pl-[95px] pr-[45px] pb-[270px] ">
            <div className=" bg-white p-[45px] rounded-[10px]">
              <div className=" max-w-[255px]">
                <h4 className=" font-pop text-primary_900 text-[28px] leading-9 mb-[17px]">
                  {" "}
                  Info about the System 1
                </h4>
                <p className=" mb-10 text-base leading-7 text-gray_400 font-medium">
                  Use your Venus card around the world with no hidden fees.
                  Hold, transfer and spend money.
                </p>
              </div>
            </div>

            <div className=" mt-[120px] mx-auto text-center">
              <h6 className=" text-off_white font-pop text-[22px] leading-5 font-semibold mb-5">
                Introducing new features
              </h6>
              <p className=" text-gray_100 text-lg leading-5 font-thin">
                Analyzing previous trends ensures that businesses always make
                the right decision. And as the scale of the decision and it’s
                impact magnifies...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
