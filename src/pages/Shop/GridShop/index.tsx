import React, { useContext, useEffect, useState } from "react";
import { RiArrowDropDownLine, RiGridFill, RiListCheck } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { getProductOffset } from "../../../api";
import { CardGrid, CardList } from "../../../components";
import { layoutWithSideBarCtx } from "../../../components/Layout/LayoutWithSideBar";
import { Product } from "../../../interfaces";
import './style.css'

const sortOptions = [
  {
    name: "Default Sorting",
  },
  {
    name: "Sort By Popularity",
  },
  {
    name: "Sort By Averate Rating",
  },
  {
    name: "Sort By Latest",
  },
  {
    name: "Sort By Price: Low to high",
  },
  {
    name: "Sort By Price: High to low",
  },
];

const colSpanOptions = [
  'grid-cols-1',
  'grid-cols-2',
  'grid-cols-3',
  'grid-cols-4',
  'grid-cols-5',
  'grid-cols-6',
  'grid-cols-7',
  'grid-cols-8',
  'grid-cols-9',
  'grid-cols-10',
  'grid-cols-11',
  'grid-cols-12'
]

const index = () => {

  const [products, setProducts] = useState<Product[]>([])
  const loc = useLocation()

  const [typeCard, setTypeCard] = useState<String>('grid')

  const queryParams = useContext(layoutWithSideBarCtx)



  useEffect(() => {
    getProductOffset(0).then(res => setProducts(res.data.data.allProduct))
  }, []);

  useEffect(() => {
    const type = loc.pathname.split("/")[loc.pathname.split("/").length - 1].split("-")[0]
    setTypeCard(['list', 'grid'].includes(type) ? type  : 'grid')
  }, [loc.pathname, queryParams?.columns])



  return (
    <div className="">
      <div className="mb-[30px] grid col-span-2 md:flex  items-center md:justify-between">
        <div className="text-[#999] leading-6 grid-cols-1  ">Showing 1–9 of 13 results</div>
        <div className="flex w-full justify-between grid-cols-1 ">
          <div className="flex items-center md:mx-[13px]  ">
            <span className="mr-[10px] md:inline hidden">Sort:</span>
            <div className="relative ">
              <select
                name=""
                id=""
                className="h-[34px] md:pr-[50px] cursor-pointer  md:pl-5 rounded-md border-[#e5e5e5] text-[#555] outline-none  border-[1px]"
              >
                {sortOptions.map((option, i) => (
                  <option value={option.name} className=" capitalize " key={i}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex   ">
            <button onClick={() => setTypeCard("grid")} className={`h-9 w-[30px] rounded-[6px_0_0_6px]  flex items-center justify-center border-[#e5e5e5] border-[1px] ${typeCard === 'grid'? 'bg-main text-white': ''}`}>
              <RiGridFill />
            </button>
            <button onClick={() => setTypeCard("list")} className={`h-9 w-[30px] rounded-[0_6px_6px_0]  flex items-center justify-center border-[#e5e5e5] border-[1px] ${typeCard === 'list'? 'bg-main text-white': ''}`}>
              <RiListCheck />
            </button>
          </div>
        </div>
      </div>
      <div className={`grid ${typeCard === 'grid' ?'grid-cols-2' : '!grid-cols-1'} gap-[30px] grid-cols grid-cols-2  ` } style={{gridTemplateColumns: `repeat(${queryParams?.columns}, minmax(0, 1fr))`}}  >
        {products.map(product => typeCard === 'grid' ?
            <CardGrid key={product._id} cssImage={`${ Number(queryParams?.columns) > 2 ? null : 'lg:w-[400px] lg:h-[400px]'}`} border={true} {...product}/>
          : <CardList key={product._id} cssImage={`${ Number(queryParams?.columns) > 2 ? null : 'lg:w-[400px] lg:h-[400px]'}`} version={2} border={true} {...product}/>
        )}
      </div>
    </div>
  );
};

export default index;
