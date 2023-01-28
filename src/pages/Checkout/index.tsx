import { useState, useRef, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useCartSlice } from "../../hooks";
import { countries } from "../../lib/data/index";

const index = () => {
  const [showCoupon, setShowCoupon] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const countryRef = useRef<any>();

  const { data, total } = useCartSlice();

  const { control, setValue } = useForm({
    defaultValues: {
      country: {
        ...countries[0],
      },
    },
  });

  const [searchCountry, setSetCountry] = useState("");

  const selectedCountry = useWatch({
    control,
    name: "country",
  });

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      setIsOpen(false);
    }

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [countryRef, isOpen]);

  const showCountries = countries.filter((country) =>
    country.name.toLowerCase().indexOf(searchCountry.trim().toLowerCase()) < 0
      ? false
      : true
  );
  return (
    <div>
      <div className="">
        <h2 className="text-[30px] mt-5 mb-[10px]">Checkout</h2>
      </div>
      <div className="">
        <div
          className="py-[14px] pl-[50px] pr-7 relative  border-t-[3px] border-[#1e85be] mb-7 text-[#515151] bg-[#f7f6f7]"
          role="alert"
        >
          <div className=" absolute left-6 text-white top-1/2 w-[14px] h-[14px] leading-[14px] text-center rounded-full text-[10px] bg-[#1e85be] -translate-y-1/2">
            &#8482;
          </div>
          <div>
            Have a coupon?{" "}
            <span
              onClick={() => setShowCoupon(!showCoupon)}
              className=" cursor-pointer hover:text-main transition-main"
            >
              Click here to enter your code
            </span>
          </div>
        </div>
      </div>

      <div
        className={`rounded-[5px] transition-all duration-300 ease-linear px-5 ${
          showCoupon ? "py-5 my-7 border  " : " max-h-0 overflow-hidden "
        } `}
      >
        <div>
          <label className="mb-[10px] block">
            If you have a coupon code, please apply it below.
          </label>
          <div className="flex">
            <input
              type="text"
              placeholder="Coupon code"
              className="h-[34px] w-[47%] rounded-md px-[10px] outline-none border border-[#e5e5e5]"
            />
            <div className="ml-[55px]">
              <button
                className="h-9 bg-main transition-main cursor-pointer hover:bg-orange text-white leading-9 px-5 rounded-[18px]"
                type="button"
              >
                Apply coupon
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-2 gap-[30px] gap-y-0">
          <div className=" col-span-2 lg:col-span-1">
            <h3 className="text-[18px] font-bold mt-5 mb-[10px]">
              Billing details
            </h3>

            <div>
              <div className="flex gap-[30px] p-[3px]">
                <div>
                  <label className="block leading-[2] mb-[5px]">
                    First name <span className="text-[red] font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    className="h-[34px] w-full  rounded-md px-[10px] outline-none border border-[#e5e5e5]"
                  />
                </div>
                <div>
                  <label className="block leading-[2] mb-[5px]">
                    Last name <span className="text-[red] font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    className="h-[34px] w-full rounded-md px-[10px] outline-none border border-[#e5e5e5]"
                  />
                </div>
              </div>

              <div className="p-[3px]">
                <label className="block leading-[2] mb-[5px]">
                  Company name (optional)
                </label>
                <input
                  type="text"
                  className="h-[34px] w-full  rounded-md px-[10px] outline-none border border-[#e5e5e5]"
                />
              </div>

              <div className="p-[3px]">
                <label className="block leading-[2] mb-[5px]">
                  Country / Region
                  <span className="text-[red] font-bold">*</span>
                </label>
                <div className="">
                  <div
                    onClick={(e) => {
                      setIsOpen(!isOpen);
                      e.stopPropagation();
                    }}
                    className="h-[34px] w-full relative   rounded-md px-[10px] cursor-pointer outline-none border border-[#e5e5e5]"
                  >
                    <div className="h-full  flex items-center">
                      {selectedCountry?.name}
                    </div>
                    {isOpen && (
                      <div className=" absolute  top-0 w-full -translate-y-full bg-white left-0  border border-[#aaa] rounded">
                        <div className="p-1 ">
                          <input
                            onChange={(e) => setSetCountry(e.target.value)}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            type="text"
                            className="p-1 w-full border outline-none border-[#aaa]"
                          />
                        </div>
                        <ul
                          ref={countryRef}
                          className="max-h-[200px] overflow-y-auto"
                        >
                          {showCountries.length > 0 ? (
                            showCountries.map((country) => {
                              return (
                                <li
                                  onClick={() => {
                                    setValue("country", {
                                      name: country.name,
                                      code: country.code,
                                    });
                                  }}
                                  className={`p-[6px] hover:bg-[#0073aa] hover:text-white ${
                                    selectedCountry.code === country.code
                                      ? " bg-[#ddd] "
                                      : ""
                                  }`}
                                  key={country.code}
                                >
                                  {country.name}
                                </li>
                              );
                            })
                          ) : (
                            <li className={`p-[6px]   `}>No matches found</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block leading-[2] mb-[5px]">
                  Street address <span className="text-[red] font-bold">*</span>
                </label>
                <input
                  type="text"
                  placeholder="House number and street name"
                  className="h-[34px] w-full rounded-md px-[10px] outline-none border border-[#e5e5e5]"
                />
              </div>

              <div>
                <label className="block leading-[2] mb-[5px]">
                  Apartment, suite, unit, etc.{" "}
                  <span className="text-[red] font-bold">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Apartment, suite, unit, etc."
                  className="h-[34px] w-full rounded-md px-[10px] outline-none border border-[#e5e5e5]"
                />
              </div>

              <div>
                <label className="block leading-[2] mb-[5px]">
                  Town / City <span className="text-[red] font-bold">*</span>
                </label>
                <input
                  type="text"
                  className="h-[34px] w-full rounded-md px-[10px] outline-none border border-[#e5e5e5]"
                />
              </div>

              <div>
                <label className="block leading-[2] mb-[5px]">
                  State / County <span className="text-[red] font-bold">*</span>
                </label>
                <input
                  type="text"
                  className="h-[34px] w-full rounded-md px-[10px] outline-none border border-[#e5e5e5]"
                />
              </div>

              <div>
                <label className="block leading-[2] mb-[5px]">
                  Postcode / ZIP <span className="text-[red] font-bold">*</span>
                </label>
                <input
                  type="text"
                  className="h-[34px] w-full rounded-md px-[10px] outline-none border border-[#e5e5e5]"
                />
              </div>

              <div>
                <label className="block leading-[2] mb-[5px]">
                  Phone <span className="text-[red] font-bold">*</span>
                </label>
                <input
                  type="text"
                  className="h-[34px] w-full rounded-md px-[10px] outline-none border border-[#e5e5e5]"
                />
              </div>

              <div>
                <label className="block leading-[2] mb-[5px]">
                  Email address <span className="text-[red] font-bold">*</span>
                </label>
                <input
                  type="text"
                  className="h-[34px] w-full rounded-md px-[10px] outline-none border border-[#e5e5e5]"
                />
              </div>
            </div>
          </div>
          <div className=" col-span-2 lg:col-span-1">
            <h3 className="text-[18px] font-bold mt-5 mb-[10px]">
              Additional information
            </h3>
            <div>
              <label className="block leading-[2] mb-[5px]">
                Order notes (optional)
              </label>
              <textarea
                cols={5}
                rows={2}
                className="h-[4em] w-full  rounded-md p-[10px]  outline-none border border-[#e5e5e5]"
              />
            </div>
          </div>
        </div>

        <div className="">
          <h3 className="text-[18px] font-bold mt-5 mb-[10px]">Your order</h3>
          <table className="w-full mb-6">
            <thead>
              <tr>
                <th className="py-[9px] px-3 text-left border-b ">Product</th>
                <th className="py-[9px] px-3 text-left border-b">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => {
                return (
                  <tr key={item._id}>
                    <td
                      className={`py-[9px] px-3 text-left border-y border-dashed ${
                        i === 0 ? "!border-t-0" : ""
                      } ${i === data.length - 1 ? "!border-b-0" : ""}`}
                    >
                      <h2 className=" text-[#555555]">
                        {item.name}
                        <strong className="text-[#333333] ml-1">
                          {" "}
                          ×{item.quantity}
                        </strong>
                      </h2>
                    </td>
                    <td
                      className={`py-[9px] px-3 text-left border-y border-dashed ${
                        i === 0 ? "!border-t-0" : ""
                      } ${i === data.length - 1 ? "!border-b-0" : ""}`}
                    >
                      <span className=" text-[#333333]">${item?.subtotal}</span>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td
                  className={`py-[9px] px-3 text-left border-y `}
                >
                  <h2 className=" text-[#555555]">
                    <strong className="text-[#333333]">Subtotal</strong>
                  </h2>
                </td>
                <td
                  className={`py-[9px] px-3 text-left border-y `}
                >
                  <strong className="text-[#333333] ">${total}</strong>
                </td>
              </tr>

              <tr>
                <td
                  className={`py-[9px] px-3 text-left border-t `}
                >
                  <h2 className=" text-[#555555]">
                    <strong className="text-[#333333]">Total</strong>
                  </h2>
                </td>
                <td
                  className={`py-[9px] px-3 text-left border-t `}
                >
                  <strong className="text-[#333333] ">${total}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default index;
