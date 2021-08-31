import React, { useContext, useState } from 'react';
import Models from './Models';
import { CartContext } from '../service/CartContext';
import { Link } from "react-router-dom";


type Clothing = Models['Clothing'];
type Shoes = Models['Shoes'];

const Category = ({brandName}: {brandName: string}) => {

    const {clothingContext, setClothingContext, shoesContext, setShoesContext} = useContext(CartContext);
    const [isClicked, setIsClicked] = useState(false);

    const filterBrands = () =>{
        setIsClicked(true);
        setClothingContext(clothingContext.filter(clothes => clothes.brandName === brandName));
        setShoesContext(shoesContext.filter(shoes => shoes.brandName === brandName));
    }
    

    return (
        <div>
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title"><Link to={brandName} onClick={() => filterBrands()}>{brandName}</Link></h4>
                </div>
            </div>
            <div className="panel panel-default">
                <div className="panel-heading">
                    {/* <h4 className="panel-title"><a href="#">{shoes.name}</a></h4> */}
                </div>
            </div>
            {/* {isClicked && <a onClick={() => setIsClicked(false)} href='/'>Go back</a>} */}
        </div>
    )
}

export default Category;
