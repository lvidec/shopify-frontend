import React from 'react'

const Products = () => {
    return (
        <div>
            
        </div>
    )
}

export default Products


// import { useState, useEffect } from "react";
// import { ajax } from "rxjs/ajax";
// import Models from "./Models";
// import {BehaviorSubject} from "rxjs";
// import { apiRoot } from "../App";
// import Clothes from "./Clothes";
// import Product from "./Product";
// import { profileEnd } from "console";

// const Products: React.FC = () => {
    
//     type Product = Models['Product'];
//     type Clothing = Models['Clothing'];
//     type Shoes = Models['Shoes'];
//     // type AllProductTypes =  Product | Clothing | Shoes;



//     const [products, setProducts] = useState<Product[]>([]);
//     const [clothing, setClothing] = useState<Clothing[]>([]);
//     const [shoes, setShoes] = useState<Shoes[]>([]);

//     let productSubject = new BehaviorSubject<Product[] | null>(null);

//     useEffect(() => {
//         let subscriptionClothing = ajax.getJSON(apiRoot + '/clothing').subscribe((res: any) =>{
//             setClothing(res);
//         })
    
//         let subscriptionShoes = ajax.getJSON(apiRoot + '/shoes').subscribe((res: any) =>{
//             setShoes(res);
//         })

//         setProducts([...clothing, ...shoes]);
//         productSubject.next([...products]);

//         console.log(products);
    
//         return () => {
//             subscriptionClothing.unsubscribe();
//             subscriptionShoes.unsubscribe();
//         };

//     }, [])


//     // function isClothing(product: any): product is Clothing {
//     //     return true;
//     // }
//     // function isShoes(product: any): product is Shoes {
//     //     return true;
//     // }
//     // function isProduct(product: any): product is Product {
//     //     return true;
//     // }
    

//     const getProducts = () => {
//        return productSubject;
//     }


//     const addProduct = (product: Clothing | Shoes | any) => {
        
//         if(product.type === "Clothing"){
//             ajax.post(apiRoot + '/clothing', product).subscribe((res: any) =>{
//                 setClothing([...clothing, res]);
//                 productSubject.next([...products, res]);
//             })
//         }
//         else if(product.type === "Shoes"){
//             ajax.post(apiRoot + '/shoes', product).subscribe((res: any) =>{
//                 setShoes([...shoes, res]);
//                 productSubject.next([...products, res]);
//             })
//         }
//     }

//     const deleteProduct = (product: Clothing | Shoes | any) => {

//         if(product.type === "Clothing"){
//             ajax.delete(`${apiRoot}/clothing/${product.id}`).subscribe((res: any) =>{
//                 setClothing(clothing.filter(x => x.id != product.id));
//                 setProducts(products.filter(x => x.id != product.id && x.clothingType));
//                 productSubject.next([...products]);
//                 console.log(clothing);
//                 console.log(products);
//             })
//         }
//         else if(product.type === "Shoes"){
//             ajax.delete(`${apiRoot}/shoes/${product.id}`).subscribe((res: any) =>{
//                 setShoes(shoes.filter(x => x.id != product.id));
//                 setProducts(products.filter(x => x.id != product.id && x.shoesType));
//                 productSubject.next([...products]);
//                 console.log(shoes);
//                 console.log(products);

//             })
//         }

        
//     }



//     return ( 
//         <div className='jumbotron'>
//             {products.map((product: Product, index: number) =>(
//                 <Product key={index} product={product} onDelete={deleteProduct}/>
//             ))}
//             {clothing.map((clothes: Clothing, index: number) =>(
//                 <Clothes key={index} clothes={clothes} /* onDelete={deleteProduct} *//>
//             ))}
//         </div>
//     )



// }


// export default Products;