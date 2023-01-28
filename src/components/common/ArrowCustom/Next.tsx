import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { CustomArrowProps } from "react-slick";

interface Props extends CustomArrowProps {
  cssInner?: string;
}

const Next = ({ onClick, cssInner }: Props) => {
  return (
    <button
      className={`absolute top-1/2 z-50 text-2xl hover:bg-main transition-main flex justify-center items-center  -translate-y-1/2  bg-white border-[1px] border-[#e5e5e5] text-[#c5c5c5] bottom-0 right-[0]  transition-main  w-[30px] h-[30px] ${cssInner || ''}  rounded-full hover:border-main hover:text-white`}
      onClick={onClick}
    >
      <IoIosArrowRoundForward />
    </button>
  );
};

export default Next;
