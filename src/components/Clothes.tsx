import { Redirect, useHistory } from "react-router-dom";
import { isAdmin, isAuthenticated } from "../service/AuthService";
import { destroyLocalClothing, getLocalClothing, setLocalClothing } from "../service/StorageService";
import Models from "../helpers/Models";


type ClothingType = Models['Clothing'];


interface ClothesProps{
    clothes: ClothingType;
    onDelete?: (id: number) => void;
    hasAddToCart: boolean;
}
 
const Clothes: React.FC<ClothesProps> = ({clothes, onDelete, hasAddToCart}) => {

    const history = useHistory()

    const addToCart = (id: number) =>{

        if(!isAuthenticated())
            history.push('/login');
        else{
            let array = getLocalClothing();
            getLocalClothing().length ? setLocalClothing(array.concat(id)) : setLocalClothing([id]);
        }
    }

    // const destroy = () =>{
    //     destroyLocalClothing();
    // }



    return (
        <div className='cardr'>
            <img src={clothes.img} alt="Denim Jeans"  style={{width:'90%'}}/>
            <span style={{paddingTop:'20px'}}>{clothes.name}</span>
            <span className="price">${clothes.price}</span>
            {/* <span>{shoes.details}</span> */}
            {hasAddToCart && <p><button onClick={() => addToCart(clothes.id)}><i style={{paddingRight: '15px'}} className="fa fa-shopping-cart"></i>Add to Cart</button></p>}
            {/* <button onClick={destroy}>Destroy</button> */}
            {isAdmin() && hasAddToCart && <p><button style={{backgroundColor: 'rgb(190, 38, 38)'}} onClick={() => {onDelete && onDelete(clothes.id)}}><i style={{paddingRight: '15px'}} className="fa fa-trash-o"></i>Delete</button></p>}
        </div>

    )

}

export default Clothes;