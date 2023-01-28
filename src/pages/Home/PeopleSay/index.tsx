import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../../components";
import { HomeSectionData, ifPeopleSay } from "../../../interfaces";

interface Props {
  content: HomeSectionData | undefined;
  data: ifPeopleSay[];
  setData: Dispatch<SetStateAction<ifPeopleSay[]>>;
}

const index: React.FC<Props> = ({ content, data }) => {
  const [selectPeople, setSelectPeople] = useState<ifPeopleSay[]>([]);
  const [currentPerson, setCurrentPerson] = useState<ifPeopleSay>();

  useEffect(() => {
    setSelectPeople([...data]);
    setCurrentPerson(data?.[(data.length + 1) / 2]);
  }, [data]);

  const swapItem = (item: ifPeopleSay, index: number) => {
    const middleIndexItem = (selectPeople.length - 1) / 2;
    setCurrentPerson({ ...item });
    if (middleIndexItem !== index) {
      const oldItem = selectPeople[middleIndexItem];
      selectPeople[middleIndexItem] = item;
      selectPeople[index] = oldItem;
      setSelectPeople([...selectPeople]);
    }
  };

  return (
    <div className="px-[15px]">
      <Container>
        <div className="text-center ">
          <h2 className=" text-[30px] font-bold mb-[40px]">{content?.title}</h2>
        </div>
        <div className="lg:max-w-[870px] mx-auto">
          <div className="flex  justify-center gap-6 items-center mb-5">
            {selectPeople.map((people, index) => {
              return (
                <div
                  key={people._id}
                  onClick={() => swapItem(people, index)}
                  className={`cursor-pointer overflow-hidden rounded-full  ${
                    (index + 1) % 2 === 0 ? "border border-main" : ""
                  }`}
                >
                  <img
                    src={people.avatar.asset.url}
                    alt=""
                    className={`${
                      (index + 1) % 2 === 0
                        ? "w-[100px] h-[100px] "
                        : "w-[50px] h-[50px]"
                    } rounded-full cursor-pointer scale-100 hover:scale-[1.15] transition-[transform] duration-500  ease-out `}
                  />
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <p className="leading-6 text-[#555] text-sm px-5">{currentPerson?.content}</p>
            <Link to="/" className="mt-4 mb-[7px] block text-[#333] text-lg hover:text-main transition-main">{currentPerson?.name}</Link>
            <span className="text-main font-medium">{currentPerson?.position}</span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default index;
