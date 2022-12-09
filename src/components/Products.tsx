import React, { useContext } from "react";
import { PRODUCT_TYPE } from "../helpers/Enums";
import Models from "../helpers/Models";
import { ProductContextTypes, ProductCartContext } from "../context/ProductCartContext";
import Product from "./Product";
import { PROXY } from "../App";

const Products = ({ search }: { search: string }) => {
  type Clothing = Models["Clothing"];
  type Shoes = Models["Shoes"];

  const { productContext, setProductContext } =
    useContext<ProductContextTypes>(ProductCartContext);

    
  const deleteProductByIdAndType = async (id: number, type: PRODUCT_TYPE) => {

    let res;
    if (type === PRODUCT_TYPE.CLOTHING) {
      res = await fetch(PROXY + `/clothing/${id}`, {
        method: "DELETE",
      });
    } else {
      res = await fetch(PROXY + `/shoes/${id}`, {
        method: "DELETE",
      });
    }

    if (res.ok) {
      setProductContext(
        productContext
          // .filter((product) => correctType(product, type))
          .filter((product) => product.id !== id)
      );
    } else alert("Error deleting clothes!");

  };

  return (
    <div className="products" >
      {search
        ? productContext &&
          productContext
            .filter((clothes) => clothes.name.toLowerCase().includes(search))
            .map((product: Clothing | Shoes) => (
              <Product
                key={product.id}
                product={product}
                onDelete={deleteProductByIdAndType}
                hasAddToCart={true}
              />
            ))
        : productContext &&
          productContext.map((product: Clothing | Shoes) => (
            <Product
              key={product.id}
              product={product}
              onDelete={deleteProductByIdAndType}
              hasAddToCart={true}
            />
          ))}
    </div>
  );
};

export default Products;