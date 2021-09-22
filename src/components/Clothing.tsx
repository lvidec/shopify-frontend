import { useState, useEffect, useContext, useLayoutEffect } from "react";
import { ajax } from "rxjs/ajax";
import Models from "../helpers/Models";
import { API_ROOT } from "../App";
import Clothes from "./Clothes";
import { Sex } from "../helpers/Enums";
import { CartContext } from "../helpers/CartContext";
import useAxios from "../helpers/useAxios";
import useFetch from "../helpers/useFetch";

const Clothing = ({search}: {search: string} ) => {
    
    type Clothing = Models['Clothing'];
    
    const [clothing, setClothing] = useState<Clothing[]>([]);
    
    const {clothingContext, setClothingContext} = useContext(CartContext);
    const [mockClothing, setMockClothing] = useState<Clothing[]>(clothingContext);
    
    
    const {response, error}: {response: Clothing[]; error: string } = useFetch({
        method: 'get',
        url: API_ROOT + '/clothing'
    });
    
    
    useLayoutEffect(() => {

        if(response !== null){
            setClothingContext(response);
            setMockClothing(response);
        }
        
    }, [response, clothingContext],)
        


    const getClothing = () => {
       return clothingContext;
    }

    const addClothing = (clothes: Clothing) => {
        
        ajax.post(API_ROOT + '/clothing/save', clothes).subscribe((res: any) =>{
            setClothingContext([...clothingContext, res]);
            console.log(clothingContext);
        })
       
    }
    
    const deleteClothing = (id: number) => {
        
        ajax.delete(`${API_ROOT}/clothing/${id}`).subscribe((res: any) =>{
            setClothingContext(clothingContext.filter(x => x.id !== id));
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
            {search ? (
                mockClothing.filter(clothes => clothes.name.toLowerCase().includes(search)).map((clothes: Clothing, index: number) =>(
                    <Clothes key={index} clothes={clothes} onDelete={deleteClothing} hasAddToCart={true}/>
                    ))
                ) : (
                    clothingContext.map((clothes: Clothing, index: number) =>(
                        <Clothes key={index} clothes={clothes} onDelete={deleteClothing} hasAddToCart={true}/>
                    ))
                )
            }
        </>
    )



}


export default Clothing;