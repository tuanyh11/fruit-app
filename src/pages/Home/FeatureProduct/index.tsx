import React from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import Slider, { Settings } from "react-slick";
import { CardList, Container } from "../../../components";
import { HomeSectionData, Product } from "../../../interfaces";

interface Props {
  content: HomeSectionData | undefined;
  data: Product[];
}

const index = ({ data, content }: Props) => {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
    // autoplay: true,
  };
  return (
    <div className="">

      {/* Start tablet and pc device */}
      <div
        className="py-20 hidden lg:block bg-[#fafcfc] bg-no-repeat "
        style={{
          backgroundImage: content?.backgrounds
            ?.map((image) => `url(${image.asset.url})`)
            .join(","),
          backgroundPosition: "left top,right top",
        }}
      >
        <Container>
          <div className="">
            <div className="text-center ">
              <h2 className="  mb-10  text-[30px] font-bold ">
                {content?.title}
              </h2>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-[1000px]">
              <Slider {...settings}>
                {data.map((product) => (
                  <CardList key={product._id} {...product} />
                ))}
              </Slider>
            </div>
          </div>
        </Container>
      </div>
      {/* end  tablet and pc device*/}


      <div
        className="py-20 px-[15px] bg-[#fafcfc] lg:hidden"
      >
        <Container>
          <div >
            <div className="text-center ">
              <h2 className="  mb-10  text-[30px] font-bold ">
                {content?.title}
              </h2>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full md:w-[1000px] md:hidden">
              <Slider {...settings}>
                {data.map((product) => (
                  <CardList mobile={true} key={product._id} {...product} />
                ))}
              </Slider>
            </div>
          </div>
          <div className="w-full hidden md:block">
              <Slider {...settings}>
                {data.map((product) => (
                  <CardList key={product._id} {...product} />
                ))}
              </Slider>
            </div>
        </Container>
      </div>
    </div>
  );
};

function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      className="absolute md:top-0 text-2xl z-50 hover:bg-main transition-main flex justify-center items-center  
      -translate-y-1/2 -top-6 bg-white border-[1px] border-[#e5e5e5] text-[#c5c5c5] bottom-0  right-1/2  translate-x-[104%] md:translate-x-0  md:right-[0]   transition-main  w-[30px] h-[30px]  rounded-full hover:border-main hover:text-white"
      onClick={onClick}
    >
      <IoIosArrowRoundForward />
    </button>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className={` absolute md:top-0 z-50  mr-9 text-2xl hover:bg-main transition-main flex justify-center items-center 
      -translate-y-1/2 -top-6  bg-white border-[1px] border-[#e5e5e5] text-[#c5c5c5] bottom-0 right-1/2  translate-x-[104%] md:translate-x-0 md:!right-[0]  transition-main   w-[30px] h-[30px]  rounded-full hover:border-main hover:text-white`}
    >
      <IoIosArrowRoundBack />
    </button>
  );
}

export default index;
