import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { POSTS_PER_PAGE, PROXY } from "../App";
import { PRODUCT_TYPE } from "../helpers/Enums";
import Models from "../helpers/Models";
import { ProductContextTypes, ProductCartContext } from "../context/ProductCartContext";
import Pagination from "./Pagination";
import Product from "./Product";

type Clothing = Models["Clothing"];
type Shoes = Models["Shoes"];

const PageProducts = ({ match }: any) => {
  const { productContext, setProductContext } = useContext<ProductContextTypes>(ProductCartContext);

  const getNumberRegexp = /(?!x)[0-9]+/;
  const numberArray = getNumberRegexp.exec(match.path);

  let pageNumber: number = 0;

  if (numberArray) pageNumber = parseInt(numberArray[0]);

  let paginatedProducts: (Clothing | Shoes)[] = [];

  if (pageNumber !== 0) {
    paginatedProducts = productContext.slice(
      (pageNumber - 1) * POSTS_PER_PAGE,
      POSTS_PER_PAGE * pageNumber
    );
  }

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
          .filter((product) => product.id !== id)
      );
    } else alert("Error deleting product!");
  };

  if (productContext.length < 1) return <Redirect to={"/"} />;
  else
    return (
      <>
        <div className="margin-top-center">
          <Pagination />
        </div>
        <section className="products">
          {paginatedProducts.map((product: Clothing | Shoes) => (
            <Product
              key={product.id}
              product={product}
              hasAddToCart={true}
              onDelete={deleteProductByIdAndType}
            />
          ))}
        </section>
      </>
    );
};

export default PageProducts;
