import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Clothing from "./components/Clothing";
import Navigation from "./components/Navigation";
import UserService from "./service/UserService";
import Shoes from "./components/Shoes";
import Models from "./components/Models";
import { CartContext } from "./service/CartContext";
import Login from "./components/Login";
import Filters from "./components/Filters";
import UserDashboard from "./components/UserDashboard";
import ClothingDetails from "./components/ClothingDetails";


export const apiRoot = "http://localhost:8080";

type Clothing = Models['Clothing'];
type Shoes = Models['Shoes'];

const App: React.FC = () => {

  const [clothingContext, setClothingContext] = useState<Clothing[]>([]);
  const [shoesContext, setShoesContext] = useState<Shoes[]>([]);
  const productsMemo = useMemo(() => ({clothingContext, setClothingContext, shoesContext, setShoesContext}), [clothingContext, setClothingContext, shoesContext, setShoesContext])
  


  return (
    <Router>
      <div className="Web-Shop App" >
        <Navigation/>
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/user-dashboard' component={UserDashboard}/>
          <CartContext.Provider value={productsMemo}>
            <Route exact path='/:id' component={ClothingDetails}/>
            <Route exact path='/'>
                  <div style={{display:'grid', gridTemplateColumns:'20% 80%', paddingRight: '20px'}}>
                    <div className="filters">
                      {/* <ProtectedRoute exact path='/' component={Filters} /> */}
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
            </Route>
          </CartContext.Provider>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
