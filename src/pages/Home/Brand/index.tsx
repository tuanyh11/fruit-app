import React from "react";
import { Link } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import { Container } from "../../../components";
import { ifBrand } from "../../../interfaces";

interface Props {
  data: ifBrand[];
}
const index: React.FC<Props> = ({ data }) => {

  const setting: Settings  = {
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  }

  return (
    <div>
      <Container>
        <Slider {...setting}>
          {data.map(item => 
            <Link to="/" key={item._id} className="py-10 px-[15px] block pulse-grow">
                <img src={item.image.asset?.url} alt="" className="mx-auto w-[120px] h-[80px]" />
            </Link>  
          )}
        </Slider>
      </Container>
    </div>
  );
};

export default index;
