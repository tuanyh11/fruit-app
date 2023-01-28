import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import Slider, { Settings } from "react-slick";
import { getProductSallerByCate } from "../../../api";
import { CardGrid, Container, NextArrow, PreArrow } from "../../../components";
import { Category, HomeSectionData, Product } from "../../../interfaces";

interface Props {
  categories: Category[];
  setSallerProduct: Function;
  sallerProduct: Product[];
  content: HomeSectionData | undefined;
}


const index: React.FC<Props> = ({
  categories,
  sallerProduct,
  setSallerProduct,
  content,
}) => {
  const [select, setSelectCate] = useState<Category>({ _id: "1", name: "all" });

  const handleGetSellerProduct = (cate: Category) => {
    setSelectCate(cate);
    getProductSallerByCate(cate._id).then((product) =>
      setSallerProduct(product.data?.data.allProduct)
    );
  };

  const settings: Settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <NextArrow cssInner="md:!right-5" />,
    prevArrow: <PreArrow cssInner="md:!left-5" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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
      <Container>
        <div className="text-center">
          <h2 className=" mt-5 mb-10 capitalize leading-[1] text-[30px] font-bold ">
            {content?.name}
          </h2>
        </div>
        <div className="">
          {/* start tablet pc device */}
          <ul className="md:flex text-center hidden justify-center gap-[4px] mb-[50px]">
            <li
              onClick={() => handleGetSellerProduct({ _id: "", name: "all" })}
              className={`${
                select.name === "all" ? "bg-main text-white border-main" : ""
              } transition-main cursor-pointer px-5 inline-block h-9 leading-9 rounded-[18px] border-[1px] border-[#e5e5e5] relative after:w-[10px] after:h-[10px] after:bg-[#e5e5e5] after:absolute after:top-1/2 after:right-0 after:-translate-y-1/2 after:translate-x-[8px] after:rounded-full after:z-30`}
            >
              All
            </li>
            {categories.map((item) => (
              <li
                onClick={() => handleGetSellerProduct(item)}
                className={`${
                  select.name === item.name
                    ? "bg-main text-white border-main"
                    : ""
                } transition-main cursor-pointer px-5 rounded-[18px] inline-block h-9 leading-9 border-[1px] relative after:w-[10px] after:h-[10px] after:bg-[#e5e5e5] after:absolute after:top-1/2 after:right-0 after:-translate-y-1/2 after:translate-x-[8px] after:rounded-full  border-[#e5e5e5] after:z-30 last:after:hidden`}
                key={item._id}
              >
                {item.name}
              </li>
            ))}
          </ul>
          {/* end tablet pc device */}

          {/* start mobile device */}
          <ul className="md:hidden text-center justify-center gap-[4px] mb-[50px]">
            <li
              onClick={() => handleGetSellerProduct({ _id: "", name: "all" })}
              className={`${
                select.name === "all" ? "bg-main text-white border-main" : ""
              } transition-main cursor-pointer px-5 block  leading-9 rounded-[18px] border-[1px] mb-[1px] border-[#e5e5e5] relative h-9`}
            >
              All
            </li>
            {categories.map((item) => (
              <li
                onClick={() => handleGetSellerProduct(item)}
                className={`${
                  select.name === item.name
                    ? "bg-main text-white border-main"
                    : ""
                } transition-main cursor-pointer px-5 rounded-[18px] mb-[1px] last:mb-0  h-9 leading-9 border-[1px] relative `}
                key={item._id}
              >
                {item.name}
              </li>
            ))}
          </ul>

          {/* end mobile device */}

          <div className="-mx-[15px]">
            <Slider {...settings} className="best-saller">
              {sallerProduct.map((product) => (
                <div key={product._id} className="px-[15px]">
                  <div
                    className="  relative z-[1] after:absolute after:inset-0 after:opacity-0
                   after:transition-all after:duration-500 after:ease-out hover:after:opacity-100 hover:after:-bottom-[25px] 
                   after:border-[1px] after:border-[#e5e5e5]
                   hover:after:-left-[10px] hover:after:-right-[10px] hover:after:-top-[10px]  after:shadow-[0_10px_10px_0_rgb(0_0_0_/_15%)] after:bg-white after:z-[1] "
                  >
                    <CardGrid {...product} />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default index;
