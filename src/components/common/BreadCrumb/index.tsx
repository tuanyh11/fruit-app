import React from "react";

const index = () => {
  return (
    <div className="overflow-hidden group">
      <div
        className=" relative after:z-50 after:scale-x-0 group-hover:after:scale-100 after:transition-all after:duration-500 after:ease-out after:absolute after:top-5 after:bottom-5 after:border-t after:border-b after:border-[#fff] after:right-[10px] after:left-[10px] 
                before:transition-all before:z-50 before:scale-y-0 group-hover:before:scale-100  before:duration-500 before:ease-out before:absolute before:top-[10px] before:bottom-[10px] before:border-r before:border-l before:border-[#fff] before:right-5 before:left-5
                "
      >
        <img
          src="https://fruitshop.7uptheme.net//wp-content/uploads/2017/04/about.jpg"
          alt="banner"
          className="group-hover:scale-[1.15] h-auto w-full transition-main"
        />
      </div>
    </div>
  );
};

export default index;
