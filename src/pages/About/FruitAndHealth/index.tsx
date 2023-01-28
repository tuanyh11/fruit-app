import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../../../components";
import { HomeSectionData } from "../../../interfaces";

interface Fruit {
  image: string;
  title: string;
  description: string;
}

const data: Fruit[] = [
  {
    image:
      "https://fruitshop.7uptheme.net/wp-content/uploads/2017/04//diet1-50x50.png",
    title: "Purple Grapes",
    description: "Best Superfoods for Weight Loss",
  },
  {
    image:
      "https://fruitshop.7uptheme.net/wp-content/uploads/2017/04//diet2-50x50.png",
    title: "Purple Grapes",
    description: "America's Healthiest Superfoods for Women",
  },
  {
    image:
      "https://fruitshop.7uptheme.net/wp-content/uploads/2017/04//diet3-50x50.png",
    title: "Purple Grapes",
    description: "3 Yummy Blender Recipes That Will Help You Lose Weight",
  },
  {
    image:
      "https://fruitshop.7uptheme.net/wp-content/uploads/2017/04//diet1-50x50.png",
    title: "Purple Grapes",
    description: "Best Superfoods for Weight Loss",
  },
  {
    image:
      "https://fruitshop.7uptheme.net/wp-content/uploads/2017/04//diet2-50x50.png",
    title: "Purple Grapes",
    description: "America's Healthiest Superfoods for Women",
  },
];

interface Props {
  content?: HomeSectionData | undefined;
  classTitle?: string;
  inAbout?: string;
}

const index: React.FC<Props> = ({ content, classTitle, inAbout }) => {
  return (
    <div className="xl:-mx-[15px] ">
      <div className="text-center">
        <h2
          className={
            classTitle ||
            "mt-[100px] mb-10 leading-[1.1] text-[30px] font-bold "
          }
        >
          {content?.title}
        </h2>
      </div>
      <div className=" grid-cols-12 grid ">
        <div className={`col-span-12 xl:col-span-4   `}>
          <div className="max-w-full h-[380px] relative">
            <div className=" overflow-y-auto lg:mb-[10px]  h-full w-full xl:w-[108%] fruit-health-thumb">
              {data.map((item, i) => (
                <div key={i} className="table mb-[30px] pr-[80px] ">
                  <div className="w-[100px]  table-cell group">
                    <Link
                      to="/"
                      className="w-[100px] flex  h-[100px] relative   rounded-full  border border-dashed
                          group-hover:border-solid group-hover:shadow-3xl border-main transition-main after:absolute 
                          after:top-1/2 after:w-[10px] after:h-[10px] after:rounded-full after:bg-main 
                            after:-translate-y-1/2 after:-right-[5px] after:scale-0 group-hover:after:scale-100 after:transition after:duration-500 ease-out
                          "
                    >
                      <img src={item.image} alt="" className="  m-auto" />
                      {/* <div className="absolute inset-0 bg-black"></div> */}
                    </Link>
                  </div>
                  <div className="table-cell align-middle pl-5">
                    <h1 className="text-lg text-[#333] transition-main hover:text-main">
                      <Link to="/">{item.title}</Link>
                    </h1>
                    <span className="leading-5 text-[#999]">
                      {item.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 xl:col-span-4 lg:ml-10 mt-[10px]">
          <img
            src="https://fruitshop.7uptheme.net/wp-content/uploads/2017/04/ruler.jpg"
            alt=""
          />
        </div>
        <div className="mt-12 md:mt-0 col-span-12 md:col-span-6 xl:col-span-4">
          <div
            className="pt-[45px] px-[50px] pb-[110px] text-center text-[#555] md:-ml-5 -mt-[10px] bg-no-repeat bg-[center_center] bg-[length:100%_100%]"
            style={{
              backgroundImage: `url(${"https://fruitshop.7uptheme.net/wp-content/uploads/2017/04/shape.png"})`,
            }}
          >
            <p className="text-[14px] leading-6">
              You've heard of Superfoods, but…Superfruits? Not every fruit
              qualifies. Those deemed ``super`` by nutrition scientists are
              packed with antioxidants, fiber, vitamins and minerals, and other
              nutrients that can help you live longer, look better, and even
              prevent disease.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
