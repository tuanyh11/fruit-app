import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "../../components";

const index = () => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div>
      <div className="">
        <h2 className="text-[30px] mt-5 mb-[10px]">My account</h2>
      </div>

      <div className="">
        <div className="">
          <h2 className="text-[30px] mt-5 mb-[10px]">Login</h2>
        </div>
        <form action="" className="my-7 p-5 border rounded-md border-[#d3ced2]">
          <div className="p-[3px]">
            <label className="block font-bold leading-[2] mb-[5px]">
              Username or email address{" "}
              <span className="text-[red] font-bold">*</span>
            </label>
            <input
              type="text"
              className="h-[34px] w-full rounded-md px-[10px] outline-none border border-[#e5e5e5]"
            />
          </div>

          <div className="p-[3px]">
            <label className="block font-bold leading-[2] mb-[5px]">
              Password <span className="text-[red] font-bold">*</span>
            </label>
            <div className=" relative">
              <input
                type={`${!isShowing ? "password" : "text"}`}
                className="h-[34px] w-full rounded-md px-[10px] outline-none border border-[#e5e5e5]"
              />
              <button
                onClick={() => setIsShowing(!isShowing)}
                type="button"
                className={`absolute right-2 top-1/2 -translate-y-1/2 ${
                  isShowing ? "text-[#585858]" : ""
                }`}
              >
                <FaEye />
              </button>
            </div>
          </div>

          <div className="p-[3px] flex gap-3 items-center">
            <Button text="login" />
            <input
              type="checkbox"
              name=""
              id="remember-pass"
              className="w-[18px] relative h-[18px] bg-white border cursor-pointer outline-none appearance-none before:content-['\2713'] before:text-center before:text-[10px] before:font-bold  before:leading-[18px] before:absolute before:inset-0"
            />
            <label htmlFor="remember-pass"> Remember me</label>
          </div>
          <Link to="lost-password" className="hover:text-main transition-main">Lost your password?</Link>
        </form>
      </div>
    </div>
  );
};

export default index;
