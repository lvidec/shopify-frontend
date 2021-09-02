import { useState, useEffect, useContext } from "react";
import { ajax } from "rxjs/ajax";
import Models from "./Models";
import { apiRoot } from "../App";
import Shoe from "./Shoe";
import { Sex } from "./Enums";
import { CartContext } from "../service/CartContext";


const Shoes: React.FC = () => {
    
    type ShoesType = Models['Shoes'];

    const [shoes, setShoes] = useState<ShoesType[]>([]);

    const {clothingContext, setClothingContext, shoesContext, setShoesContext} = useContext(CartContext);

    useEffect(() => {
        const subscription = ajax.getJSON(apiRoot + '/shoes').subscribe((res: any) =>{
            setShoesContext(res);
        })
    
        return () => subscription.unsubscribe();

    }, [setShoesContext])


    // function isClothing(product: any): product is Clothing {
    //     return true;
    // }
    // function isShoes(product: any): product is Shoes {
    //     return true;
    // }
    // function isProduct(product: any): product is Product {
    //     return true;
    // }
    

    const getShoes = () => {
       return shoesContext;
    }


    const addShoes = (clothes: ShoesType) => {
        
        ajax.post(apiRoot + '/shoes/save', clothes).subscribe((res: any) =>{
            setShoesContext([...shoesContext, res]);
            console.log(shoesContext);
        })
       
    }
    
    const deleteShoes = (id: number) => {
        
        ajax.delete(`${apiRoot}/shoes/${id}`).subscribe((res: any) =>{
            setShoesContext(shoesContext.filter(x => x.id != id));
            console.log(shoesContext);
        })
    }
    
    let cloth: ShoesType = {    
        id: 2,
        name: "Shoes 2",
        details: 'isus',
        price: 420.0,
        img: "img...Plein",
        brandName: 'isus1',
        sex: Sex.FEMALE, 
        shoesType: {
            id: 2,
            type: 'Flip-Flops'
        }
    }
    
    return ( 
        <>
            {/* <button onClick={() => addShoes(cloth)}>clickni me mofo</button> */}
            {shoesContext.map((shoe: ShoesType, index: number) =>(
                <Shoe key={index} shoe={shoe} onDelete={deleteShoes}/>
            ))}
        </>
    )



}


export default Shoes;