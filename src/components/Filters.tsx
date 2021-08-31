import React, { useContext, useCallback } from 'react'
import { CartContext } from '../service/CartContext';
import Models from './Models';
import Category from './Category';


const Filters = () => {


    const {clothingContext, setClothingContext, shoesContext, setShoesContext} = useContext(CartContext);

    const distinctBrands = useCallback(() : string[] =>{
        // let distinctClothing = [...new Set(clothingContext.map(clothes => clothes.brandName))]
        // clothingContext.forEach(clothes => setCategory(...category, clothes.brandName));
        let brandNames: string[] = [];
        clothingContext.forEach(clothes => brandNames.push(clothes.brandName))
        shoesContext.forEach(shoes => brandNames.push(shoes.brandName))
        return [...new Set(brandNames)];
    }, [clothingContext, shoesContext]);


    return (
            <div className="left-sidebar">
                <h2>Category</h2>
                <div className="panel-group category-products" id="accordian">
                    {distinctBrands().length && distinctBrands().map((brandName: string, index: number) =>(
                        <Category key={index} brandName={brandName}/>
                    ))}
                </div>

                <br />



                {/* <h2>Brands</h2>
                <div className="panel-group category-products" id="accordian">
                    {}
                </div>
             */}
                {/* <div className="brands_products">
                    <h2>Brands</h2>
                    <div className="brands-name">
                        <ul className="nav nav-pills nav-stacked">
                            <li><a href=""> <span className="pull-right">(50)</span>Acne</a></li>
                            <li><a href=""> <span className="pull-right">(56)</span>Grüne Erde</a></li>
                            <li><a href=""> <span className="pull-right">(27)</span>Albiro</a></li>
                            <li><a href=""> <span className="pull-right">(32)</span>Ronhill</a></li>
                            <li><a href=""> <span className="pull-right">(5)</span>Oddmolly</a></li>
                            <li><a href=""> <span className="pull-right">(9)</span>Boudestijn</a></li>
                            <li><a href=""> <span className="pull-right">(4)</span>Rösch creative culture</a></li>
                        </ul>
                    </div>
                </div> */}

                
            </div>
    )
}

export default Filters
