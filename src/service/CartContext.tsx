import React, { createContext } from "react";
import Models from "../components/Models";

type Clothing = Models['Clothing'];
type Shoes = Models['Shoes'];

interface contextTypes{
    clothingContext: Clothing[],
    setClothingContext: React.Dispatch<React.SetStateAction<Clothing[]>>
    shoesContext: Shoes[],
    setShoesContext: React.Dispatch<React.SetStateAction<Shoes[]>>
}

export const CartContext = createContext<contextTypes>({} as contextTypes);