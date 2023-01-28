import React from "react";
import { RiArrowRightLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Container } from "../../../components";
import { BannerHero, HomeSectionData } from "../../../interfaces";
import "./style.css";

interface Props {
  data: BannerHero[];
  content: HomeSectionData | undefined;
}

const index: React.FC<Props> = ({ data, content }) => {
  return (
    <div>
      <Container>
        <div className="text-center ">
          <h2 className=" mt-5 mb-10  text-[30px] font-bold ">
            {content?.title}
          </h2>
        </div>

        <div className="px-[15px]">
          {/* start pc device  */}
          <div className="hidden lg:grid grid-rows-2 grid-cols-3 grid-flow-col gap-[30px]">
            {data.map((item, index) =>
              index === 0 || index === 3 ? (
                <div key={item._id} className="row-span-2 group">
                  <div className="relative">
                    <Link
                      to={"/"}
                      className="relative block  overflow-hidden  after:bg-black/30 after:opacity-0 group-hover:after:opacity-100  after:transition-all   after:absolute after:inset-0  after:z-[100]"
                    >
                      {item.image.map((image, index) => (
                        <img
                          key={image.asset._id}
                          className={`${
                            item.image.length > 1
                              ? " last:opacity-0 last:absolute last:scale-[3] last:invisible last:z-40  group-hover:last:opacity-100 group-hover:last:visible group-hover:last:scale-[1] "
                              : "scale-100 group-hover:scale-[1.15]"
                          }  z-10 transition-main inset-0 w-[370px] h-[436px]`}
                          src={image.asset.url}
                        />
                      ))}
                    </Link>
                    <div className="text-white w-full z-[999999]  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                      <div
                        className="offer-content text-center"
                        data-active="line"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                      <div className="text-center">
                        <Link
                          to="#"
                          className="inline-flex gap-2 h-[40px] rounded-[20px] leading-[37px] transition-main hover:bg-main hover:border-main px-[30px] border-2 uppercase mt-[20px] text-[14px] border-white  text-white items-center"
                        >
                          Shop Now <RiArrowRightLine />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={item._id} className="row-span-1 group ">
                  <div className="relative h-full" >
                    <Link
                      to="/"
                      className="block h-full overflow-hidden after:bg-black/30 after:opacity-0 group-hover:after:opacity-100  after:transition-all   after:absolute after:inset-0  after:z-[100]"
                    >
                      {item.image.map((image, index) => (
                        <img
                          key={image.asset._id}
                          className="scale-100 rotate-0 group-hover:scale-[1.15] group-hover:rotate-[4deg] transition-main"
                          src={image.asset.url}
                        />
                      ))}
                    </Link>
                    <div className="text-white absolute top-1/2  left-1/2 w-full -translate-x-1/2 -translate-y-1/2 z-[999999]">
                      <div
                        className="offer-content text-center"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                      <div className="text-center">
                        <Link
                          to="#"
                          className="inline-flex gap-2 h-[40px] rounded-[20px] leading-[37px] transition-main hover:bg-main hover:border-main px-[30px] border-2 uppercase mt-[20px] text-[14px] border-white  text-white items-center"
                        >
                          Shop Now <RiArrowRightLine />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          {/* end pc device */}

          <div className="grid lg:hidden grid-rows-2 grid-cols-1 md:grid-cols-2   gap-[30px]">
            {data.map((item, index) =>
              index === 0 || index === 3 ? (
                <div key={item._id} className="row-span-2 group">
                  <div className="relative h-full">
                    <Link
                      to={"/"}
                      className="relative block h-full  overflow-hidden  after:bg-black/30 after:opacity-0 group-hover:after:opacity-100  after:transition-all   after:absolute after:inset-0  after:z-[100]"
                    >
                      {item.image.map((image, index) => (
                        <img
                          key={image.asset._id}
                          className={`${
                            item.image.length > 1
                              ? " last:opacity-0 last:absolute last:scale-[3] last:invisible last:z-40  group-hover:last:opacity-100 group-hover:last:visible group-hover:last:scale-[1] "
                              : "scale-100 group-hover:scale-[1.15]"
                          }  z-10 transition-main inset-0 w-full md:w-[370px] h-[436px]`}
                          src={image.asset.url}
                        />
                      ))}
                    </Link>
                    <div className="text-white w-full z-[999999]  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                      <div
                        className="offer-content text-center"
                        data-active="line"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                      <div className="text-center">
                        <Link
                          to="#"
                          className="inline-flex gap-2 h-[40px] rounded-[20px] leading-[37px] transition-main hover:bg-main hover:border-main px-[30px] border-2 uppercase mt-[20px] text-[14px] border-white  text-white items-center"
                        >
                          Shop Now <RiArrowRightLine />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={item._id} className={` group md:order-6 ${index == 2 ? 'order-2': ''}`}>
                  <div className="relative  h-full">
                    <Link
                      to="/"
                      className="block  h-full overflow-hidden after:bg-black/30 after:opacity-0 group-hover:after:opacity-100  after:transition-all   after:absolute after:inset-0  after:z-[100]"
                    >
                      {item.image.map((image, index) => (
                        <img
                          key={image.asset._id}
                          className="scale-100  w-full rotate-0 group-hover:scale-[1.15] group-hover:rotate-[4deg] transition-main"
                          src={image.asset.url}
                        />
                      ))}
                    </Link>
                    <div className="text-white absolute top-1/2  left-1/2 w-full -translate-x-1/2 -translate-y-1/2 z-[999999]">
                      <div
                        className="offer-content text-center"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                      <div className="text-center">
                        <Link
                          to="#"
                          className="inline-flex gap-2 h-[40px] rounded-[20px] leading-[37px] transition-main hover:bg-main hover:border-main px-[30px] border-2 uppercase mt-[20px] text-[14px] border-white  text-white items-center"
                        >
                          Shop Now <RiArrowRightLine />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default index;
