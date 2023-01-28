import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { CustomArrowProps } from "react-slick";

interface Props extends CustomArrowProps {
  cssInner?: string;
}


const Pre = ({onClick, cssInner}: Props) => {
  return (
    <button
      className={`absolute top-1/2 text-2xl z-50 hover:bg-main transition-main flex justify-center items-center -translate-y-1/2  bg-white border-[1px] ${cssInner || ''}  border-[#e5e5e5] text-[#c5c5c5] bottom-0  left-[0]  transition-main   w-[30px] h-[30px] rounded-full hover:border-main hover:text-white`}
      onClick={onClick}
    >
      <IoIosArrowRoundBack />
    </button>
  );
};

export default Pre;
