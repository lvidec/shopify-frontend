import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { ProductCartContext, ProductContextTypes } from "../context/ProductCartContext";
import { PRODUCT_TYPE } from "../helpers/Enums";
import Models from "../helpers/Models";
import Product from "./Product";

type Clothing = Models["Clothing"];
type Shoes = Models["Shoes"];

const ProductDetailsCategory = ({ match }: any) => {

  const { productContext, setProductContext } = useContext<ProductContextTypes>(ProductCartContext);

  let filteredProducts: (Clothing | Shoes)[] = productContext.filter(
    (product) => product.brandName === match.params.id
  );

  const correctType = (
    product: Clothing | Shoes,
    type: PRODUCT_TYPE
  ): boolean => {
    return type in product;
  };

  const deleteProductByIdAndType = async (id: number, type: PRODUCT_TYPE) => {
    let res;
    if (type === PRODUCT_TYPE.CLOTHING) {
      res = await fetch(`/clothing/${id}`, {
        method: "DELETE",
      });
    } else {
      res = await fetch(`/shoes/${id}`, {
        method: "DELETE",
      });
    }

    if (res.ok) {
      setProductContext(
        productContext
          .filter((product) => correctType(product, type))
          .filter((product) => product.id !== id)
      );
      alert(
        "Deletion of clothes will be completed after refresh...done without Rxjs, try deleting shoes for full responsiveness with Rxjs"
      );
    } else alert("Error deleting clothes!");

  };

  if (productContext.length < 1) return <Redirect to={"/"} />;
  else
    return (
      <div className="products margin-top-center">
          {filteredProducts.map((product: Clothing | Shoes) => (
            <Product
              key={product.id}
              product={product}
              hasAddToCart={true}
              onDelete={deleteProductByIdAndType}
              />
          ))}
      </div>
    );
};

export default ProductDetailsCategory;
