import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { SliderProps } from "../../../interfaces";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const index: React.FC<React.PropsWithChildren<SliderProps>> = ({
  children,
  slidesToScroll = 1,
  slidesToShow = 1,
  fade = false,
  speed = 500,
  autoSlide = false,
  customArrow,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [isDragging, setIsDragging] = useState(false);

  const [isHover, setIsHover] = useState(false);

  const interval = useRef<number>();

  const sliderRef = useRef<HTMLDivElement>(null);

  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  

  const childrenLength: number = React.Children.map(children, (child) => child)
    ?.length as number;

  const handleNextClick = () => {
    setCurrentSlide((preSlide) => {
      const nextSlide = (preSlide + slidesToScroll) % childrenLength;
      return nextSlide + slidesToShow > childrenLength ? 0 : nextSlide;
    });
  };

  const handlePrevClick = () => {
    setCurrentSlide((preSlide) => {
      const nextSlide =
        (preSlide - slidesToScroll + childrenLength) % childrenLength;
      return childrenLength - nextSlide === 1
        ? childrenLength - slidesToShow
        : nextSlide;
    });
  };

  useEffect(() => {
    if (autoSlide && !isHover) {
      interval.current = setInterval(() => {
        handleNextClick();
      }, 6000);
    }
    return () => clearInterval(interval.current);
  }, [childrenLength, isHover]);

  const handleMouseDown = (event: MouseEvent) => {
    setIsDragging(true);
    setStartX(event.clientX);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(event.clientX - startX);
  };

  // console.log(currentSlide)

  const handleMouseUp = () => {
    setIsDragging(false);
    if (currentX > 50) {
      handlePrevClick();
    } else if (currentX < -50) {
      handleNextClick();
    }
    setCurrentX(0);
  };

  const handleMOuseLeave = () => {
    setIsHover(false)
    setIsDragging(false)
  }

  return (
    <div>
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={handleMOuseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        

        className="overflow-x-hidden whitespace-nowrap relative group py-10 "
        ref={sliderRef}
      >
        {React.Children.map(children, (child, index) => (
          <div
            className="slider-card "
            data-animate={currentSlide === index ? "active" : ""}
            style={{
              transition: `${fade ? "opacity" : "all"} ${speed}ms ease`,
              display: "inline-block",
              transform: `translateX(-${currentSlide * 100}%)`,
              width: `${100 / slidesToShow}%`,
              opacity: fade ? (currentSlide === index ? "1" : "0") : "1",
              cursor: isDragging ? "grabbing": ""
            }}
          >
            {child}
          </div>
        ))}
        {customArrow ? (
          customArrow(handleNextClick, handlePrevClick)
        ) : (
          <div className="">
            <button
              className="absolute top-1/2 text-4xl hover:bg-main transition-main flex justify-center items-center  -translate-y-1/2  bg-red-400 bottom-0 right-[-60px] group-hover:right-[15px] transition-main h-[56px] w-[56px] bg-black/50 rounded-full text-white"
              onClick={handleNextClick}
            >
              <IoIosArrowRoundForward />
            </button>
            <button
              className="absolute top-1/2 text-4xl hover:bg-main transition-main flex justify-center items-center -translate-y-1/2  bg-red-400 bottom-0  left-[-60px] group-hover:left-[15px] transition-main h-[56px]  w-[56px] bg-black/50 rounded-full text-white"
              onClick={handlePrevClick}
            >
              <IoIosArrowRoundBack />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default index;
