import Models from "./Models";
import { useContext } from "react";
import { CartContext } from "../service/CartContext";
import Product from "./Product";
import Clothing from "./Clothing";

type ClothingType = Models['Clothing'];
type ProductType = Models['Product'];


interface ClothesProps{
    clothes: ClothingType;
    onDelete: (id: number) => void;
}
 
const Clothes: React.FC<ClothesProps> = ({clothes, onDelete}) => {

    // const {clothingContext, setClothingContext, shoesContext, setShoesContext} = useContext(CartContext);

    
    // const mapClothesToProduct: ProductType = (clothes: Clothing) =>{
        
    //     let productToReturn: ProductType = {
    //         // id: clothes.id,
    //         name: clothes.name,
    //         // details: clothes.details,
    //         // price: clothes.price,
    //         // img: clothes.img,
    //         brandName: clothes.brandName,
    //         sex: clothes.sex,
    //         clothingType: clothes.clothingType
    //     }
    //     return productToReturn;
    // }
    
    // const addToCart = (clothesToAdd: ClothingType ) => {
    //     setClothingContext(clothingContext);
    // }
   
   

    return (
        <div className='cardr'>
            <img src={clothes.img} alt="Denim Jeans" style={{width:'90%'}}/>
            <span style={{paddingTop:'20px'}}>{clothes.name}</span>
            <span className="price">${clothes.price}</span>
            {/* <span>{shoes.details}</span> */}
            <p><button><i style={{paddingRight: '15px'}} className="fa fa-shopping-cart"></i>Add to Cart</button></p>
            
            {/* {products && products.map((product: ProductType | undefined) =>(
                product?.brandName
            ))} */}
        </div>

    )

}

export default Clothes;