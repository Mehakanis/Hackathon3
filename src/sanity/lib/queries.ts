import { defineQuery } from "next-sanity";

export const newceramics = defineQuery(`
    *[_type == "product" && "new ceramics" in tags] {
    _id,
    name,
    "imageUrl" : image.asset->url,
    price,
    slug
  }
    `);

export const popularproducts = defineQuery(`
        *[_type == "product" && "popular products" in tags] {
        _id,
        name,
        "imageUrl" : image.asset->url,
        price,
        slug
      }
        `);
export const allproducts = defineQuery(`
            *[_type == "product"] {
            _id,
            name,
            "imageUrl" : image.asset->url,
            price,
              slug

          }
            `);

export const cutlery = defineQuery(`
              *[_type == "product" && category->name == "Cutlery"] {
  _id,
  name,
  "category": category->name,
  slug {
    current
  },
  "imageUrl": image.asset->url,
  price,

}

              `);
export const tableware = defineQuery(`
                *[_type == "product" && category->name == "Tableware"] {
    _id,
    name,
    "category": category->name,
    slug {
      current
    },
    "imageUrl": image.asset->url,
    price,
  
  }
  
                `);
export const crockory = defineQuery(`
                  *[_type == "product" && category->name == "Crockory"] {
      _id,
      name,
      "category": category->name,
      slug {
        current
      },
      "imageUrl": image.asset->url,
      price,
    
    }
    
                  `);
                  export const chairs = defineQuery(`
                    *[_type == "product" && category->name == "Chairs"] {
        _id,
        name,
        "category": category->name,
        slug {
          current
        },
        "imageUrl": image.asset->url,
        price,
      
      }
      
                    `);
                    export const categoryQuery = `
  *[_type == "product" && category->name == $category] {
    _id,
    name,
    "category": category->name,
    slug {
      current
    },
    "imageUrl": image.asset->url,
    price
  }
`;


  