import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { CartContext } from '../helpers/CartContext';
import Clothes from './Clothes';
import Clothing from './Clothing';
import Models from '../helpers/Models';
import Shoe from './Shoe';
import Shoes from './Shoes';
import { API_ROOT } from '../App';


type Clothing = Models['Clothing'];
type Shoes = Models['Shoes'];

const ProductDetailsCategory = ( {match}: any ) => {

    const {clothingContext, setClothingContext, shoes$} = useContext(CartContext);

    const [shoesObservableContext, setShoesObservableContext] = useState<Shoes[]>([]);

    useEffect(() => {
        const subscription = shoes$.subscribe(setShoesObservableContext);
        return () => subscription.unsubscribe(); 
    }, [])

    let filteredClothing: Clothing[] = clothingContext.filter(clothes => clothes.brandName === match.params.id);
    let filteredShoes: Shoes[] = shoesObservableContext.filter(shoes => shoes.brandName === match.params.id);


    const deleteShoeById = async (id: number) => {
        const res = await fetch(`${API_ROOT}/shoes/${id}`, {
            method: 'DELETE',
        });

        if(res.ok){ 
            setShoesObservableContext(shoesObservableContext.filter(shoe => shoe.id !== id))
            shoes$.next(shoesObservableContext.filter(shoe => shoe.id !== id));
        }
        else{
            alert('Error deleting this shoe!')
        }
    }

    const deleteClothesById = async (id: number) => {
        
        const res = await fetch(`${API_ROOT}/clothing/${id}`, {
            method: 'DELETE'    
        });

        if(res.ok){
            setClothingContext(clothingContext.filter(clothes => clothes.id !== id));
        }else{
            alert('Error deleting clothes!')
        }

    }



    if(clothingContext.length + shoesObservableContext.length < 1)
        return <Redirect to={'/'} />
    else    
        return (
            
            <div>
                <section className="cards-filtered" >
                    {filteredClothing.map((clothes: Clothing) =>(
                        <Clothes key={clothes.id} clothes={clothes} hasAddToCart={true} onDelete={deleteClothesById} />
                    ))}
                    {filteredShoes.map((shoe: Shoes) =>(
                        <Shoe key={shoe.id} shoe={shoe} hasAddToCart={true} onDelete={deleteShoeById}/>
                    ))}
                </section>
            </div>
        )
}

export default ProductDetailsCategory
