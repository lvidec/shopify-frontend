import React, { createContext } from "react";
import { BehaviorSubject } from "rxjs";
import Models from "./Models";

type Clothing = Models['Clothing'];
type Shoes = Models['Shoes'];

interface contextTypes{
    clothingContext: Clothing[],
    setClothingContext: React.Dispatch<React.SetStateAction<Clothing[]>>
    // shoesContext: Shoes[],
    // setShoesContext: React.Dispatch<React.SetStateAction<Shoes[]>>
    shoes$: BehaviorSubject<Shoes[]>;
}

export const CartContext = createContext<contextTypes>({} as contextTypes);