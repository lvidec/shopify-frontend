import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../helpers/CartContext';
import Models from '../helpers/Models';
import { Link } from 'react-router-dom';
import { POSTS_PER_PAGE } from '../App';

const Pagination = () => {

    type Clothing = Models['Clothing'];
    type Shoes = Models['Shoes'];

    const {clothingContext, shoes$} = useContext(CartContext);

    const [shoesObservableContext, setShoesObservableContext] = useState<Shoes[]>([]);

    useEffect(() => {
        const subscription = shoes$.subscribe(setShoesObservableContext);
        return () => subscription.unsubscribe(); 
    }, [])
    
    const pageNumbers = [];
    const totalPosts = clothingContext.length + shoesObservableContext.length;

    for (let i = 1; i <= Math.ceil(totalPosts / POSTS_PER_PAGE); i++) {
        pageNumbers.push(i);
    }
    
    return (
        <nav className='container'>
            <ul className='pagination flex-fill justify-content-center'>
                {pageNumbers.map((number, index) => (
                    <li key={index}>
                        <Link to={`/page-${number}`} className='page-link'>{number}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;
