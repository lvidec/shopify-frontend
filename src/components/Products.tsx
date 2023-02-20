import { useContext } from "react";
import { ProductContextDefault, ProductContextTypes } from "../context/ProductContext";
import Models from "../helpers/Models";
import { deleteProductByIdAndType } from "../service/ProductService";
import Product from "./Product";

const Products = ({ search }: { search: string }) => {
  type Clothing = Models["Clothing"];
  type Shoes = Models["Shoes"];

  const { productContext } = useContext<ProductContextTypes>(ProductContextDefault);

  return (
    <main className="products">
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
    </main>
  );
};

export default Products;
