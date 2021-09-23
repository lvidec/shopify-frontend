import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { CartContext } from '../helpers/CartContext';
import Clothes from './Clothes';
import Clothing from './Clothing';
import Models from '../helpers/Models';
import Shoe from './Shoe';
import Shoes from './Shoes';
import { API_ROOT, POSTS_PER_PAGE } from '../App';
import Pagination from './Pagination';


type Clothing = Models['Clothing'];
type Shoes = Models['Shoes'];
var numberOfClothingRemaining: number = 0;

const PageProducts = ( {match}: any ) => {

    
    const {clothingContext, setClothingContext, shoes$} = useContext(CartContext);
    
    const [shoesObservableContext, setShoesObservableContext] = useState<Shoes[]>([]);
    
    useEffect(() => {
        const subscription = shoes$.subscribe(setShoesObservableContext);
        return () => subscription.unsubscribe(); 
    }, [shoes$])

    const getNumberRegexp = /(?!x)[0-9]+/;
    const numberArray = getNumberRegexp.exec(match.path);
    
    let pageNumber: number = 0;

    if(numberArray)
        pageNumber = parseInt(numberArray[0]);

    let paginatedClothing: Clothing[] = [];
    let paginatedShoes: Shoes[] = [];

    const startingPoint = Math.ceil(clothingContext.length / POSTS_PER_PAGE);

    if(pageNumber !== 0){
        paginatedClothing = clothingContext.slice( (pageNumber - 1) * POSTS_PER_PAGE, POSTS_PER_PAGE * pageNumber);
        if(clothingContext.length < POSTS_PER_PAGE * pageNumber){
            if(pageNumber - startingPoint === 0){
                numberOfClothingRemaining = clothingContext.length - (POSTS_PER_PAGE * (pageNumber - 1));
                paginatedShoes = shoesObservableContext.slice( (pageNumber - startingPoint) * POSTS_PER_PAGE, POSTS_PER_PAGE * (pageNumber - startingPoint + 1) - numberOfClothingRemaining);
            }
            else{
                paginatedShoes = shoesObservableContext.slice( ((pageNumber - startingPoint) * POSTS_PER_PAGE) - numberOfClothingRemaining, POSTS_PER_PAGE * (pageNumber - startingPoint + 1) - numberOfClothingRemaining);
            }
        }
    }


    const deleteShoeById = async (id: number) => {
        const res = await fetch(`${API_ROOT}/shoes/${id}`, {
            method: 'DELETE',
        });

        if(res.ok){ 
            setShoesObservableContext(shoesObservableContext.filter(shoe => shoe.id !== id))
            shoes$.next(shoesObservableContext.filter(shoe => shoe.id !== id));
            console.log('deleted, ', id)
        }
        else{
            alert('Error deleting this shoe!')
        }
    }

    const deleteClothesById = async (id: number) => {
        
        const res = await fetch(`${API_ROOT}/clothing/${id}`, {
            method: 'DELETE'    
        });

        if(res.ok){
            setClothingContext(clothingContext.filter(clothes => clothes.id !== id));
        }else{
            alert('Error deleting clothes!')
        }

    }

    
    if(clothingContext.length + shoesObservableContext.length < 1)
        return <Redirect to={'/'} />
    else    
        return (
            <div>
                <Pagination/>
                <section className="cards-filtered" >
                    {paginatedClothing.map((clothes: Clothing) =>(
                        <Clothes key={clothes.id} clothes={clothes} hasAddToCart={true} onDelete={deleteClothesById}  />
                    ))}
                    {paginatedClothing.length < 6 && paginatedShoes.map((shoe: Shoes) =>(
                        <Shoe key={shoe.id} shoe={shoe} hasAddToCart={true} onDelete={deleteShoeById}/>
                    ))}
                </section>
            </div>
        )
}

export default PageProducts
