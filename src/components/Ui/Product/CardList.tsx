import React from "react";
import { Link } from "react-router-dom";
import { CartSliceInter, Product } from "../../../interfaces";
import { Connect, connect } from "react-redux";
import { addToCart } from "../../../features/slices/cartSlice";
import { RootState } from "../../../features";
import { FaCheck } from "react-icons/fa";

interface Props extends Product {
  mobile?: boolean;
  cssImage?: string;
  border?: boolean;
  version?: number;
  addToCart?: (product: Product) => void;
  isStored?: boolean;
}

const CardList: React.FC<Props> = ({
  mobile = false,
  cssImage,
  border = false,
  version = 1,
  addToCart = () => {},
  isStored,
  ...rest
}) => {
  const { description, price, isOnSale, salePrice, imagesGallery, name, _id } = rest;


  return (
    <div>
      {mobile ? (
        <div className="grid grid-cols-2 gap-[30px]">
          <div className="cardSaller-image col-span-2 relative z-10 group/cardSale ">
            <Link
              to={"/"}
              className="relative text-center  block  group-hover/cardSale:after:opacity-100 after:opacity-0  after:absolute after:inset-0 after:z-10 after:bg-black/10"
            >
              {imagesGallery.slice(0, 2).map((image, index) => {
                return (
                  <img
                    className={`${
                      index === 0
                        ? "block group-hover/cardSale:opacity-0 "
                        : "absolute z-10 inset-0 opacity-0 rotate-y-90  group-hover/cardSale:rotate-0 group-hover/cardSale:opacity-100 "
                    } !cursor-pointer mx-auto w-[400px] h-[400px] border-[1px]  transition-main align-middle`}
                    key={image.asset._id}
                    src={image.asset.url}
                    alt={image.asset.originalFilename}
                  />
                );
              })}
            </Link>
            <button className="absolute group-hover/cardSale:scale-100 hover:bg-orange scale-0 transition-main top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-30 text-white h-10 w-10 rounded-full text-center bg-main">
              <i className="fa-solid fa-magnifying-glass "></i>
            </button>
          </div>
          <div className="col-span-2 px-[15px] ">
            <div>
              <Link
                to={"/"}
                className="leading-6 text-lg capitalize transition-main hover:text-main cursor-pointer mb-[7px] block"
              >
                {name}
              </Link>
              {price && isOnSale ? (
                <div className="mb-[7px]">
                  <span className="text-sm text-[#999] line-through mr-2">
                    ${price}
                  </span>
                  {salePrice && (
                    <span className="text-[18px]  text-main">${salePrice}</span>
                  )}
                </div>
              ) : (
                <span className="text-[18px]  text-main">${price}</span>
              )}
              <div className="my-[25px]">
                <p
                  className="break-all pt-5 border-t-[1px] text-sm "
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
              <div className="mt-[35px] flex  gap-2">
                <button className="h-[36px] capitalize leading-9 text-center text-sm bg-main text-white px-5 rounded-[18px] hover:bg-orange transition-main">
                  Add to cart
                </button>
                <button className="w-9 h-9 leading-9 group/wishlist rounded-full primary-border  text-[#555] relative">
                  <i className="fa-regular fa-heart"></i>
                  <span className="absolute top-full left-1/2 -translate-x-1/2 text-xs group-hover/wishlist:mt-2 opacity-0 group-hover/wishlist:opacity-100  transition-main mt-6">
                    WishList
                  </span>
                </button>
                <button className="w-9 h-9 relative leading-9 rounded-full group/compare primary-border  text-[#555]">
                  <i className="fa fa-compress" aria-hidden="true"></i>
                  <span className="absolute top-full left-1/2 -translate-x-1/2 text-xs group-hover/compare:mt-2 opacity-0 group-hover/compare:opacity-100  transition-main mt-6">
                    Compare
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {version === 1 && (
            <div className="grid grid-cols-12 gap-[30px]">
              <div className="cardSaller-image col-span-5 relative z-10 group/cardSale ">
                <Link
                  to={`/product/${_id}`}
                  className="relative text-center  inline-block  group-hover/cardSale:after:opacity-100 after:opacity-0  after:absolute after:inset-0 after:z-10 after:bg-black/10"
                >
                  {imagesGallery.slice(0, 2).map((image, index) => {
                    return (
                      <img
                        className={`${
                          index === 0
                            ? "block group-hover/cardSale:opacity-0 "
                            : "absolute z-10 inset-0 opacity-0 rotate-y-90  group-hover/cardSale:rotate-0 group-hover/cardSale:opacity-100 "
                        } !cursor-pointer mx-auto md:w-[280px] md:h-[280px] lg:w-[400px] lg:h-[400px] border-[1px]  transition-main align-middle`}
                        key={image.asset._id}
                        src={image.asset.url}
                        alt={image.asset.originalFilename}
                      />
                    );
                  })}
                </Link>
                <button className="absolute group-hover/cardSale:scale-100 hover:bg-orange scale-0 transition-main top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-30 text-white h-10 w-10 rounded-full text-center bg-main">
                  <i className="fa-solid fa-magnifying-glass "></i>
                </button>
              </div>
              <div className="product-info  col-span-7 lg:pl-[25px] pt-[30px]">
                <div>
                  <Link
                    to={`/product/${_id}`}
                    className="leading-6 text-lg capitalize transition-main hover:text-main cursor-pointer mb-[7px] block"
                  >
                    {name}
                  </Link>
                  {price && isOnSale ? (
                    <div className="mb-[7px]">
                      <span className="text-sm text-[#999] line-through mr-2">
                        ${price}
                      </span>
                      {salePrice && (
                        <span className="text-[18px]  text-main">
                          ${salePrice}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-[18px]  text-main">${price}</span>
                  )}
                  <div className="my-[25px]">
                    <p
                      className="break-all pt-5 border-t-[1px] text-sm "
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  </div>
                  <div className="mt-[35px] flex  gap-2">
                    <button
                      onClick={() => addToCart(rest)}
                      className="h-[36px] flex  gap-2 items-center capitalize leading-9 text-center text-sm bg-main text-white px-3 rounded-[18px] hover:bg-orange transition-main"
                    >
                      Add to cart
                      {isStored && <FaCheck />}
                    </button>
                    <button className="w-9 h-9 leading-9 group/wishlist rounded-full primary-border  text-[#555] relative">
                      <i className="fa-regular fa-heart"></i>
                      <span className="absolute top-full left-1/2 -translate-x-1/2 text-xs group-hover/wishlist:mt-2 opacity-0 group-hover/wishlist:opacity-100  transition-main mt-6">
                        WishList
                      </span>
                    </button>
                    <button className="w-9 h-9 relative leading-9 rounded-full group/compare primary-border  text-[#555]">
                      <i className="fa fa-compress" aria-hidden="true"></i>
                      <span className="absolute top-full left-1/2 -translate-x-1/2 text-xs group-hover/compare:mt-2 opacity-0 group-hover/compare:opacity-100  transition-main mt-6">
                        Compare
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {version === 2 && (
            <div className="grid grid-cols-12 gap-[30px] p-[10px] border-[1px]">
              <div className="cardSaller-image col-span-4 relative z-10 group/cardSale ">
                <Link
                  to={`/product/${_id}`}
                  className="relative text-center h-full  inline-block  group-hover/cardSale:after:opacity-100 after:opacity-0  after:absolute after:inset-0 after:z-10 after:bg-black/10"
                >
                  {imagesGallery.slice(0, 2).map((image, index) => {
                    return (
                      <img
                        className={`${
                          index === 0
                            ? "block group-hover/cardSale:opacity-0 "
                            : "absolute z-10 inset-0 opacity-0 rotate-y-90  group-hover/cardSale:rotate-0 group-hover/cardSale:opacity-100 "
                        } !cursor-pointer mx-auto h-full   transition-main align-middle`}
                        key={image.asset._id}
                        src={image.asset.url}
                        alt={image.asset.originalFilename}
                      />
                    );
                  })}
                </Link>
                <button className="absolute group-hover/cardSale:scale-100 hover:bg-orange scale-0 transition-main top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-30 text-white h-10 w-10 rounded-full text-center bg-main">
                  <i className="fa-solid fa-magnifying-glass "></i>
                </button>
              </div>
              <div className="product-info  col-span-8 ">
                <div>
                  <Link
                    to={`/product/${_id}`}
                    className="leading-6  text-lg capitalize transition-main hover:text-main cursor-pointer mb-[7px] block"
                  >
                    {name}
                  </Link>
                  {price && isOnSale ? (
                    <div className="mb-[7px]">
                      <span className="text-sm text-[#999] line-through mr-2">
                        ${price}
                      </span>
                      {salePrice && (
                        <span className="text-[18px]  text-main">
                          ${salePrice}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-[18px]  text-main">${price}</span>
                  )}
                  <div className="mt-3 pr-8">
                    <p
                      className="break-all  text-sm text-limit"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  </div>
                  <div className="mt-6 flex  gap-2">
                    <button
                      onClick={() => addToCart(rest)}
                      className="h-[36px] flex  gap-2 items-center capitalize leading-9 text-center text-sm bg-main text-white px-3 rounded-[18px] hover:bg-orange transition-main"
                    >
                      Add to cart
                      {isStored && <FaCheck />}
                    </button>
                    <button className="w-9 h-9 leading-9 group/wishlist rounded-full primary-border  text-[#555] relative">
                      <i className="fa-regular fa-heart"></i>
                      <span className="absolute top-full left-1/2 -translate-x-1/2 text-xs group-hover/wishlist:mt-2 opacity-0 group-hover/wishlist:opacity-100  transition-main mt-6">
                        WishList
                      </span>
                    </button>
                    <button className="w-9 h-9 relative leading-9 rounded-full group/compare primary-border  text-[#555]">
                      <i className="fa fa-compress" aria-hidden="true"></i>
                      <span className="absolute top-full left-1/2 -translate-x-1/2 text-xs group-hover/compare:mt-2 opacity-0 group-hover/compare:opacity-100  transition-main mt-6">
                        Compare
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState, ownProps: Props): Props => {
  return {
    isStored: state.cart.data?.some(
      (data) => data._id === ownProps._id && !data?.isRemove
    ),
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  addToCart: (product: Product) => dispatch(addToCart(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
