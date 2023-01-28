import React, { useLayoutEffect, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartSlice } from "../../hooks";
import { Product } from "../../interfaces";

interface CartProduct extends Product {
  quantity?: any;
}

const CartPc = () => {
  const { data, total, recoverCart, softDelCart, updateCart } = useCartSlice();

  // console.log(data);

  const [cart, setCart] = useState<CartProduct[]>([]);

  const [itemRemoved, setItemRemoved] = useState<string[]>([]);

  const [isUpdated, setIsUpdated] = useState(false);

  useLayoutEffect(() => {
    setCart([...data.filter((item) => !item?.isRemove)]);
  }, [data]);

  const inCreaseQty = (id: string) => {
    const newCart = cart.map((item) => {
      if (item._id === id && item.quantity) {
        setIsUpdated(true);
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart([...newCart]);
  };

  const deCreaseQty = (id: string) => {
    const newCart = cart.map((item) => {
      if (item._id === id && item.quantity && item.quantity > 1) {
        setIsUpdated(true);
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart([...newCart]);
  };

  const handleChangeQty = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (/^[0-9]*$/.test(e?.target.value)) {
      cart.some((item) => {
        if (item._id === id) {
          item.quantity = e?.target.value;
          setIsUpdated(true);
          return true;
        }
      });
      setCart([...cart]);
    }
  };

  const handleUpdate = () => {
    cart.map((item) => {
      updateCart(item);
    });
  };

  return (
    <div>
      {itemRemoved.length > 0 && (
        <div
          className="py-[14px] pl-[50px] pr-7 relative  border-t-[3px] border-[#8fae1b] mb-7 text-[#515151] bg-[#f7f6f7]"
          role="alert"
        >
          <div className=" absolute left-6 text-white top-1/2 w-[14px] h-[14px] leading-[14px] text-center rounded-full text-[10px] bg-[#8fae1b] -translate-y-1/2">
            &#10004;
          </div>
          <div>
            “Fruit juice” removed.{" "}
            <button
              onClick={() => {
                recoverCart(itemRemoved[itemRemoved.length - 1]);
                setItemRemoved([]);
              }}
              className="transition-main hover:text-main"
            >
              Undo?
            </button>{" "}
          </div>
        </div>
      )}

      {cart.length === 0 ? (
        <>
          <div
            className="py-[14px] pl-[50px] pr-7 relative  border-t-[3px] border-[#1e85be] mb-7 text-[#515151] bg-[#f7f6f7]"
            role="alert"
          >
            <div className=" absolute left-6 text-white top-1/2 w-[14px] h-[14px] leading-[14px] text-center rounded-full text-[10px] bg-[#1e85be] -translate-y-1/2">
              &#8482;
            </div>
            <div>Your cart is currently empty.</div>
          </div>
          <Link
            className="h-9 inline-block bg-main transition-main cursor-pointer hover:bg-orange text-white leading-9 px-5 rounded-[18px]"
            to="/shop"
          >
            Return to shop
          </Link>
        </>
      ) : (
        <>
          <div className="hidden lg:block">
            <table className="w-full mb-6">
              <thead>
                <tr>
                  <th className="py-[9px] px-3">
                    <span className="screen-reader-text"></span>
                  </th>
                  <th className="py-[9px] px-3">
                    <span className="screen-reader-text"></span>
                  </th>
                  <th className="py-[9px] px-3 text-left">Product</th>
                  <th className="py-[9px] px-3 text-left">Price</th>
                  <th className="py-[9px] px-3 text-left">Quantity</th>
                  <th className="py-[9px] px-3 text-left">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td className="py-[9px] px-3 text-left border-y border-dashed">
                        <button
                          onClick={() => {
                            softDelCart(item._id);
                            setItemRemoved([...itemRemoved, item._id]);
                          }}
                          className="text-[1.5em] leading-[1.5em] w-[1em] h-[1em] rounded-full hover:bg-red-500 transition-main hover:text-white flex items-center justify-center  font-bold text-red-500 "
                        >
                          ×
                        </button>
                      </td>
                      <td className="py-[9px] px-3 text-left border-y border-dashed">
                        <img
                          src={item?.image?.asset.url}
                          alt=""
                          className="w-8 h-8"
                        />
                      </td>
                      <td className="py-[9px] px-3 text-left border-y border-dashed">
                        <h2 className="text-lg text-[#555555]">{item.name}</h2>
                      </td>
                      <td className="py-[9px] px-3 text-left border-y border-dashed">
                        <span className=" text-[#333333]">${item.price}</span>
                      </td>
                      <td className="py-[9px] px-3 text-left border-y border-dashed">
                        <div className="h-[36px] w-[130px] leading-9 text-center border rounded-md overflow-hidden  ">
                          <button onClick={() => deCreaseQty(item._id)}>
                            <i
                              className="fa fa-arrow-circle-down text-silver"
                              aria-hidden="true"
                            ></i>
                          </button>
                          <input
                            type="text"
                            value={item?.quantity}
                            onChange={(e) => handleChangeQty(e, item._id)}
                            className="w-[3.631em] outline-none text-center px-2"
                          />
                          <button onClick={() => inCreaseQty(item._id)}>
                            <i
                              className="fa fa-arrow-circle-up text-silver"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </div>
                      </td>
                      <td className="py-[9px] px-3 text-left border-y border-dashed ">
                        <span className=" text-[#333333]">
                          ${item?.subtotal}
                        </span>
                      </td>
                    </tr>
                  );
                })}

                <tr>
                  <td colSpan={6} className="pt-[15px] pb-[9px] px-3">
                    <div className="flex justify-between items-center">
                      <div className=" float-left">
                        <input
                          type="text"
                          className="input-text w-[200px] p-[6px] outline-none border rounded-md mr-1"
                          placeholder="Coupon code"
                        />
                        <button
                          className="h-9 bg-main transition-main cursor-pointer hover:bg-orange text-white leading-9 px-5 rounded-[18px]"
                          name="apply_coupon"
                          value="Apply coupon"
                        >
                          Apply coupon
                        </button>
                      </div>
                      <button
                        type="button"
                        disabled={!isUpdated}
                        onClick={() => handleUpdate()}
                        className={`h-9 bg-main text-white leading-9 px-5 rounded-[18px] ${
                          isUpdated ? "" : "opacity-50 cursor-not-allowed"
                        }`}
                      >
                        Update cart
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className=" block lg:hidden">
            <table className="w-full">
              <tbody>
                {cart.map((item, index) => {
                  return (
                    <tr key={item._id} className="block">
                      <td
                        className={`py-[9px] px-3 border-y border-dashed block text-center ${
                          index % 2 !== 0 ? "bg-[rgba(0,0,0,.025)]" : ""
                        }`}
                      >
                        <div className="flex justify-center">
                          <button
                            onClick={() => {
                              softDelCart(item._id);
                              setItemRemoved([...itemRemoved, item._id]);
                            }}
                            className="text-[1.5em] leading-[1.5em] w-[1em] h-[1em] rounded-full  hover:bg-red-500 transition-main hover:text-white flex items-center justify-center  font-bold text-red-500 "
                          >
                            ×
                          </button>
                        </div>
                      </td>
                      <td
                        className={`py-[9px] px-3 border-y border-dashed block text-center ${
                          index % 2 !== 0 ? "bg-[rgba(0,0,0,.025)]" : ""
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[#333333]  font-bold">
                            Image:
                          </span>
                          <img
                            src={item?.image?.asset.url}
                            alt=""
                            className="w-8 h-8"
                          />
                        </div>
                      </td>
                      <td
                        className={`py-[9px] px-3 border-y border-dashed block text-center ${
                          index % 2 !== 0 ? "bg-[rgba(0,0,0,.025)]" : ""
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[#333333]  font-bold">
                            Product:
                          </span>
                          <h2 className="text-lg text-[#555555]">
                            {item.name}
                          </h2>
                        </div>
                      </td>
                      <td
                        className={`py-[9px] px-3 border-y border-dashed block text-center ${
                          index % 2 !== 0 ? "bg-[rgba(0,0,0,.025)]" : ""
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[#333333]  font-bold">
                            Price:
                          </span>
                          <span className=" text-[#333333]">${item.price}</span>
                        </div>
                      </td>
                      <td
                        className={`py-[9px] px-3 border-y border-dashed block text-center ${
                          index % 2 !== 0 ? "bg-[rgba(0,0,0,.025)]" : ""
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[#333333]  font-bold">
                            Quantity:
                          </span>
                          <div className="h-[36px] w-[130px] leading-9 text-center border rounded-md overflow-hidden  ">
                            <button onClick={() => deCreaseQty(item._id)}>
                              <i
                                className="fa fa-arrow-circle-down text-silver"
                                aria-hidden="true"
                              ></i>
                            </button>
                            <input
                              type="text"
                              value={item?.quantity}
                              onChange={(e) => handleChangeQty(e, item._id)}
                              className="w-[3.631em] outline-none text-center px-2"
                            />
                            <button onClick={() => inCreaseQty(item._id)}>
                              <i
                                className="fa fa-arrow-circle-up text-silver"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td
                        className={`py-[9px] px-3 border-y border-dashed block text-center ${
                          index % 2 !== 0 ? "bg-[rgba(0,0,0,.025)]" : ""
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[#333333]  font-bold">
                            Subtotal:
                          </span>
                          <span className=" text-[#333333]">
                            ${item.subtotal}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td
                    colSpan={6}
                    className="pt-[15px] pb-[9px] px-3 bg-[rgba(0,0,0,.025)]"
                  >
                    <div className="flex justify-between items-center flex-wrap">
                      <div className="flex w-full items-center gap-4 mb-[7px]">
                        <input
                          type="text"
                          className="input-text w-6/12 p-[6px] outline-none border rounded-md "
                          placeholder="Coupon code"
                        />
                        <button
                          type="button"
                          className="h-9 w-6/12 bg-main transition-main cursor-pointer hover:bg-orange text-white leading-9 px-5 rounded-[18px]"
                        >
                          Apply coupon
                        </button>
                      </div>
                      <button
                        type="button"
                        disabled={!isUpdated}
                        onClick={() => handleUpdate()}
                        className={`h-9 w-full bg-main text-white leading-9 px-5 rounded-[18px]  ${
                          isUpdated ? "" : "opacity-50 cursor-not-allowed"
                        }`}
                        name="apply_coupon"
                        value="Apply coupon"
                      >
                        Update cart
                      </button>

                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="">
            <div className="flex justify-end">
              <div className="w-full lg:w-6/12">
                <h2 className="text-lg mt-5 mb-[10px] font-bold">
                  Cart totals
                </h2>
                <table
                  cellSpacing={0}
                  className="shop_table shop_table_responsive border rounded-[5px] w-full border-separate mb-[6px]"
                >
                  <tbody>
                    <tr className="cart-subtotal">
                      <th className="py-[9px] px-3 lg:w-[35%] text-left">
                        Subtotal
                      </th>
                      <td
                        data-title="Subtotal"
                        className="py-[9px] px-3 lg:text-start text-end"
                      >
                        <span className="woocommerce-Price-amount amount">
                          <bdi>
                            <span className="woocommerce-Price-currencySymbol">
                              $
                            </span>
                            {total}
                          </bdi>
                        </span>
                      </td>
                    </tr>

                    <tr className="order-total">
                      <th className="py-[9px] px-3 text-left w-[35%] border-t">
                        Total
                      </th>
                      <td
                        data-title="Total"
                        className="py-[9px] px-3 border-t lg:text-start text-end"
                      >
                        <strong>
                          <span className="woocommerce-Price-amount amount">
                            <bdi>
                              <span className="woocommerce-Price-currencySymbol">
                                $
                              </span>
                              {total}
                            </bdi>
                          </span>
                        </strong>{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="py-[14px]">
                  <Link
                    to="/checkout"
                    className="h-9 inline-block  bg-main transition-main cursor-pointer text-white leading-9 px-5 rounded-[18px] transition-main hover:bg-orange "
                  >
                    Proceed to checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPc;
