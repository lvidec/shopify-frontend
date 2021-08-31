import React from 'react';
import Models from './Models';

type Clothing = Models['Clothing'];
type Shoes = Models['Shoes'];

interface CartProps{
    clothing: Clothing[];
    shoes: Shoes[];
}

const Cart: React.FC<CartProps> = ({clothing, shoes}) => {
    return (
        <div>
            {clothing.map((clothes: Clothing) =>(
                clothes.brandName
            ))}
            {shoes.map((shoes: Shoes) =>(
                shoes.brandName
            ))}
        </div>
    )
}

export default Cart;