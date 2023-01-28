import React, { useEffect, useState, useRef, DOMElement, useMemo } from "react";
import {
  getBannerHeros,
  getBannerOffer,
  getBlogs,
  getBrand,
  getCategory,
  getDealProduct,
  getFeature,
  getHomePageData,
  getPeopleSay,
  getProductSallerByCate,
} from "../../api";
import { Container, Slider } from "../../components";
import { RiArrowDropRightLine, RiArrowDropLeftLine } from "react-icons/ri";
import Hero from "./Hero";
import {
  BannerHero,
  Blog,
  ifBrand,
  Category,
  Features,
  HomeSectionData,
  ifPeopleSay,
  Product,
} from "../../interfaces";
import Feature from "./Feature";
import Offer from "./Offer";
import BestSale from "./BestSale";
import FeatureProduct from "./FeatureProduct";
import DealsProduct from "./DealsProduct";
import Blogs from "./BlogSection";
import FruitAndHealth from "./FruitAndHealth";
import PeopleSay from "./PeopleSay";
import Brand from "./Brand";
import Map from "./Map";

// className="cursor-pointer w-10 h-10 bg-green-500 rounded-full"

interface DataSection {
  offerTitle: HomeSectionData | undefined;
  bestSallerProc: HomeSectionData | undefined;
  featureProc: HomeSectionData | undefined;
  dealsOfMonth: HomeSectionData | undefined;
  lastestBlog: HomeSectionData | undefined;
  whatPeopleSay: HomeSectionData | undefined;
  fruitAndHealth: HomeSectionData | undefined;
}

const index = () => {
  const [banners, setBanners] = useState<BannerHero[]>([]);
  const [features, setFeatures] = useState<Features[]>([]);
  const [offer, setOffer] = useState<BannerHero[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [sallerProduct, setSallerProduct] = useState<Product[]>([]);
  const [dealProduct, setDealProduct] = useState<Product[]>([]);
  const [homeData, setHomeData] = useState<HomeSectionData[]>([]);
  const [blog, setBlog] = useState<Blog[]>([]);
  const [peopleSay, setPeopleSay] = useState<ifPeopleSay[]>([]);
  const [brands, setBrands] = useState<ifBrand[]>([]);

  useEffect(() => {
    getBannerHeros().then((banner) => setBanners(banner.data?.data?.allBanner));
    getFeature().then((feature) => setFeatures(feature.data?.data?.allFeature));
    getBannerOffer().then((banner) => setOffer(banner.data?.data?.allBanner));
    getCategory().then((category) =>
      setCategory(category.data?.data?.allCategory)
    );
    getProductSallerByCate("").then((product) =>
      setSallerProduct(product.data?.data.allProduct)
    );
    getHomePageData().then((homePage) =>
      setHomeData(homePage.data?.data.allPageData?.[0]?.sections)
    );

    getDealProduct().then((product) =>
      setDealProduct(product.data?.data.allProduct)
    );

    getBlogs(2).then((blogs) => setBlog(blogs.data?.data.allBlogPost));

    getPeopleSay().then((people) =>
      setPeopleSay(people.data?.data.allPeopleSay)
    );

    getBrand().then((brand) => setBrands(brand.data?.data.allBrand));
  }, []);

  const dataSection = useMemo(
    (): DataSection => ({
      offerTitle: homeData.find((item) => item.name === "super offer"),
      bestSallerProc: homeData.find(
        (item) => item.name === "best sellers products"
      ),
      featureProc: homeData.find((item) => item.name === "featureds products"),
      dealsOfMonth: homeData.find((item) => item.name === "deals of the month"),
      lastestBlog: homeData.find(
        (item) => item.name === "latest news from the blog"
      ),
      whatPeopleSay: homeData.find((item) => item.name === "what people say"),
      fruitAndHealth: homeData.find((item) => item.name === "fruit and health"),
    }),
    [homeData]
  );
  return (
    <div>
      <Hero data={banners} />
      <div className="mt-[95px]">
        <Feature data={features} />
      </div>
      <div className="mt-[105px]">
        <Offer content={dataSection.offerTitle} data={offer} />
      </div>

      <div className="mt-[95px] pb-10">
        <BestSale
          content={dataSection.bestSallerProc}
          categories={category}
          sallerProduct={sallerProduct}
          setSallerProduct={setSallerProduct}
        />
      </div>

      <div>
        <FeatureProduct
          data={sallerProduct}
          content={dataSection.featureProc}
        />
      </div>

      <div className="pt-20 pb-[60px]">
        <DealsProduct content={dataSection.dealsOfMonth} data={dealProduct} />
      </div>
      <div className="bg-[#fafcfc] py-20">
        <Blogs content={dataSection.lastestBlog} data={blog} />
      </div>

      <div className="pb-20">
        <FruitAndHealth content={dataSection.fruitAndHealth} />
      </div>

      <div className="bg-[#fafcfc] lg:px-[351px] py-20">
        <PeopleSay
          data={peopleSay}
          setData={setPeopleSay}
          content={dataSection.whatPeopleSay}
        />
      </div>

      <div className="bg-white py-2">
        <Brand data={brands} />
      </div>

      <div className="py-[50px] bg-main ">
        <Container>
          <div className="flex lg:gap-[30px] items-center text-white mx-[15px] flex-wrap lg:flex-nowrap">
            <div className="text-[30px] leading-[1.1] flex">
              <i className="fa-solid fa-envelope mr-[10px]"></i>
              <span className="">Newsletter</span>
            </div>
            <div className="lg:w-full  ">
              <p className="w-[150px] md:ml-[50px] lg:ml-4 ">Sign up for Kelis tips, news and advice</p>
            </div>
            <div className="w-full mt-[30px] lg:mt-0">
              <form action="" className=" md:flex flex-1 w-[250px] md:w-auto">
                <input type="text" placeholder="Your email address" className=" h-[50px] md:w-[350px]   rounded-[25px] px-[25px]  text-[#999] outline-none" />
                <button className=" inline-block mt-[10px] md:mt-0 h-[50px] px-10 bg-main border-white border-2 rounded-[25px] transition-main  hover:text-main md:ml-2 hover:bg-white">SIGN UP</button>
              </form>
            </div>
          </div>
        </Container>
      </div>

      <div className="">
        <Map/>
      </div>
    </div>
  );
};

export default index;
