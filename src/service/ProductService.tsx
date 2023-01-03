import { PROXY } from "../App";
import { PRODUCT_TYPE } from "../helpers/Enums";
import Models from "../helpers/Models";
import { isAuthenticated } from "./AuthService";
import { getLocalClothing, getLocalShoes, setLocalClothing, setLocalShoes } from "./StorageService";

type Clothing = Models["Clothing"];
type Shoes = Models["Shoes"];

const deleteProductByIdAndType = async (
  id: number,
  type: PRODUCT_TYPE,
  productContext: (Clothing | Shoes)[],
  setProductContext: React.Dispatch<React.SetStateAction<(Clothing | Shoes)[]>>
) => {
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
    setProductContext(productContext.filter((product) => product.id !== id));
  } else alert("Error deleting product!");
};

const addToCart = (product: Clothing | Shoes, history: any) => {
  if (!isAuthenticated()) history.push("/login");
  else if (PRODUCT_TYPE.CLOTHING in product) {
    let array = getLocalClothing();
    getLocalClothing().length ? setLocalClothing(array.concat(product.id)) : setLocalClothing([product.id]);
  } else {
    let array = getLocalShoes();
    getLocalShoes().length ? setLocalShoes(array.concat(product.id)) : setLocalShoes([product.id]);
  }
};

const getTypeFromProduct = (product: Clothing | Shoes): PRODUCT_TYPE => {
  return PRODUCT_TYPE.CLOTHING in product ? PRODUCT_TYPE.CLOTHING : PRODUCT_TYPE.SHOES;
};

export { deleteProductByIdAndType, addToCart, getTypeFromProduct };
