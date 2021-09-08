import { Redirect } from 'react-router-dom';
import { getLocalClothing, getLocalShoes } from '../service/StorageService';
import Clothes from './Clothes';
import Models from '../helpers/Models';
import Shoe from './Shoe';

type Clothing = Models['Clothing'];
type Shoes = Models['Shoes'];

interface CartProps{
    clothing: Clothing[];
    shoes: Shoes[];
}

const Cart: React.FC<CartProps> = ({clothing, shoes}) => {


    let filteredClothing: Clothing[] | null = null;
    if(getLocalClothing().length)
        filteredClothing = clothing.filter(clothes => getLocalClothing().includes(clothes.id));
    
    
    let filteredShoes: Shoes[] | null = null;
    if(getLocalShoes().length)
        filteredShoes = shoes.filter(shoes => getLocalShoes().includes(shoes.id));

    let totalPriceClothing: number | undefined = filteredClothing?.reduce((a, {price}) => a + price, 0);
    let totalPriceShoes: number | undefined = filteredShoes?.reduce((a, {price}) => a + price, 0);

    if(clothing.length + shoes.length < 1)
        return <Redirect to='/'/>
    else if(!filteredClothing && !filteredShoes) 
        return <h2>Empty Cart</h2>
    else    
        return (
            <div>
                <h2>Total price: <span className="price">${(totalPriceClothing && totalPriceShoes) && totalPriceClothing + totalPriceShoes}</span></h2>
                <section className="cards-filtered" >
                    {filteredClothing && filteredClothing.map((clothes: Clothing) =>(
                        <Clothes key={clothes.id} clothes={clothes} hasAddToCart={false} />
                    ))}
                    {filteredShoes && filteredShoes.map((shoe: Shoes) =>(
                        <Shoe key={shoe.id} shoe={shoe} hasAddToCart={false} />
                    ))}
                </section>
            </div>
        )
}

export default Cart;