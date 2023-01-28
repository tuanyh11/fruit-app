import React from "react";
import { Container } from "../../../components";
import { Features } from "../../../interfaces";

interface Props {
  data: Features[];
}

const index: React.FC<Props> = ({ data = [] }) => {
  return (
    <div>
      <Container>
        <div className="grid grid-cols-12 gap-[30px] md:gap-[15px] flex-wrap">
          {data.map((feature) => (
            <div key={feature._id} className=" col-span-12 md:col-span-4">
              <div className="flex items-center flex-col lg:flex-row text-center md:text-start md:gap-0 gap-5">
                <div className="border-[1px] border-dashed relative feature border-main w-[100px] text-main h-[100px] rounded-full text-[30px] flex justify-center items-center">
                  <i className={feature.icon}></i>
                </div>
                <div className="md:pl-5">
                  <h1 className="text-[18px] mb-[5px]">{feature.name}</h1>
                  <p className="leading-6">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default index;
