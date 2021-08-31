import React from 'react'

const Product = () => {
    return (
        <div>
            
        </div>
    )
}

export default Product


// import Models from "./Models";

// type Product = Models['Product'];

// interface ProductProps{
//     product: Product;
//     onDelete: (product: Product) => void;
// }

// const Product: React.FC<ProductProps> = ({product, onDelete}) => {

//     return(
//         <div>
//             <button className='btn btn-danger float-end' onClick={() => onDelete(product)}>Delete</button>

//             <h3>{product.id}</h3>
//             <p>{product.name}</p>
//             <p>{product.details}</p>
//             <p>{product.brandName}</p>
//             <p>{product.img}</p>
//             <p>{product.price}</p>
//             <p>{product.sex}</p>
//             <p>{product.clothingType?.type}</p>
//             <p>{product.shoesType?.type}</p>

//         </div>
//     )
// }

// export default Product;