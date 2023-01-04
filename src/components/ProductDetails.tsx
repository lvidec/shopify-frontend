import { useContext, useEffect, useState } from "react";
import { Link, RouteChildrenProps, useHistory } from "react-router-dom";
import { PROXY, ROUTES } from "../App";
import { ProductContextDefault, ProductContextTypes } from "../context/ProductContext";
import { PRODUCT_TYPE } from "../helpers/Enums";
import Models from "../helpers/Models";
import { isAdmin } from "../service/AuthService";
import { addToCart, deleteProductByIdAndType } from "../service/ProductService";

interface MatchParams {
  type: string;
  id: string;
}

interface MatchProps extends RouteChildrenProps<MatchParams> {}

type Clothing = Models["Clothing"];
type Shoes = Models["Shoes"];

const ProductDetails = ({ match }: MatchProps) => {
  const productId: string | undefined = match?.params.id;
  const productType: string | undefined = match?.params.type;

  const { productContext, setProductContext } = useContext<ProductContextTypes>(ProductContextDefault);
  const [product, setProduct] = useState<Clothing | Shoes>({} as Clothing | Shoes);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (productType === PRODUCT_TYPE.CLOTHING) {
        let res = await fetch(PROXY + "/clothing/" + productId);
        let data: Clothing = await res.json();

        if (res.ok && data !== null && data !== undefined) {
          setProduct(data);
        }
      } else if (productType === PRODUCT_TYPE.SHOES) {
        let res = await fetch(PROXY + "/shoes/" + productId);
        let data: Shoes = await res.json();

        if (res.ok && data !== null && data !== undefined) {
          setProduct(data);
        }
      }
    })();
  }, []);

  const productExists = (): boolean => {
    return productId !== undefined && productType !== undefined;
  };

  const getProductType = (productType: string | undefined): PRODUCT_TYPE => {
    return productType === PRODUCT_TYPE.CLOTHING ? PRODUCT_TYPE.CLOTHING : PRODUCT_TYPE.SHOES;
  };

  return (
    <section className="product-details-container">
      <div className="product-container">
        <img src={product?.img} alt={product?.name} />
        <div className="details-container">
          <h2>{product?.brandName}</h2>
          <h5>{product?.name}</h5>
          <p>${product?.price}</p>
          <a className="button" href="/#" onClick={() => addToCart(product, history)}>
            <i className="fa fa-shopping-cart"></i> &nbsp; Add to Cart
          </a>
          {isAdmin() && productExists() && (
            <Link
              className="button"
              to={ROUTES.HOME}
              onClick={() =>
                deleteProductByIdAndType(
                  product.id,
                  getProductType(productType),
                  productContext,
                  setProductContext
                )
              }
            >
              <i className="fa fa-trash-o"></i> &nbsp; Delete
            </Link>
          )}
        </div>
      </div>
      <p>{product.details}</p>
    </section>
  );
};

export default ProductDetails;
