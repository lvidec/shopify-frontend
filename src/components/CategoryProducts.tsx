import { useContext } from "react";
import { Redirect, RouteChildrenProps } from "react-router-dom";
import { ROUTES } from "../App";
import { ProductContextDefault, ProductContextTypes } from "../context/ProductContext";
import Models from "../helpers/Models";
import { deleteProductByIdAndType } from "../service/ProductService";
import Product from "./Product";

interface MatchParams {
  id: string;
}

interface MatchProps extends RouteChildrenProps<MatchParams> {}

type Clothing = Models["Clothing"];
type Shoes = Models["Shoes"];

const CategoryProducts = ({ match }: MatchProps) => {

  const { productContext, setProductContext } = useContext<ProductContextTypes>(ProductContextDefault);

  let filteredProducts: (Clothing | Shoes)[] = productContext.filter(
    (product) => product.brandName === match?.params.id
  );

  if (productContext.length < 1) return <Redirect to={ROUTES.HOME} />;
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

export default CategoryProducts;
