import { useState, useEffect } from "react";
import { getHeaders } from "../../../api";
import { Link, NavLink } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import Slider, { Settings } from "react-slick";
import CardGrid from "../../Ui/Product/CardGrid";
import { Product } from "../../../interfaces";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

interface Navigation {
  _id: string;
  name: string;
  types: string;
  isHasSubnav: boolean;
  url: string;
  products: Product[];
  advertising: {
    _id: string;
    title: string;
    description: string;
    image: {
      asset: {
        url: string;
      };
    };
  };

  subNav: [
    {
      _id: string;
      name: string;
      url: string;
      subNav: [
        {
          _id: string;
          name: string;
          url: string;
        }
      ];
    }
  ];
}

interface PropsListSecond {
  isChild: boolean;
  selectShowItems?: string[];
  handleSetOpenNav?: () => void;
  items: [
    {
      _id: string;
      name: string;
      url: string;
      subNav: [
        {
          _id: string;
          name: string;
          url: string;
        }
      ];
    }
  ];
}

const ListStyleSecond: React.FC<PropsListSecond | any> = ({
  items,
  isChild = false,
  selectShowItems = [],
  handleSetOpenNav = () => {},
}) => {
  return (
    <>
      <div className="md:block hidden">
        <div
          className={`absolute mt-[30px]  transition-all duration-300 ease-out invisible  ${
            isChild
              ? "left-full group-hover/subNav:mt-0 group-hover/subNav:top-0 group-hover/subNav:opacity-100 x  group-hover/subNav:visible"
              : "left-0 group-hover:mt-0 group-hover:opacity-100 invisible  group-hover:visible"
          }  shadow-[0_5px_5px_0_rgb(0_0_0/10%)]  top-full w-[200px] bg-white z-50  opacity-0   `}
        >
          <ul className="text-start">
            {items.map((item: any) => {
              const isHasSubnav = item?.subNav?.length > 0;
              return (
                <li
                  key={item._id}
                  className={`px-5 ${
                    item?.subNav?.length > 0 ? "relative group/subNav" : ""
                  }`}
                >
                  <Link
                    className="py-[10px] relative  text-[#555] border-b-[1px] block capitalize hover:text-main transition-main"
                    to={item?.url || "/"}
                  >
                    {item.name}
                    {isHasSubnav && (
                      <button
                        onClick={(e) => e.preventDefault()}
                        className="fa fa-angle-right px-4 h-full menu-down text-[10px] mb-icon-menu ml-auto absolute right-0 top-1/2 -translate-y-1/2"
                        aria-hidden="true"
                      ></button>
                    )}
                  </Link>
                  {isHasSubnav && (
                    <ListStyleSecond
                      items={item?.subNav || []}
                      isChild={true}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="md:hidden">
        <ul className="text-start">
          {items.map((item: any) => {
            const isHasSubnav = item?.subNav?.length > 0;
            return (
              <li
                key={item._id}
                className={`pl-5  group ${
                  item?.subNav?.length > 0 ? "relative group/subNav" : ""
                }`}
              >
                <div className="relative  text-[#555] border-b-[1px] group-last:!border-b-0 block capitalize hover:text-main transition-main">
                  <Link
                    to={item?.url || "/"}
                    className=" leading-10 h-10 block "
                  >
                    {item.name}
                  </Link>
                  {isHasSubnav && (
                    <button
                      onClick={() => handleSetOpenNav(item._id)}
                      className="fa fa-angle-down menu-down mb-icon-menu text-[10px] mb-icon-menu ml-auto absolute right-0 top-0 translate-y-[160%]"
                      aria-hidden="true"
                    ></button>
                  )}
                  {isHasSubnav && (
                    <div
                      className={`${
                        selectShowItems.includes(item?._id) ? "block" : "hidden"
                      }`}
                    >
                      <ListStyleSecond items={item?.subNav} isChild={true} />
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

function PreArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      className="absolute top-0  text-2xl -translate-y-1/2 z-50 hover:bg-main transition-main flex justify-center items-center  
       bg-white border-[1px] border-[#e5e5e5] text-[#c5c5c5] bottom-0 right-[0]  transition-main  w-[30px] h-[30px]  rounded-full hover:border-main hover:text-white"
      onClick={onClick}
    >
      <IoIosArrowRoundForward />
    </button>
  );
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className={` absolute top-0 z-50  mr-9 text-2xl hover:bg-main transition-main flex justify-center items-center 
      -translate-y-1/2  bg-white border-[1px] border-[#e5e5e5] text-[#c5c5c5] bottom-0  right-[0]  transition-main   w-[30px] h-[30px]  rounded-full hover:border-main hover:text-white`}
    >
      <IoIosArrowRoundBack />
    </button>
  );
}

const index = () => {
  const [data, setData] = useState<Navigation[]>([]);

  const [isSticky, setIsSticky] = useState<boolean>(false);

  const [showNav, setShowNav] = useState<boolean>(false);

  const [selectShowItems, setSelectShowItems] = useState<String[]>([]);

  const settings: Settings = {
    slidesToShow: 2,
    arrows: true,
    prevArrow: <PreArrow />,
    nextArrow: <NextArrow />,
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

  useEffect(() => {
    function handleSticky(e: Event) {
      console.log(2);
      if (window.scrollY >= 100) setIsSticky(true);
      else setIsSticky(false);
    }
    getHeaders().then((res) => setData(res.data.data.allNavigation));
    window.addEventListener("scroll", handleSticky);
    return () => window.removeEventListener("scroll", handleSticky);
  }, []);

  const handleSetOpenNav = (id: string) => {
    setSelectShowItems((pre) => {
      if (pre.find((item) => item === id)) {
        return [...pre.filter((item) => item !== id)];
      }
      return [...pre, id];
    });
  };

  return (
    <div>
      <header
        className={`${
          isSticky
            ? "py-[10px] fixed top-0 left-0 right-0 common-shadow"
            : "py-5 relative"
        }  bg-white z-[999999999] transition-main   md:block hidden`}
      >
        <div className={`container mx-auto w-[1200px]   h-full px-[15px] `}>
          <div className="grid grid-cols-12  gap-2 items-center  h-full">
            {/* start Logo */}
            <div className="md:col-span-12 lg:col-span-3">
              <a
                className="box-border bg-transparent text-[rgba(85,85,85,1)] transition duration-500 ease-out  hover:text-[rgba(102,204,51,1)] focus:text-[rgba(102,204,51,1)] before:text-[rgba(102,204,51,1)] after:text-[rgba(102,204,51,1)]"
                title="logo"
              >
                <h1 className="my-2.5 box-border text-xl font-bold uppercase text-inherit font-[inherit] leading-[1.1]">
                  {"FRUITSHOP"}
                </h1>
              </a>
            </div>
            {/* end Logo */}

            {/* start menu */}
            <nav className="md:col-span-12 lg:col-span-9">
              <ul className="lg:text-center relative ">
                {data?.map((item) => (
                  <li
                    key={item._id}
                    className={`${
                      item.types === "list-2" ? "relative" : "static"
                    } box-border inline-block align-top text-sm group `}
                  >
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `${
                          isActive ? "!bg-main text-white " : "hover:text-main"
                        } relative transition-main  flex box-border  items-center h-10 rounded-2xl  bg-transparent text-sm font-bold px-[14px] uppercase leading-10  `
                      }
                    >
                      {item.name}
                      {item?.subNav?.length > 0 && (
                        <button onClick={(e) => e.preventDefault()} className="h-full">
                          <RiArrowDropDownLine
                            aria-hidden="true"
                            className="text-xl h-full"
                          />
                        </button>
                      )}
                    </NavLink>

                    {item.types === "list-2" ? (
                      <ListStyleSecond items={item.subNav} />
                    ) : (
                      <div className=" absolute mt-[30px]   transition-all duration-300 ease-out group-hover:mt-0  shadow-[0_5px_5px_0_rgb(0_0_0/10%)] -translate-x-[293px] top-full w-[1170px] bg-white z-50  opacity-0 group-hover:opacity-100 invisible  group-hover:visible  left-0  ">
                        {item.types === "list-1" && (
                          <div className="grid grid-cols-12 gap-[30px] px-[30px] pt-[30px] pb-4">
                            {item.subNav?.map((subItem) => {
                              return (
                                <div
                                  className=" col-span-3 text-left"
                                  key={subItem._id}
                                >
                                  <h1 className="text-lg uppercase font-bold pb-3 mb-5 leading-[1.1] border-b-[1px] ">
                                    {subItem?.name}
                                  </h1>
                                  <ul className="pl-3 ">
                                    {subItem.subNav.map((subItem1) => (
                                      <li
                                        key={subItem1._id}
                                        className=" capitalize  mb-[7px] text-[#ccc] pl-[7px]"
                                        style={{
                                          listStyle: "outside none circle",
                                        }}
                                      >
                                        <Link
                                          className="hover:text-main transition-main text-[#999]"
                                          to={subItem1?.url || "/"}
                                        >
                                          {subItem1.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            })}
                            <div className="col-span-3 ">
                              <div className=" cursor-pointer">
                                <div
                                  className="mt-5 relative after:absolute after:inset-0 after:bg-black/10 after:transition-all after:duration-500 after:ease-out after:opacity-0 hover:after:opacity-100 hover:after:top-1/2 hover:after:bottom-1/2
                          before:absolute before:inset-0 before:bg-black/10 before:transition-all before:duration-500 before:ease-out before:opacity-0 hover:before:opacity-100 hover:before:left-1/2 hover:before:right-1/2
                          "
                                >
                                  <img
                                    src={item.advertising.image.asset.url}
                                    alt=""
                                    className="w-full h-full"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {item.types === "grid" && (
                          <div className="px-[30px] py-[30px] ">
                            <div className="grid grid-cols-12 gap-[30px] ">
                              <div className="col-span-5">
                                <div className=" cursor-pointer">
                                  <div
                                    className="mt-5 relative after:absolute after:inset-0 after:bg-black/10 after:transition-all after:duration-500 after:ease-out after:opacity-0 hover:after:opacity-100 hover:after:top-1/2 hover:after:bottom-1/2
                          before:absolute before:inset-0 before:bg-black/10 before:transition-all before:duration-500 before:ease-out before:opacity-0 hover:before:opacity-100 hover:before:left-1/2 hover:before:right-1/2
                          "
                                  >
                                    <img
                                      src={item.advertising.image.asset.url}
                                      alt=""
                                      className="w-full h-full"
                                    />
                                  </div>
                                </div>
                                <div className="text-start ">
                                  <h3 className="mt-[15px] mb-[13px] text-[18px] font-bold text-[#555] hover:text-main transition-main cursor-pointer">
                                    {item.advertising.title}
                                  </h3>
                                  <p className="leading-6 text-[#555]">
                                    {item.advertising.description}
                                  </p>
                                </div>
                              </div>
                              <div className="col-span-7 ">
                                <div className="text-start">
                                  <h3 className="mt-5 mb-[13px] text-[18px] font-bold text-[#555] ">
                                    {"FEATURED PRODUCT"}
                                  </h3>
                                </div>
                                <div className=" -mx-[15px]">
                                  <Slider {...settings}>
                                    {item?.products.map((product) => (
                                      <div
                                        key={product._id}
                                        className="px-[15px]"
                                      >
                                        <CardGrid
                                          border={true}
                                          {...product}
                                          showOnSales={false}
                                        />
                                      </div>
                                    ))}
                                  </Slider>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            {/* end menu */}
          </div>
        </div>
      </header>

      {/* start mobile  device */}

      <header className="md:hidden relative !z-[9999999999]">
        <div className="   px-[15px]">
          <div className="col-span-12 mt-[15px]  ">
            <a
              className="box-border bg-transparent text-[rgba(85,85,85,1)] transition duration-500 ease-out  hover:text-[rgba(102,204,51,1)] focus:text-[rgba(102,204,51,1)] before:text-[rgba(102,204,51,1)] after:text-[rgba(102,204,51,1)]"
              title="logo"
            >
              <h1 className="my-2.5 box-border text-xl font-bold uppercase text-inherit font-[inherit] leading-[1.1]">
                {"FRUITSHOP"}
              </h1>
            </a>
          </div>
          <div className="col-span-12 my-[15px] relative">
            <div
              onClick={() => setShowNav(!showNav)}
              className={`${
                showNav ? "nav-btn " : ""
              } w-[30px] h-[30px] after:origin-center before:origin-center relative after:absolute after:top-1/2 after:translate-y-[10px]  after:w-full after:h-1 after:bg-main before:top-1/2 before:translate-y-[-10px] before:w-full before:h-1 before:bg-main before:absolute`}
            >
              <span
                className={`w-full h-1 bg-main left-0 absolute top-1/2  ${
                  showNav ? "hidden" : ""
                }`}
              ></span>
            </div>
            <ul
              className={`max-h-[320px] overflow-y-auto w-[290px] ${
                showNav ? "translate-x-0" : "-translate-x-[110%]"
              } absolute left-0 top-full  !z-[9999999999] shadow-[0_5px_5px_0_rgb(0_0_0_/_10%)] header-scrollbar bg-white transition-main `}
            >
              {data.map((item) => {
                return (
                  <li
                    key={item._id}
                    className="mx-[15px] text-sm  border-b-[1px]"
                  >
                    <NavLink
                      to={item?.url || "#"}
                      className={({ isActive }) =>
                        `${
                          isActive ? "!text-main  " : "hover:text-main "
                        } uppercase  h-10 relative block text-[#555] leading-10 `
                      }
                    >
                      {item.name}
                      {item?.subNav?.length > 0 && (
                        <button className="h-full">
                          <RiArrowDropDownLine
                            onClick={(e) => {
                              handleSetOpenNav(item._id);

                              e.preventDefault();
                            }}
                            aria-hidden="true"
                            className="  absolute top-1/2 h-full right-0 -translate-y-1/2 text-2xl"
                          />
                        </button>
                      )}
                    </NavLink>

                    <div
                      className={`${
                        selectShowItems.includes(item._id)
                          ? "max-h-full"
                          : "max-h-0 "
                      } transition-all duration-300  ease-linear overflow-hidden  `}
                    >
                      <div>
                        {item.types === "list-1" && (
                          <div className="px-[10px] pt-[30px]">
                            {item?.subNav?.map((subItem) => {
                              return (
                                <div key={subItem._id}>
                                  <div className="pb-4 mb-5 text-lg font-bold border-b-[1px]">
                                    <h1 className="uppercase">
                                      {subItem.name}
                                    </h1>
                                  </div>
                                  <div className="">
                                    <ul className="pl-3 ">
                                      {subItem?.subNav?.map((subItem1) => (
                                        <li
                                          key={subItem1._id}
                                          className=" capitalize subnav  mb-[7px] text-[#ccc] pl-[5px]"
                                          style={{
                                            listStyle: "outside none circle",
                                          }}
                                        >
                                          <Link
                                            className="hover:text-main truncate transition-main h-10 block leading-10 border-t-[1px] text-[#999]"
                                            to={subItem.url || "/"}
                                          >
                                            {subItem1.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              );
                            })}

                            <div className="col-span-3 ">
                              <div className=" cursor-pointer">
                                <div
                                  className="mt-5 relative after:absolute after:inset-0 after:bg-black/10 after:transition-all after:duration-500 after:ease-out after:opacity-0 hover:after:opacity-100 hover:after:top-1/2 hover:after:bottom-1/2
                          before:absolute before:inset-0 before:bg-black/10 before:transition-all before:duration-500 before:ease-out before:opacity-0 hover:before:opacity-100 hover:before:left-1/2 hover:before:right-1/2
                          "
                                >
                                  <img
                                    src={item.advertising?.image?.asset?.url}
                                    alt=""
                                    className="w-full h-full"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {item.types === "grid" && (
                          <div className="px-[10px] pt-[30px]">
                            <div className="grid grid-cols-2 gap-[30px] ">
                              <div className="col-span-2">
                                <div className=" cursor-pointer">
                                  <div
                                    className=" relative after:absolute after:inset-0 after:bg-black/10 after:transition-all after:duration-500 after:ease-out after:opacity-0 hover:after:opacity-100 hover:after:top-1/2 hover:after:bottom-1/2
                          before:absolute before:inset-0 before:bg-black/10 before:transition-all before:duration-500 before:ease-out before:opacity-0 hover:before:opacity-100 hover:before:left-1/2 hover:before:right-1/2
                          "
                                  >
                                    <img
                                      src={item.advertising.image.asset.url}
                                      alt=""
                                      className="w-full h-full"
                                    />
                                  </div>
                                </div>
                                <div className="text-start ">
                                  <h3 className="mt-[15px] mb-[13px] text-[18px] font-bold text-[#555] hover:text-main transition-main cursor-pointer">
                                    {item.advertising.title}
                                  </h3>
                                  <p className="leading-6 text-[#555]">
                                    {item.advertising.description}
                                  </p>
                                </div>
                              </div>
                              <div className="col-span-2 pb-[30px]">
                                <div className="text-start">
                                  <h3 className="mt-5 mb-[13px] text-[18px] font-bold text-[#555] ">
                                    {"FEATURED PRODUCT"}
                                  </h3>
                                </div>
                                <div className=" -mx-[15px]">
                                  <Slider {...settings}>
                                    {item?.products.map((product) => (
                                      <div
                                        key={product._id}
                                        className="px-[15px]"
                                      >
                                        <CardGrid
                                          border={true}
                                          {...product}
                                          cssImage="w-[250px] h-[250px]"
                                          showOnSales={false}
                                        />
                                      </div>
                                    ))}
                                  </Slider>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      {item.types === "list-2" && (
                        <ListStyleSecond
                          items={item.subNav}
                          handleSetOpenNav={handleSetOpenNav}
                          selectShowItems={selectShowItems}
                        />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </header>

      {/* end mobile device */}
    </div>
  );
};

export default index;
