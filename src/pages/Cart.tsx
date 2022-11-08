import { Redirect } from "react-router-dom";
import Product from "../components/Product";
import Models from "../helpers/Models";
import {
  destroyLocalClothesWithId,
  destroyLocalShoeWithId,
  getLocalClothing,
  getLocalShoes,
} from "../service/StorageService";

type Clothing = Models["Clothing"];
type Shoes = Models["Shoes"];

interface CartProps {
  products: (Clothing | Shoes)[];
}

const Cart = ({ products }: CartProps) => {
  function isClothing(product: Clothing | Shoes): product is Clothing {
    return "clothingType" in product;
  }

  function isShoes(product: Clothing | Shoes): product is Shoes {
    return "shoesType" in product;
  }

  let filteredClothing: Clothing[] | undefined;
  if (getLocalClothing().length) {
    filteredClothing = products.filter(isClothing);
    filteredClothing = filteredClothing?.filter((clothes) =>
      getLocalClothing().includes(clothes.id)
    );
  }

  let filteredShoes: Shoes[] | undefined;
  if (getLocalShoes().length) filteredShoes = products.filter(isShoes);
  filteredShoes = filteredShoes?.filter((shoe) => getLocalShoes().includes(shoe.id));

  let totalPriceClothing: number | undefined = filteredClothing?.reduce(
    (a, { price }) => a + price,
    0
  );
  let totalPriceShoes: number | undefined = filteredShoes?.reduce((a, { price }) => a + price, 0);

  if (totalPriceClothing === undefined) totalPriceClothing = 0;
  if (totalPriceShoes === undefined) totalPriceShoes = 0;

  const handleDelete = (product: Clothing | Shoes) => {
    if (isClothing(product)) {
      destroyLocalClothesWithId(product.id);
      if (totalPriceClothing) {
        totalPriceClothing -= product.price;
      }
    } else {
      destroyLocalShoeWithId(product.id);
      if (totalPriceShoes) {
        totalPriceShoes -= product.price;
      }
    }
  };

  if (products.length < 1) {
    return <Redirect to="/" />;
  } else if (!filteredClothing && !filteredShoes) {
    return <h2>Empty Cart</h2>;
  } else
    return (
      <div className="margin-top-center">
        <h2>
          Total price: <span>$ {totalPriceClothing + totalPriceShoes}</span>
        </h2>
        <section className="products button-red">
          {filteredClothing &&
            filteredClothing.map((clothes: Clothing) => (
              <Product
                key={clothes.id}
                product={clothes}
                onDelete={() => handleDelete(clothes)}
                hasAddToCart={false}
              />
            ))}
          {filteredShoes &&
            filteredShoes.map((shoe: Shoes) => (
              <Product
                key={shoe.id}
                product={shoe}
                onDelete={() => handleDelete(shoe)}
                hasAddToCart={false}
              />
            ))}
        </section>
      </div>
    );
};

export default Cart;
