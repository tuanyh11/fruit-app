import React, { useEffect } from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { RiArrowRightLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Slider, { CustomArrowProps, Settings } from "react-slick";
import { BannerHero } from "../../../interfaces";
import { SliderProps } from "../../../interfaces";
import "./style.css";

interface Props {
  data: BannerHero[];
}

const PreArrow:React.FC<CustomArrowProps> = ({onClick}) => (
  <button
    className="absolute hero-btn-left z-50 top-1/2 text-4xl hover:bg-main transition-main flex justify-center items-center -translate-y-1/2  bg-red-400 bottom-0  left-[-60px]  group-hover:left-[15px] transition-main h-[56px]  w-[56px] bg-black/50 rounded-full text-white"
    onClick={onClick}
  >
    <IoIosArrowRoundBack />
  </button>
);

const NextArrow:React.FC<CustomArrowProps> = ({onClick}) => (
  <button
  className="absolute top-1/2 z-50 hero-btn-right text-4xl hover:bg-main transition-main flex justify-center items-center  -translate-y-1/2  bg-red-400 bottom-0 right-[-60px] group-hover:right-[15px] transition-main h-[56px] w-[56px] bg-black/50 rounded-full text-white"
  onClick={onClick}
>
  <IoIosArrowRoundForward />
</button>
);

const index = ({ data }: Props) => {
  const settings: Settings = {
    slidesToShow: 1,
    autoplay: true,
    fade: true,
    prevArrow: <PreArrow/>,
    nextArrow: <NextArrow/>
  };
  return (
    <div>
      <div className="uppercase text-center ">
        <Slider {...settings} className="hero-section">
          {data.map((item) => {
            return (
              <div key={item?._id}>
                <div
                  className="relative  pt-[400px] md:pt-[700px] bg-no-repeat bg-cover bg-center "
                  style={{
                    backgroundImage: `url(${item.image?.[0].asset.url})`,
                  }}
                >
                  <div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                    <div className="hero-content">

                      <div dangerouslySetInnerHTML={{ __html: item.title }} />
                      <div className="flex justify-center">
                        <Link
                          to="#"
                          className="flex gap-2 leading-[37px] transition-main hover:bg-main hover:border-main px-[30px] border-2 uppercase mt-[18px] text-[14px] border-white  text-white items-center"
                        >
                          Shop Now <RiArrowRightLine />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default index;
