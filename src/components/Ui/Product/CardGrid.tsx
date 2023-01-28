import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartSliceInter, Product } from "../../../interfaces";
import { connect } from "react-redux";
import { addToCart } from "../../../features/slices/cartSlice";
import { RootState } from "../../../features";
import {FaCheck} from 'react-icons/fa'

interface Times {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const handleTimeCounter = (value: string) => {
  const times = new Date(value).getTime() - new Date().getTime();
  const seconds = times / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  return {
    days: Math.floor(days),
    hours: Math.floor(hours % 60),
    minutes: Math.floor(minutes % 60),
    seconds: Math.floor(seconds % 60),
  };
};

interface Props extends Product {
  border?: boolean;
  showOnSales?: boolean;
  cssImage?: string;
  addToCart?: (product: Product) => void;
  isStored?: boolean;
  showOnDale?: boolean;
}

const CardSale: React.FC<Props> = ({
  border = false,
  showOnSales = true,
  cssImage,
  addToCart = () => {},
  isStored,
  showOnDale = false,
  ...rest
}) => {
  const [times, setTimes] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { imagesGallery, name, salePrice, price, isOnSale, isOnDeal, endDate, _id } =
    rest;


  useEffect(() => {
    let intervalId: number = 0;
    const isExpired = new Date(endDate).getTime() - new Date().getTime() > 0
    if (isOnDeal && showOnDale && isExpired) {
      intervalId = setInterval(() => {
        setTimes(handleTimeCounter(endDate));
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
      console.log(intervalId)
    };
  }, [endDate]);


  return (
    <div
      className={`${border ? "border px-[10px] pt-[10px] pb-5 " : "p-[10px]"} `}
    >
      <div className={`cardSaller-image relative z-10 group/cardSale `}>
        {isOnDeal && showOnSales && (
          <div className="absolute z-[999999] top-0 left-1/2 -translate-x-1/2 border-2 border-main rounded-[20px] bg-white ">
            <div className="flex h-10 justify-center w-[160px] ">
              {Object.keys(times).map((key: string, i) => (
                <div
                  key={i}
                  className="leading-10  last:after:hidden after:content-[':'] after:mx-[5px] text-main text-[14px]"
                >
                  {times[key as keyof Times]}
                </div>
              ))}
            </div>
          </div>
        )}
        <Link
          to={`/product/${_id}`}
          className="relative text-center  block  group-hover/cardSale:after:opacity-100 after:opacity-0  after:absolute after:inset-0 after:z-10 after:bg-black/10"
        >
          {imagesGallery.slice(0, 2).map((image, index) => {
            return (
              <img
                className={`${
                  index === 0
                    ? "block group-hover/cardSale:opacity-0 "
                    : "absolute z-10 inset-0 opacity-0 rotate-y-90  group-hover/cardSale:rotate-0 group-hover/cardSale:opacity-100 "
                } !cursor-pointer mx-auto  ${
                  cssImage || "min-w-[250px] h-[250px]"
                }  transition-main align-middle`}
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
      <div className="text-center  relative z-10 pt-[17px]">
        <Link to={`/product/${_id}`} className="leading-6  block  hover:text-main transition-main text-[18px] text-[#333] capitalize mb-[7px]">
          {name}
        </Link>
        {price && isOnSale ? (
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-[#999] line-through ">${price}</span>
            {salePrice && (
              <span className="text-[18px]  text-main">${salePrice}</span>
            )}
            {isOnDeal && (
              <span className="w-[30px] h-[30px] bg-orange block leading-[30px] rounded-full text-[12px] text-white truncate">
                -{100 - Math.floor((salePrice / price) * 100)}%
              </span>
            )}
          </div>
        ) : (
          <span className="text-[18px]  text-main">${price}</span>
        )}
        <div className="mt-[35px] flex justify-center gap-2">
          <button className="w-9 h-9 leading-9 group/wishlist rounded-full primary-border  text-[#555] relative">
            <i className="fa-regular fa-heart"></i>
            <span className="absolute top-full left-1/2 -translate-x-1/2 text-xs group-hover/wishlist:mt-2 opacity-0 group-hover/wishlist:opacity-100  transition-main mt-6">
              WishList
            </span>
          </button>
          <button
            onClick={() =>
              addToCart(rest)
            }
            className="h-[36px] truncate  flex  gap-2 items-center capitalize leading-9 text-center text-sm bg-main text-white px-3 rounded-[18px] hover:bg-orange transition-main"
          >
            Add to cart
            {isStored && <FaCheck/>}
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
  );
};

const mapStateToProps = (state: RootState, ownProps: Props):Props => {

  return { 
    isStored: state.cart.data?.some((data) => data._id === ownProps._id && !data?.isRemove),
    ...ownProps,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  addToCart: (product: Product) =>
    dispatch({ type: "cart/addToCart", payload: product }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardSale);
