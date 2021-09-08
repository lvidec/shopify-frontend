import { useHistory } from "react-router-dom";
import { isAuthenticated } from "../service/AuthService";
import { getLocalShoes, setLocalShoes } from "../service/StorageService";
import Models from "../helpers/Models";

type ShoesType = Models['Shoes'];


interface ShoesProps{
    shoe: ShoesType;
    onDelete?: (id: number) => void;
    hasAddToCart: boolean;
}

const Shoe: React.FC<ShoesProps> = ({shoe, onDelete, hasAddToCart}) => {

    const history = useHistory()

    const addToCart = (id: number) =>{

        if(!isAuthenticated())
            history.push('/login');
        else{
            let array = getLocalShoes();
            getLocalShoes().length ? setLocalShoes(array.concat(id)) : setLocalShoes([id]);
        }
    }

    // const destroy = () =>{
    //     destroyLocalClothing();
    // }



    return (
        
        <div className='cardr'>
            <img src={shoe.img} alt="Denim Jeans" style={{width:'90%'}}/>
            <span style={{paddingTop:'20px'}}>{shoe.name}</span>
            <span className="price">${shoe.price}</span>
            {/* <span>{shoe.details}</span> */}
            {hasAddToCart && <p><button onClick={() => addToCart(shoe.id)}><i style={{paddingRight: '15px'}} className="fa fa-shopping-cart"></i>Add to Cart</button></p>}
        </div>

      )
}

export default Shoe;