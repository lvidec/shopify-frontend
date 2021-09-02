import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { CartContext } from '../service/CartContext';
import Clothes from './Clothes';
import Clothing from './Clothing';
import Models from './Models';
import Shoe from './Shoe';
import Shoes from './Shoes';


type Clothing = Models['Clothing'];
type Shoes = Models['Shoes'];

const ClothingDetails = ( {match}: any ) => {

    const {clothingContext, setClothingContext, shoesContext, setShoesContext} = useContext(CartContext);

    let filteredClothing: Clothing[] = clothingContext.filter(clothes => clothes.brandName === match.params.id);
    let filteredShoes: Shoes[] = shoesContext.filter(shoes => shoes.brandName === match.params.id);

    if(clothingContext.length + shoesContext.length < 1)
        return <Redirect to={'/'} />
    else    
        return (
            
            <div>
                <section className="cards-filtered" >
                    {filteredClothing.map((clothes: Clothing) =>(
                        <Clothes key={clothes.id} clothes={clothes} />
                    ))}
                    {filteredShoes.map((shoe: Shoes) =>(
                        <Shoe key={shoe.id} shoe={shoe} />
                    ))}
                </section>
            </div>
        )
}

export default ClothingDetails
