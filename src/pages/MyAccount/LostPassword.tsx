import React from "react";
import { Button } from "../../components";

const LostPassword = () => {
  return (
    <div>
      <div className="">
        <h2 className="text-[30px] mt-5 mb-[10px] leading-[1.1]">
          Lost password
        </h2>
      </div>
      <p className="">
        Lost your password? Please enter your username or email address. You
        will receive a link to create a new password via email.
      </p>
      <form action="">
        <div className="p-[3px]">
          <label className="block font-bold leading-[2] mb-[5px]">
            Username or email 
          </label>
          <input
            type="text"
            className="h-[34px] w-[47%] rounded-md px-[10px] outline-none border border-[#e5e5e5]"
          />
        </div>
        <div className="p-[3px] flex gap-3 items-center">
          <Button text="Reset password" />
        </div>
      </form>
    </div>
  );
};

export default LostPassword;
