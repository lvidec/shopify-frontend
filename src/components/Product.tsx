import { Link, useHistory } from "react-router-dom";
import { PRODUCT_TYPE } from "../helpers/Enums";
import Models from "../helpers/Models";
import { isAdmin, isAuthenticated } from "../service/AuthService";
import {
  getLocalClothing,
  setLocalClothing,
  getLocalShoes,
  setLocalShoes,
} from "../service/StorageService";

type Clothing = Models["Clothing"];
type Shoes = Models["Shoes"];

interface ProductProps {
  product: Clothing | Shoes;
  onDelete?: (id: number, type: PRODUCT_TYPE) => void;
  hasAddToCart: boolean;
}

const Product = ({ product, onDelete, hasAddToCart }: ProductProps) => {
  const history = useHistory();

  const addToCart = (id: number) => {
    if (!isAuthenticated()) history.push("/login");
    else if ("clothingType" in product) {
      let array = getLocalClothing();
      getLocalClothing().length ? setLocalClothing(array.concat(id)) : setLocalClothing([id]);
    } else {
      let array = getLocalShoes();
      getLocalShoes().length ? setLocalShoes(array.concat(id)) : setLocalShoes([id]);
    }
  };

  const getType = (product: Clothing | Shoes): PRODUCT_TYPE => {
    return "clothingType" in product ? PRODUCT_TYPE.CLOTHING : PRODUCT_TYPE.SHOES;
  };

  return (
    <div className="product-card">
      <img src={product.img} alt="Denim Jeans" />
      <h5>{product.name}</h5>
      <h6>${product.price}</h6>
      <p>{product.details}</p>
      <br />
      {hasAddToCart && (
        <a className="button" href="/#" onClick={() => addToCart(product.id)}>
          <i className="fa fa-shopping-cart"></i> &nbsp; Add to Cart
        </a>
      )}
      {isAdmin() && (
        <Link
          className="button"
          to="/"
          onClick={() => onDelete && onDelete(product.id, getType(product))}
        >
          <i className="fa fa-trash-o"></i> &nbsp; Delete
        </Link>
      )}
    </div>
  );
};

export default Product;
