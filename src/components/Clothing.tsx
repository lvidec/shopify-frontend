import { useState, useEffect, useContext } from "react";
import { ajax } from "rxjs/ajax";
import Models from "../helpers/Models";
import { apiRoot } from "../App";
import Clothes from "./Clothes";
import { Sex } from "../helpers/Enums";
import { CartContext } from "../helpers/CartContext";

const Clothing: React.FC = () => {
    
    type Clothing = Models['Clothing'];

    const [clothing, setClothing] = useState<Clothing[]>([]);

    const {clothingContext, setClothingContext, shoesContext, setShoesContext} = useContext(CartContext);


    useEffect(() => {
        const subscription = ajax.getJSON(apiRoot + '/clothing').subscribe((res: any) =>{
            setClothingContext(res);
        })
    
        return () => subscription.unsubscribe();

    }, [setClothingContext])
    

    const getClothing = () => {
       return clothingContext;
    }


    const addClothing = (clothes: Clothing) => {
        
        ajax.post(apiRoot + '/clothing/save', clothes).subscribe((res: any) =>{
            setClothing([...clothingContext, res]);
            console.log(clothingContext);
        })
       
    }
    
    const deleteClothing = (id: number) => {
        
        ajax.delete(`${apiRoot}/clothing/${id}`).subscribe((res: any) =>{
            setClothing(clothingContext.filter(x => x.id != id));
            console.log(clothingContext);
        })
    }
    
    let cloth: Clothing = {    
        id: 2,
        name: "Clothing 2",
        details: 'isus',
        price: 420.0,
        img: "img...Plein",
        brandName: 'isus1',
        sex: Sex.FEMALE, 
        clothingType: {
            id: 1,
            type: 'Hoodie'
        }
    }

    return ( 
        <>
            {/* <button onClick={() => addClothing(cloth)}>clickni me mofo</button> */}
            {clothingContext.map((clothes: Clothing, index: number) =>(
                <Clothes key={index} clothes={clothes} onDelete={deleteClothing} hasAddToCart={true}/>
            ))}
        </>
    )



}


export default Clothing;