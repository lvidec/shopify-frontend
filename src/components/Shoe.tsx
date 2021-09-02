import Models from "./Models";

type ShoesType = Models['Shoes'];


interface ShoesProps{
    shoe: ShoesType;
    onDelete?: (id: number) => void;
}

const Shoe: React.FC<ShoesProps> = ({shoe, onDelete}) => {

    return (
        // <div className='card'>
        //   <div className='card-inner'>
        //     <div className='card-front'>
        //       <img src={shoes.img} alt='' />
        //     </div>
        //     <div className='card-back'>
        //       <h1>{shoes.name}</h1>
        //       <ul>
        //         <li>
        //           <strong>Details:</strong> {shoes.details}
        //         </li>
        //         <li>
        //           <strong>Price:</strong> {shoes.price}$
        //         </li>
        //         <li>
        //           <strong>Brand name:</strong> {shoes.brandName}
        //         </li>
        //         <li>
        //           <strong>Sex:</strong> {shoes.sex}
        //         </li>
        //         <li>
        //           <strong>Type:</strong> {shoes.shoesType.type}
        //         </li>
        //       </ul>
        //     </div>
        //   </div>
        // </div>
        <div className='cardr'>
            <img src={shoe.img} alt="Denim Jeans" style={{width:'90%'}}/>
            <span style={{paddingTop:'20px'}}>{shoe.name}</span>
            <span className="price">${shoe.price}</span>
            {/* <span>{shoe.details}</span> */}
            <p><button><i style={{paddingRight: '15px'}} className="fa fa-shopping-cart"></i>Add to Cart</button></p>
        </div>

      )
}

export default Shoe;