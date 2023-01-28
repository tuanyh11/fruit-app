import React from "react";
import { RiArrowRightLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Container } from "../../../components";
import { Blog, HomeSectionData } from "../../../interfaces";

interface Props {
  content: HomeSectionData | undefined;
  data: Blog[];
}

const index = ({ content, data }: Props) => {
  return (
    <div className="px-[15px] ">
      <Container>
        <div className="text-center ">
          <h2 className=" mt-5 mb-10 leading-[1.1] text-[30px] font-bold ">
            {content?.title}
          </h2>
        </div>
        <div className="pt-[30px]">
          <div className="grid grid-cols-12 gap-[30px]">
            {data.map((blog, i) => (
              <div key={blog._id} className="col-span-12 md:col-span-6">
                <div className="">
                  <Link
                    to="/"
                    className="mb-1 transition-main hover:bg-orange  h-[30px] leading-[30px] px-[30px] inline-block text-white rounded-[30px] bg-main "
                  >
                    {blog.category?.[0].name}
                  </Link>
                  <div className="mt-[15px] mb-[10px] text-[18px]">
                    {blog.title}
                  </div>
                  <h1 className="text-sm text-silver mb-[15px]">
                    by{" "}
                    <span className="text-sm  font-bold uppercase">
                      {blog.author.name}
                    </span>{" "}
                    {new Date(blog.publishedAt).toLocaleDateString("en", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </h1>
                  <p
                    className="leading-6 text-[#555]"
                    dangerouslySetInnerHTML={{ __html: blog.quote }}
                  />
                  <div className="mt-[30px] group overflow-hidden">
                    <Link
                      to={"/"}
                      className="after:inset-0 relative after:absolute after:transition after:duration-500 after:ease-out after:z-0 after:bg-black/30 after:opacity-0 group-hover:after:opacity-100"
                    >
                      <img
                        src={blog.thumbnail?.[0].asset.url}
                        alt=""
                        className="overflow-clip  w-[570px] h-[273px] min-h-full group-hover:scale-[1.15] transition-main  "
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-3">
            <Link
              to="#"
              className="inline-flex gap-2 h-[40px] rounded-[20px] leading-[37px] transition-main hover:bg-main hover:text-white px-[30px] border-2 uppercase mt-[20px] text-[14px] border-main  text-main items-center"
            >
              View All <RiArrowRightLine />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default index;
