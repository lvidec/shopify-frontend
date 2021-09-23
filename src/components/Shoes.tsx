import { useState, useEffect, useContext, useLayoutEffect } from "react";
import { ajax } from "rxjs/ajax";
import Models from "../helpers/Models";
import { API_ROOT } from "../App";
import Shoe from "./Shoe";
import { Sex } from "../helpers/Enums";
import { CartContext } from "../helpers/CartContext";
import { BehaviorSubject } from "rxjs";
import useFetch from "../helpers/useFetch";
import { useLayoutSubscription } from "observable-hooks";


const Shoes = ({search}: {search: string}) => {
    
    type ShoesType = Models['Shoes'];

    // const {shoesContext, setShoesContext} = useContext(CartContext);
    const { shoes$ } = useContext(CartContext);

    const [shoes, setShoes] = useState<ShoesType[]>([]);

    const [mockShoes, setMockShoes] = useState<ShoesType[]>([])

    const {response, error}: {response: ShoesType[]; error: string } = useFetch({
        method: 'get',
        url: API_ROOT + '/shoes'
    });
    
    
    useLayoutEffect(() => {

        if(response !== null){
            shoes$.next(response);
            setShoes(response);
            setMockShoes(response);
        }
        
    }, [response, shoes$])


    // function isClothing(product: any): product is Clothing {
    //     return true;
    // }
    // function isShoes(product: any): product is Shoes {
    //     return true;
    // }
    // function isProduct(product: any): product is Product {
    //     return true;
    // }
    
    
    const deleteShoeById = async (id: number) => {
        const res = await fetch(`${API_ROOT}/shoes/${id}`, {
            method: 'DELETE',
        });

        if(res.ok){ 
            setShoes(shoes.filter(shoe => shoe.id !== id))
            shoes$.next(shoes.filter(shoe => shoe.id !== id));
            alert('Rxjs magic!');
        }
        else{
            alert('Error deleting this shoe!')
        }
    }

    
    return ( 
        <>
            {search ? (
                mockShoes.filter(shoe => shoe.name.toLowerCase().includes(search)).map((shoe: ShoesType, index: number) => (
                    <Shoe key={index} shoe={shoe} onDelete={deleteShoeById} hasAddToCart={true}/>
                    ))
                ) : (
                    shoes.map((shoe: ShoesType, index: number) =>(
                        <Shoe key={index} shoe={shoe} onDelete={deleteShoeById} hasAddToCart={true}/>
                    ))
                )
            }
        </>
    )



}


export default Shoes;