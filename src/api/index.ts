import axios from "axios";
import queries from "../util/queries";

const API = axios.create({
  baseURL: "https://w6nap2fy.api.sanity.io/v1/graphql/production/default",
  headers: {
    Authorization: `Bearer sk3gBoEaFOwdeZ6qC9XVrh6401WT9fu6vDfiKIBekQLHKzcwSpXn9ab1kI4G42DodqW2CKFahjTV3aaVAZipHt9ca8qzMLaeBWFMtsRroZRW6t9c6VUCqirhYXWmrp0WzYtgSyGFooRU7n7XY6IRnobB2i4cyoYa2Fl8y5HgTDINiO65W8jq`,
  },
});

export const getHeaders = () => API.post("", { query: queries.GET_HEADER });
export const getBannerHeros = () =>
  API.post("", { query: queries.GET_HERO_BANNER });
export const getFeature = () => API.post("", { query: queries.GET_FEATURE });
export const getBannerOffer = () =>
  API.post("", { query: queries.GET_OFFER_BANNER });
export const getCategory = () => API.post("", { query: queries.GET_CATEGORY });
export const getProductSallerByCate = (id: string) =>
  API.post("", {
    query: `  query getProductOnSaleByCate{
            allProduct(sort: {salesCount: ASC}, where: {salesCount: {gt: 0}${
              id ? `, _: {references: "${id}"} ` : ""
            }}, limit: 10) {
              _id
              name
              price
              salePrice
              isOnSale
              description
              image{
                asset {
                  url
                }
              }
              imagesGallery {
                asset{
                  _id
                  url
                  originalFilename
                }
              }
           }
         }`,
  });

export const getDealProduct = () => API.post("", { query: queries.GET_DEAL_PRODUCT})

export const getHomePageData = () =>
  API.post("", { query: queries.GET_HOME_PAGE_DATA });


export const getBlogs = (limit: number) => API.post("", { query: ` query getBlogs {
  allBlogPost(limit: ${limit || 10}) {
    _id
    quote
    body
    publishedAt
    title
    category {
      name
    }
    thumbnail {
      asset {
        url
      }
    }
    author {
      _id
      name
    }
  }
}`})

export const getPeopleSay = () => API.post("", { query: queries.GET_PEOPLE_SAY})

export const getBrand = () => API.post("", { query: queries.GET_BRAND})

export const getProductOffset = (offset: number, limit: number = 9) => API.post("", { query: queries.GET_PRODUCT_OFFSET})

export const getProductById = (id: string) => API.post("", { query: queries.GET_PRODUCT_BY_ID(id)})

export const getProducts = () => API.post("", { query: queries.GET_PRODUCTS})
export const getTags = () => API.post("", { query: queries.GET_TAGS})
  
export default API;
