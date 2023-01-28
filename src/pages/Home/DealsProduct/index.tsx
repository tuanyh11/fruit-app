import React from "react";
import Slider, { Settings } from "react-slick";
import { CardGrid, Container, NextArrow, PreArrow } from "../../../components";
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
    slidesToShow: data.length ? (data.length > 4 ?  4 : data.length) : 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow cssInner="!rigth-5"/>,
    prevArrow: <PreArrow />,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2
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
  };
  return (
    <div>
      <Container>
        <div className="text-center ">
          <h2 className="   text-[30px] font-bold ">{content?.title}</h2>
        </div>
        <div className="-mx-[20px] "> 
          <Slider {...settings} className="deal-product">
            {data.map((product) => (
              <div key={product._id}>
                <div
                  className="mx-[20px] p-[10px] relative z-[1] after:absolute after:inset-0 after:opacity-0
                   after:transition-all after:duration-500 after:ease-out hover:after:opacity-100 hover:after:-bottom-[25px] 
                   after:border-[1px] after:border-[#e5e5e5]
                   hover:after:-left-[15px] hover:after:-right-[15px] hover:after:-top-[15px]  after:shadow-[0_10px_10px_0_rgb(0_0_0_/_15%)] after:bg-white after:z-[1] "
                >
                  <CardGrid {...product} showOnDale={true} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </div>
  );
};

export default index;
