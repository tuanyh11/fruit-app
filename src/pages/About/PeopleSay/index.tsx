import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import { getPeopleSay } from "../../../api";
import { ifPeopleSay } from "../../../interfaces";

const index = () => {
  const [peopleSay, setPeopleSay] = useState<ifPeopleSay[]>([]);

  useEffect(() => {
    getPeopleSay().then((people) =>
      setPeopleSay(people.data?.data.allPeopleSay)
    );
  }, []);

  const settings: Settings = {
    dots: true,
    arrows: false,
    fade: true,
    className:"about-people-say",
    appendDots: (dots) => (
      <div
        className="absolute "
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-full h-full flex justify-center items-center">
        <span className="w-[10px] h-[10px] block border border-[#66cc33] rounded-full"/>
      </div>
    ),
  };

  return (
    <div>
      <div className="text-center">
        <h2 className={" mb-10 leading-[1.1] text-[30px] font-bold "}>
          {"What People Say"}
        </h2>
      </div>
      <Slider {...settings}>
        {peopleSay.map((people, index) => {
          return (
            <div className="">
              <div
                key={people._id}
                className={`cursor-pointer overflow-hidden  flex justify-center    `}
              >
                <div className="w-[830px]">
                  <div className="flex  justify-center mb-[55px]">
                    <div className="p-[10px] relative z-[999999999] rounded-full border-main border inline-block">
                      <img
                        src={people.avatar.asset.url}
                        alt=""
                        className={`w-[100px] h-[100px] mx-auto rounded-full cursor-pointer scale-100 hover:scale-[1.15] transition-[transform] duration-500  ease-out `}
                      />
                    </div>
                  </div>
                  <div className="text-center ">
                    <p className="leading-6 text-[#555] text-sm px-5">
                      {people?.content}
                    </p>
                    <Link
                      to="/"
                      className="mt-[37px] relative after:absolute after:w-[1px] after:h-[30px] after:bg-main after:left-1/2 after:bottom-full after:mb-[10px] mb-[8px] block text-[#333] text-lg hover:text-main transition-main"
                    >
                      {people?.name}
                    </Link>
                    <span className="text-main font-medium">
                      {people?.position}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default index;
