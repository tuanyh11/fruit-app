import React from "react";
import Slider from "react-slick";
import { dedicatedFarmer } from "../../../lib/data";
import "./style.css";

const index = () => {
  var settings = {
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <div className="text-center">
        <h2 className={"mb-[45px] leading-[1.1] text-[30px] font-bold "}>
          Dedicated Farmer
        </h2>
      </div>

      <div className="">
        <Slider className="mx-[-15px]"  {...settings}>
          {dedicatedFarmer.map((farmer, index) => {
            return (
              <div key={index} className="">
                <div className="px-[15px]">
                  <div className="grid grid-cols-2 md:gap-[30px]">
                    <div className=" col-span-2 md:col-span-1 relative overflow-hidden group cursor-pointer">
                      <img
                        src={farmer?.avatar.asset.url}
                        alt=""
                        className="w-full lg:w-[270] h-full lg:h-[370px]"
                      />
                      <img
                        src={farmer?.avatar.asset.url}
                        alt=""
                        className=" w-[270] h-[370px] transition-main absolute inset-0 z-30 scale-[3] opacity-0 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible "
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <div className="flex flex-col justify-center items-center h-full md:ml-[-60px]">
                        <div className="pt-[40px] pr-[30px] pb-[20px] pl-[60px] border-2 border-main relative z-[90]">
                          <h3 className="mb-[6px] font-bold text-[18px]">
                            {farmer.name}
                          </h3>
                          <h4 className="text-main mb-[10px]">
                            {farmer.position}
                          </h4>
                          <div className="pt-[10px] mb-5 border-t border-dashed">
                            <p className="text-[#555] leading-6">
                              {farmer.about}
                            </p>
                          </div>
                          <div className="flex gap-[8px] dedicated-farmer ">
                            {farmer.social.map((item) => (
                              <a
                                href={item.url}
                                className={`w-[38px] h-[38px] block rounded-full text-center text-white overflow-hidden ${item.name}`}
                              >
                                <i
                                  className={`${item.icon} leading-[38px]`}
                                ></i>
                              </a>
                            ))}
                          </div>
                        </div>
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
