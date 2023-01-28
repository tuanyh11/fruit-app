export interface BannerHero {
  _id: string;
  image: [
    {
      asset: {
        _id: string;
        url: string;
      };
    }
  ];
  title: string;
  value: number;
}

export interface Features {
  _id: string;
  icon: string;
  name: string;
  description: string;
}

export interface SliderProps extends React.PropsWithChildren {
  slidesToShow?: number;
  slidesToScroll?: number;
  fade?: boolean;
  speed?: number;
  autoSlide?: boolean;
  customArrow?: (next: () => void, pre: () => void) => any;
}

export interface Category {
  _id: string;
  name: string;
  products?: [
    {
      _id: string;
    }
  ];
}

interface ImagesGallery {
  asset: {
    url: string;
    _id: string;
    originalFilename: string;
  };
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: Category[];
  salePrice: number;
  rating: number;
  imagesGallery: ImagesGallery[];
  isOnSale: boolean;
  isOnDeal: boolean;
  endDate: string;
  tags: TagInter[];
  quantity?: number;
  subtotal?: number; 
  isRemove?: boolean;
  reviews: [
    {
      _id: string;
      rating: number;
      _createdAt: string;
      text: string;
      user: {
        name: string;
        avatar: {
          asset: {
            url: string;
          };
        };
      };
    }
  ];
  share: [
    {
      icon: string;
      _id: string;
      url: string;
    }
  ];
  image: {
    asset: {
      url: string;
      _id: string;
    };
  };
}

export interface HomeSectionData {
  _id?: string;
  name?: string;
  title?: string;
  backgrounds?:
    | [
        {
          asset: {
            url: string;
          };
        }
      ]
    | null;
}

export interface Blog {
  _id: string;
  title: string;
  description: string;
  quote: string;
  body: string;
  category: [
    {
      name: string;
    }
  ];
  publishedAt: string;
  thumbnail: [
    {
      asset: {
        url: string;
      };
    }
  ];
  author: {
    _id: string;
    name: string;
  };
}

export interface ifPeopleSay {
  _id: string;
  avatar: {
    asset: {
      url: string;
    };
  };
  name: string;
  content: string;
  position: string;
}

export interface ifBrand {
  _id: string;
  description: string;
  image: {
    asset: {
      url: string;
    };
  };
}

export interface TagInter {
  _id: string;
  name: string;
}


export interface CartSliceInter{
  data: Product[],
  total: number;
}