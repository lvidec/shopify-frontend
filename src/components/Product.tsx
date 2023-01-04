import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "../App";
import { ProductContextDefault, ProductContextTypes } from "../context/ProductContext";
import { PRODUCT_TYPE } from "../helpers/Enums";
import Models from "../helpers/Models";
import { isAdmin } from "../service/AuthService";
import { addToCart, getTypeFromProduct } from "../service/ProductService";

type Clothing = Models["Clothing"];
type Shoes = Models["Shoes"];

interface ProductProps {
  product: Clothing | Shoes;
  onDelete?: (
    id: number,
    type: PRODUCT_TYPE,
    productContext: (Clothing | Shoes)[],
    setProductContext: React.Dispatch<React.SetStateAction<(Clothing | Shoes)[]>>
  ) => void;
  hasAddToCart: boolean;
}

const Product = ({ product, onDelete, hasAddToCart }: ProductProps) => {
  const history = useHistory();
  const { productContext, setProductContext } = useContext<ProductContextTypes>(ProductContextDefault);

  return (
    <div className="product-card">
      <Link to={`/product/${getTypeFromProduct(product)}/${product.id}`}>
        <div className="product-info">
          <img src={product.img} alt="Denim Jeans" />
          <h5>{product.name}</h5>
          <h6>${product.price}</h6>
          <p>{product.details}</p>
        </div>
      </Link>
      {hasAddToCart && (
        <a className="button" href="/#" onClick={() => addToCart(product, history)}>
          <i className="fa fa-shopping-cart"></i> &nbsp; Add to Cart
        </a>
      )}
      {isAdmin() && (
        <Link
          className="button"
          to={ROUTES.HOME}
          onClick={() =>
            onDelete &&
            onDelete(product.id, getTypeFromProduct(product), productContext, setProductContext)
          }
        >
          <i className="fa fa-trash-o"></i> &nbsp; Delete
        </Link>
      )}
    </div>
  );
};

export default Product;
