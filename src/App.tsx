import React, { useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Clothing from "./components/Clothing";
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import UserService from "./service/UserService";
import Shoes from "./components/Shoes";
import Models from "./components/Models";
import { CartContext } from "./service/CartContext";
import { Sex } from "./components/Enums";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Filters from "./components/Filters";


export const apiRoot = "http://localhost:8080";

type Product = Models['Product'];
type Clothing = Models['Clothing'];
type Shoes = Models['Shoes'];

const App: React.FC = () => {

  const [clothingContext, setClothingContext] = useState<Clothing[]>([]);
  const [shoesContext, setShoesContext] = useState<Shoes[]>([]);
  // const productsMemo = useMemo(() => ({products, setProducts}), [products, setProducts])


  return (
    <Router>
      <div className="Web-Shop App" >
  
        <Route exact path='/login' component={Login}/>

          <Route path='/'>
            <CartContext.Provider value={{clothingContext, setClothingContext, shoesContext, setShoesContext}}>
              <Navigation/>

              <div style={{display:'grid', gridTemplateColumns:'20% 80%', paddingRight: '20px'}}>
                <div className="filters">
                  <Filters/>
                </div>
                <div className='shopping'>
                  <UserService/>
                  <section className="cards">
                    <Clothing/>
                    <Shoes/>
                  </section>
                </div>
              </div>
              {/* <Cart cart={clothing, shoes}/> */}
                  </CartContext.Provider>
          </Route>
        
        </div>
    </Router>
  );
};

export default App;
