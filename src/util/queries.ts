const queries = {
  GET_HEADER: `query getNav {
    allNavigation(where: {isHasSubnav: {eq: true}}, sort: {_createdAt: ASC}) {
      _id
    	name
      types
      isHasSubnav
      url
      products {
          _id
      name
      price
      salePrice
      isOnSale
      isOnDeal
      endDate
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
      advertising{
        _id
        title
        description
        image{
          asset {
            url
          }
        }
      }
      subNav {
        _id
        url
        name
        subNav{
          _id
          name
        url

        }
      }
    }
  }`,
  GET_HERO_BANNER: `{
    allBanner(where: {type: {eq: "hero"}}){
      _id,
      title,
      value,
      image{
         asset{
        	url
        }
      }
    }
  }`,
  GET_FEATURE: `query getFeature {
    allFeature {
      _id
     icon
      name
      description
    }
  }`,
  GET_OFFER_BANNER: `query getBannerOffer {
		allBanner(where:{type: {eq: "offer"}}, sort: {_createdAt: ASC}) {
      _id
      title
      _createdAt
      image {
        asset{
          _id
          url
        }
      }
    }
  
  }`,
  GET_CATEGORY: `  query getCategory {
    allCategory(sort: {_createdAt: ASC}) {
      _id,
      name
      products {
        _id
      }
    }
  }`,

  GET_HOME_PAGE_DATA: `  query getHomePage {
    allPageData(where: {page: {eq: "home"}}) {
      sections {
        _id
        title
        name
        backgrounds{
          asset {
            url
          }
        }
      }
    }
  }`,

  GET_DEAL_PRODUCT: `  query getDealProduct {
    allProduct(where: {isOnDeal:{eq: true}, endDate: {gt: "${new Date().toLocaleDateString(
      "en-CA"
    )}"}}) {
       _id
      name
      price
      salePrice
      isOnSale
      endDate
      description
      isOnDeal
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
  GET_PEOPLE_SAY: `  query getPeopleSay {
    allPeopleSay {
      _id
      name
      avatar {
        asset {
          url
        }
      }
      content
      position
    }
  }`,
  GET_BRAND: `
  query getBrands {
    allBrand {
      _id
      description
      image{
        asset{
          url
        }
      }
    }
  }
  `,
  GET_PRODUCT_OFFSET: `{
    allProduct(offset: 1, limit: 9) {
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
  GET_PRODUCTS: `
  query getProducts{
    allProduct {
        _id
               name
               price
               salePrice
               isOnSale
               description
               reviews {
                 _id
                 rating
                 _createdAt
                 text
                 user{
                   name
                   avatar {
                     asset {
                       url
                     }
                   }
                 }
               }
     rating
     tags{
      _id
      name
    }
     share{
       icon
       _id
       url
     }
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
 }
  `,
  GET_PRODUCT_BY_ID: (id: string) => `query getProduct{
    Product(id: "${id}") {
        _id
               name
               price
               salePrice
               isOnSale
               description
               category {
                _id
                name
              }
              rating
              reviews {
                _id
                rating
                _createdAt
                text
                user{
                  name
                  avatar {
                    asset {
                      url
                    }
                  }
                }
              }
              tags{
                _id
                name
              }
              share{
                icon
                _id
                url
              }
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

  GET_TAGS: `
 query getTags {
  allTag {
    _id
    name
  }
}
 `,
} as const;

export default queries;
