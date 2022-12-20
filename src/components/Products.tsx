import { useContext } from "react";
import { PROXY } from "../App";
import { ProductCartContext, ProductContextTypes } from "../context/ProductCartContext";
import { PRODUCT_TYPE } from "../helpers/Enums";
import Models from "../helpers/Models";
import Product from "./Product";

const Products = ({ search }: { search: string }) => {
  type Clothing = Models["Clothing"];
  type Shoes = Models["Shoes"];

  const { productContext, setProductContext } =
    useContext<ProductContextTypes>(ProductCartContext);

  // const correctType = (product: Clothing | Shoes, type: PRODUCT_TYPE): boolean => {
  //   return type in product;
  // };
    
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
    } else alert("Error deleting product!");

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