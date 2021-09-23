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
        
    const {clothingContext, setClothingContext} = useContext(CartContext);
    const [mockClothing, setMockClothing] = useState<Clothing[]>(clothingContext);
    
    
    const {response, error}: {response: Clothing[]; error: string } = useFetch({
        method: 'get',
        url: API_ROOT + '/clothing'
    });
    
    
    useEffect(() => {

        if(response !== null){
            setClothingContext(response);
            setMockClothing(response);
        }
        
    }, [response, clothingContext, setClothingContext],)
    
    
    const deleteClothesById = async (id: number) => {
        
        const res = await fetch(`${API_ROOT}/clothing/${id}`, {
            method: 'DELETE'    
        });

        if(res.ok){
            setClothingContext(clothingContext.filter(clothes => clothes.id !== id));
            alert('Deletion will be completed after refresh...done without Rxjs, now try deleting shoes for full responsiveness with Rxjs');
        }else{
            alert('Error deleting clothes!')
        }
    }

    return ( 
        <>
            {search ? (
                mockClothing.filter(clothes => clothes.name.toLowerCase().includes(search)).map((clothes: Clothing, index: number) =>(
                    <Clothes key={index} clothes={clothes} onDelete={deleteClothesById} hasAddToCart={true}/>
                    ))
                ) : (
                    clothingContext.map((clothes: Clothing, index: number) =>(
                        <Clothes key={index} clothes={clothes} onDelete={deleteClothesById} hasAddToCart={true}/>
                    ))
                )
            }
        </>
    )



}


export default Clothing;