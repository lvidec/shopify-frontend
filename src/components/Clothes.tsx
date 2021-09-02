import Models from "./Models";


type ClothingType = Models['Clothing'];


interface ClothesProps{
    clothes: ClothingType;
    onDelete?: (id: number) => void;
}
 
const Clothes: React.FC<ClothesProps> = ({clothes, onDelete}) => {


    return (
        <div className='cardr'>
            <img src={clothes.img} alt="Denim Jeans" style={{width:'90%'}}/>
            <span style={{paddingTop:'20px'}}>{clothes.name}</span>
            <span className="price">${clothes.price}</span>
            {/* <span>{shoes.details}</span> */}
            <p><button><i style={{paddingRight: '15px'}} className="fa fa-shopping-cart"></i>Add to Cart</button></p>

        </div>

    )

}

export default Clothes;