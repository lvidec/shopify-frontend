import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { CartContext } from '../helpers/CartContext';
import Clothes from './Clothes';
import Clothing from './Clothing';
import Models from '../helpers/Models';
import Shoe from './Shoe';
import Shoes from './Shoes';


type Clothing = Models['Clothing'];
type Shoes = Models['Shoes'];

const ProductDetailsCategory = ( {match}: any ) => {

    const {clothingContext, shoes$} = useContext(CartContext);

    const [shoesObservableContext, setShoesObservableContext] = useState<Shoes[]>([]);

    useEffect(() => {
        const subscription = shoes$.subscribe(setShoesObservableContext);
        return () => subscription.unsubscribe(); 
    }, [])

    let filteredClothing: Clothing[] = clothingContext.filter(clothes => clothes.brandName === match.params.id);
    let filteredShoes: Shoes[] = shoesObservableContext.filter(shoes => shoes.brandName === match.params.id);

    if(clothingContext.length + shoesObservableContext.length < 1)
        return <Redirect to={'/'} />
    else    
        return (
            
            <div>
                <section className="cards-filtered" >
                    {filteredClothing.map((clothes: Clothing) =>(
                        <Clothes key={clothes.id} clothes={clothes} hasAddToCart={true} />
                    ))}
                    {filteredShoes.map((shoe: Shoes) =>(
                        <Shoe key={shoe.id} shoe={shoe} hasAddToCart={true}/>
                    ))}
                </section>
            </div>
        )
}

export default ProductDetailsCategory
