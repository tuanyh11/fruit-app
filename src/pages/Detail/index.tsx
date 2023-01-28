import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import { getProductById } from "../../api";
import { Button, FooterV2 } from "../../components";
import { layoutWithSideBarCtx } from "../../components/Layout/LayoutWithSideBar";
import { useCartSlice } from "../../hooks";
import { Product } from "../../interfaces";

const index = () => {
  const url = useContext(layoutWithSideBarCtx);

  const [product, setProduct] = useState<Product>();

  const [showImg, setShowImg] = useState<string>();

  const [selectMode, setSelectMode] = useState<string>("description");

  const [quantity, setQuantity] = useState<number | string>(1);

  const { addToCart, data } = useCartSlice();

  useEffect(() => {
    if (url?.id)
      getProductById(url?.id).then((res) => setProduct(res.data.data.Product));
  }, [url?.id]);

  const settings: Settings = {
    slidesToShow: product?.imagesGallery?.length
      ? product?.imagesGallery?.length === 4
        ? 4
        : product?.imagesGallery?.length
      : 1,
    slidesToScroll: 1,
  };

  const handleChangeQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^[0-9]*$/.test(e?.target.value) || e?.target.value === "") {
      setQuantity(e?.target.value);
    }
  };

  return (
    <div>

      {data.some(item => product?._id === item._id && !item.isRemove) && <div>
        <div
          className="py-[14px] pl-[50px] pr-7 relative  border-t-[3px] border-[#8fae1b] mb-7 text-[#515151] bg-[#f7f6f7]"
          role="alert"
        >
          <div className=" absolute left-6 text-white top-1/2 w-[14px] h-[14px] leading-[14px] text-center rounded-full text-[10px] bg-[#8fae1b] -translate-y-1/2">
            &#10003;
          </div>
          <div className="flex justify-between items-center">
            <div>“{ product?.name}” has been added to your cart.</div>
            <div className="">
              <Button
                onClick={() => {}}
                text={"View cart"}
                isLinkTag={true}
                to={"/cart"}
              />
            </div>
          </div>
        </div>
      </div>}
      <div className="grid grid-cols-12 lg:gap-[30px] border p-[10px] mb-[50px]">
        <div className=" lg:col-span-6 col-span-12 flex flex-col ">
          <div
            className="flex-1"
            onMouseMove={function (e: any) {
              console.log(e.clientX);
            }}
          >
            <img
              src={showImg || product?.imagesGallery[0].asset.url}
              alt=""
              className="h-full"
            />
          </div>
          <div className="mt-auto">
            <Slider {...settings}>
              {product?.imagesGallery.map((image, i) => (
                <div
                  key={image.asset._id}
                  onClick={() => setShowImg(image.asset.url)}
                  className={`${
                    showImg === image.asset.url
                      ? "bg-[#e2e2e2] "
                      : " cursor-pointer"
                  }`}
                >
                  <img
                    src={image.asset.url}
                    alt=""
                    className={`cursor-pointer ${
                      showImg === image.asset.url ? "opacity-50 " : ""
                    }`}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className=" lg:col-span-6 col-span-12 ">
          <div className="p-5">
            <div>
              <h1 className=" font-bold text-[30px] text-[#333333] leading-[1]">
                {product?.name}
              </h1>
            </div>
            <div className="text-[18px]  text-main mb-[7px] ">
              <span>$</span>
              {product?.price}
            </div>
            <div className="flex gap-[4px] mb-3">
              {product?.rating &&
                product?.rating > 0 &&
                [...new Array(product?.rating).keys()].map((rating) => (
                  <i
                    key={rating}
                    className="fa-solid fa-star text-yellow-400 text-[13px]"
                  ></i>
                ))}

              {product?.rating &&
                5 - product?.rating !== 0 &&
                [...new Array(5 - product?.rating).keys()].map((rating) => (
                  <i
                    key={rating}
                    className="fa-solid fa-star text-[#c9c4c4] text-[13px]"
                  ></i>
                ))}
            </div>
            <div className="text-[#555] leading-6 mb-[10px]">
              <p className="text-limit">{product?.description}</p>
            </div>

            <div className="my-[15px] py-[45px] border-y-[1px] gap-4 md:gap-0 justify-between lg:justify-start border-dashed flex flex-wrap text-[#999]">
              <div className="h-[36px] w-[130px] leading-9 text-center border rounded-md overflow-hidden  ">
                <button
                  onClick={() =>
                    setQuantity(quantity <= 1 ? 1 : Number(quantity) - 1)
                  }
                >
                  <i
                    className="fa fa-arrow-circle-down "
                    aria-hidden="true"
                  ></i>
                </button>
                <input
                  type="text"
                  value={quantity}
                  onBlur={() =>
                    setQuantity(quantity === "" || quantity < 1 ? 1 : quantity)
                  }
                  onChange={(e) => handleChangeQty(e)}
                  className="w-[3.631em] outline-none text-center px-2"
                />
                <button onClick={() => setQuantity(Number(quantity) + 1)}>
                  <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
                </button>
              </div>
              <button
                onClick={() => {
                  if (product) {
                    addToCart({
                      ...product,
                      quantity: Number.isInteger(quantity)
                        ? Number(quantity)
                        : 1,
                    });
                    setQuantity(1);
                  }
                }}
                className="h-[36px]  mx-[3px] capitalize leading-9 text-center text-sm bg-main text-white px-5 rounded-[18px] hover:bg-orange transition-main"
              >
                Add to cart
              </button>
              <div className="w-full md:w-auto">
                <button className="mx-[3px] w-9 h-9 leading-9 group/wishlist rounded-full primary-border  text-[#555] relative">
                  <i className="fa-regular fa-heart"></i>
                  <span className="absolute top-full left-1/2 -translate-x-1/2 text-xs group-hover/wishlist:mt-2 opacity-0 group-hover/wishlist:opacity-100  transition-main mt-6">
                    WishList
                  </span>
                </button>
                <button className="mx-[3px] w-9 h-9 relative leading-9 rounded-full group/compare primary-border  text-[#555]">
                  <i className="fa fa-compress" aria-hidden="true"></i>
                  <span className="absolute top-full left-1/2 -translate-x-1/2 text-xs group-hover/compare:mt-2 opacity-0 group-hover/compare:opacity-100  transition-main mt-6">
                    Compare
                  </span>
                </button>
              </div>
            </div>

            <div className="text-[#555555]">
              {product?.category && (
                <div className="  mb-[10px]  ">
                  <label className="min-w-[100px] inline-block ">
                    Categories:{" "}
                  </label>
                  {product?.category.map((category, i) => (
                    <p
                      key={category._id}
                      className="inline-block text-main mr-1 cursor-pointer"
                    >
                      {category.name}
                      {i !== product?.category.length - 1 && (
                        <span className="text-black ">, </span>
                      )}
                    </p>
                  ))}
                </div>
              )}

              {product?.tags && (
                <div className=" mb-[10px]">
                  <label className="inline-block min-w-[100px] w-full">
                    Tags:{" "}
                  </label>
                  <ul className="">
                    {product?.tags.map((tag, i) => (
                      <li
                        key={i}
                        className="inline-block text-main mr-1 cursor-pointer"
                      >
                        {tag?.name}
                        {i !== product?.tags.length - 1 && (
                          <span className="text-black">, </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product?.share && (
                <div className="flex mb-[10px]">
                  <label className="min-w-[100px]">Share: </label>
                  <ul className="">
                    {product?.share.map((share, i) => (
                      <li
                        key={share._id}
                        className="inline-block mx-[6px] text-xs text-[#999] hover:text-main transition-main cursor-pointer"
                      >
                        <i className={share.icon}></i>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="pb-40">
        <div className="md:flex text-center hidden  gap-[4px] mb-[50px]">
          <div
            onClick={() => setSelectMode("description")}
            className={`${
              selectMode === "description"
                ? "bg-main text-white border-main"
                : ""
            } transition-main cursor-pointer px-5 rounded-[18px] inline-block h-9 leading-9 border-[1px] relative after:w-[10px] after:h-[10px] after:bg-[#e5e5e5] after:absolute after:top-1/2 after:right-0 after:-translate-y-1/2 after:translate-x-[8px] after:rounded-full  border-[#e5e5e5] after:z-30 last:after:hidden`}
          >
            {"Description	"}
          </div>
          <div
            onClick={() => setSelectMode("reviews")}
            className={`${
              selectMode === "reviews" ? "bg-main text-white border-main" : ""
            } transition-main cursor-pointer px-5 rounded-[18px] inline-block h-9 leading-9 border-[1px] relative after:w-[10px] after:h-[10px] after:bg-[#e5e5e5] after:absolute after:top-1/2 after:right-0 after:-translate-y-1/2 after:translate-x-[8px] after:rounded-full  border-[#e5e5e5] after:z-30 last:after:hidden`}
          >
            {`Reviews (${product?.reviews?.length || 0})`}
          </div>
        </div>

        {selectMode === "description" && (
          <div className="p-[30px] border">
            <div>
              <h1 className="text-[30px] text-main mb-5">Description</h1>
              <p
                className=""
                dangerouslySetInnerHTML={{
                  __html: product?.description as string,
                }}
              />
            </div>
          </div>
        )}

        {selectMode === "reviews" && (
          <div className="p-[30px] border ">
            <div>
              <h1 className=" text-[#555]  mb-5">
                {product?.reviews?.length} review for{" "}
                <span className="text-main">{product?.name}</span>
              </h1>
              {product?.reviews?.map((review) => (
                <div className="flex gap-[30px] mb-5">
                  <div className="">
                    <img
                      src={review.user.avatar.asset.url}
                      alt=""
                      className="w-[70px] h-[70px] rounded-full"
                    />
                  </div>
                  <div className="p-5 flex-1 border rounded">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="mr-1 font-bold">
                          {review.user.name}
                        </span>
                        -
                        <span className="ml-1 text-[#999999]">
                          {new Date(review._createdAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "2-digit", year: "numeric" }
                          )}
                        </span>
                      </div>
                      <div>
                        <div className="flex gap-[4px] mb-3">
                          {review.rating &&
                            review.rating > 0 &&
                            [...new Array(review.rating).keys()].map(
                              (rating) => (
                                <i
                                  key={rating}
                                  className="fa-solid fa-star text-yellow-400 text-[13px]"
                                ></i>
                              )
                            )}

                          {review.rating &&
                            5 - review.rating !== 0 &&
                            [...new Array(5 - review.rating).keys()].map(
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
                    <div>
                      <p
                        className="text-[#555555]"
                        dangerouslySetInnerHTML={{ __html: review.text }}
                      ></p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-[#555555]">
                <h2 className="">Add a review</h2>
                <div className="  mb-[10px]">
                  You must be
                  <Link
                    className="hover:text-main transition-main mx-1"
                    to={"/login"}
                  >
                    logged in
                  </Link>
                  to post a review.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <FooterV2/>
    </div>
  );
};

export default index;
