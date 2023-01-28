import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import { getCategory, getProducts, getTags } from "../../../api";
import { Category, Product, TagInter } from "../../../interfaces";

const Sidebar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [tags, setTags] = useState<TagInter[]>([]);

  useEffect(() => {
    getCategory().then((res) => setCategories(res.data?.data.allCategory));
    getProducts().then((res) => setProducts(res.data?.data.allProduct));
    getTags().then((res) => setTags(res.data?.data?.allTag));
  }, []);

  console.log(tags)

  const firstHalf = products.slice(0, Math.ceil(products.length / 2));
  const secondHalf = products.slice(Math.ceil(products.length / 2));

  console.log(Math.ceil(products.length / 2))

  const settings: Settings = { 
    slidesToShow: 1,
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow/>
  }

  return (
    <div>
      <form className="w-full relative ">
        <div className="">
          <input
            type="text"
            placeholder="search here"
            className="text-[#555] w-full border-[1px] border-[#e5e5e5] outline-none h-9 leading-6 px-[15px] rounded-[6px]"
          />
          <i
            className="fa fa-search absolute text-base top-1/2 -translate-y-1/2 right-0 -translate-x-1/2 pr-[2px] text-main font-black"
            aria-hidden="true"
          ></i>
        </div>
      </form>
      <div className="">
        <h1 className="mt-5 mb-[25px] capitalize font-bold text-[18px]">
          Product categories
        </h1>
        <ul className="">
          {categories.map((cate) => (
            <li
              key={cate._id}
              className=" cursor-pointer hover:text-main transition-main mb-2 pb-2 border-b-[1px] border-dashed flex justify-between"
            >
              {cate.name}
              <span className="text-main">({cate.products?.length})</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="">
        <h1 className="mt-5 mb-[25px] capitalize font-bold text-[18px]">
          New Arrivals
        </h1>
        <div className="">
          <Slider {...settings}>
            <div className="">
              {firstHalf.map((product) => {
                return (
                  <div key={product._id} className="flex mb-5 pb-5 border-b last:border-b-0">
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product.image.asset.url}
                        alt=""
                        className="w-[70px] h-[70px] object-contain"
                      />
                    </Link> 
                    <div className="ml-5">
                      <Link to={`/product/${product._id}`} className="mb-[3px] leading-6">{product.name}</Link>
                      <div className="flex gap-[4px] mb-3">
                        {product?.rating &&
                          product?.rating > 0 &&
                          [...new Array(product?.rating).keys()].map(
                            (rating) => (
                              <i
                                key={rating}
                                className="fa-solid fa-star text-yellow-400 text-[13px]"
                              ></i>
                            )
                          )}

                        {product?.rating &&
                          5 - product?.rating !== 0 &&
                          [...new Array(5 - product?.rating).keys()].map(
                            (rating) => (
                              <i
                                key={rating}
                                className="fa-solid fa-star text-[#c9c4c4] text-[13px]"
                              ></i>
                            )
                          )}

                        {!product?.rating &&
                          [...new Array(5).keys()].map(
                            (rating) => (
                              <i
                                key={rating}
                                className="fa-solid fa-star text-[#c9c4c4] text-[13px]"
                              ></i>
                            )
                          )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="">
              {secondHalf.map((product) => {
                return (
                  <div key={product._id} className="flex mb-5 pb-5 border-b last:border-b-0">
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product.image.asset.url}
                        alt=""
                        className="w-[70px] h-[70px]"
                      />
                    </Link>
                    <div className="ml-5">
                      <Link to={`/product/${product._id}`} className="mb-[3px] leading-6">{product.name}</Link>
                      <div className="flex gap-[4px] mb-3">
                        {product?.rating &&
                          product?.rating > 0 &&
                          [...new Array(product?.rating).keys()].map(
                            (rating) => (
                              <i
                                key={rating}
                                className="fa-solid fa-star text-yellow-400 text-[13px]"
                              ></i>
                            )
                          )}

                        {product?.rating &&
                          5 - product?.rating !== 0 &&
                          [...new Array(5 - product?.rating).keys()].map(
                            (rating) => (
                              <i
                                key={rating}
                                className="fa-solid fa-star text-[#c9c4c4] text-[13px]"
                              ></i>
                            )
                          )}

                        {!product?.rating &&
                          [...new Array(5).keys()].map(
                            (rating) => (
                              <i
                                key={rating}
                                className="fa-solid fa-star text-[#c9c4c4] text-[13px]"
                              ></i>
                            )
                          )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
         
          </Slider>
        </div>
      </div>

      <div className="">
        <h1 className="mt-5 mb-[25px] capitalize font-bold text-[18px]">
        Search by Tags
        </h1>
        <ul className="">
          {tags.map((tag) => (
            <li
              key={tag._id}
              className="h-[30px] leading-[30px] px-5 text-[#555555] bg-[#fafcfc] inline-block mr-1 mb-[5px] rounded-[15px] cursor-pointer hover:bg-main hover:text-white transition-main"
            >
              {tag.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      className="absolute  text-2xl z-50 hover:bg-main transition-main flex justify-center items-center  
      -translate-y-1/2 top-[-38px] bg-white border-[1px] border-[#e5e5e5] text-[#c5c5c5] bottom-0  right-8  translate-x-[104%] md:translate-x-0  md:right-[0]   transition-main  w-[30px] h-[30px]  rounded-full hover:border-main hover:text-white"
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
      className={` absolute  z-50  mr-9 text-2xl hover:bg-main transition-main flex justify-center items-center 
      -translate-y-1/2 top-[-38px] bg-white border-[1px] border-[#e5e5e5] text-[#c5c5c5] bottom-0 right-8  translate-x-[104%] md:translate-x-0 md:!right-[0]  transition-main   w-[30px] h-[30px]  rounded-full hover:border-main hover:text-white`}
    >
      <IoIosArrowRoundBack />
    </button>
  );
}

export default Sidebar;
