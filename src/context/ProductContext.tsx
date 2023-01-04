import React, { createContext } from "react";
import Models from "../helpers/Models";

type Clothing = Models["Clothing"];
type Shoes = Models["Shoes"];

export interface ProductContextTypes {
  productContext: (Clothing | Shoes)[];
  setProductContext: React.Dispatch<React.SetStateAction<(Clothing | Shoes)[]>>;
}

export const ProductContextDefault = createContext<ProductContextTypes>({} as ProductContextTypes);
