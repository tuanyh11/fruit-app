import React from "react";
import { BreadCrumb, Container, FooterV2 } from "../../components";
import FruitAndHealth from "./FruitAndHealth";
import PeopleSay from "./PeopleSay";
import DedicatedFarmer from "./DedicatedFarmer";

const index = () => {
  return (
    <div>
      <Container>
        <div className=" ">
          <BreadCrumb />
        </div>
        <div className="mb-[50px]  ">
          <FruitAndHealth
            content={{ title: "Fruit And Health" }}
            inAbout={"col-span-12"}
            classTitle={" mt-[65px] mb-10 leading-[1.1] text-[30px] font-bold"}
          />
          <div className="   "></div>
          <div className="pt-[70px] pb-[120px] mb-[65px]">
            <PeopleSay />
          </div>

          <div className="mb-[55px]">
            <DedicatedFarmer />
          </div>
        </div>
        <div className="">
          <FooterV2 />
        </div>
      </Container>
    </div>
  );
};

export default index;
