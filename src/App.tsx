import React, { useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Models from "./helpers/Models";
import { CartContext } from "./helpers/CartContext";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import ProductDetailsCategory from "./components/ProductDetails";
import AddProduct from "./pages/AddProduct";
import ProtectedRoute from "./helpers/ProtectedRoute";
import Cart from "./pages/Cart";
import NotFound from "./components/NotFound";
import Home from "./pages/Home";
import { useObservableState } from "observable-hooks";
import { BehaviorSubject } from "rxjs";
import Footer from "./components/Footer";



export const apiRoot = "http://localhost:8080";

export const ROUTES = {
  HOME: "/",
  PRODUCT_DETAILS: "/category/:id",
  LOGIN: "/login",
  USER_DASHBOARD: "/user-dashboard",
  ADD_CLOTHING: "/add-clothing",
  ADD_SHOES: "/add-shoes",
  CART: "/cart",
};

type Clothing = Models["Clothing"];
type Shoes = Models["Shoes"];
type User = Models["User"];


const App: React.FC = () => {
  type Clothing = Models["Clothing"];
  type Shoes = Models["Shoes"];

  const [clothingContext, setClothingContext] = useState<Clothing[]>([]);
  // const [shoesContext, setShoesContext] = useState<Shoes[]>([]);

  let shoes$ = useMemo(() => new BehaviorSubject<Shoes[]>([]), []);
  const productsMemo = useMemo(
    () => ({
      clothingContext,
      setClothingContext,
      // shoesContext,
      // setShoesContext,
      shoes$
    }),
    // [clothingContext, setClothingContext, shoesContext, setShoesContext]
    [clothingContext, setClothingContext, shoes$]
  );

  return (
    <Router>
      <div className="Web-Shop App">
        <Navigation />
        <Switch>
          <Route exact path={ROUTES.LOGIN} component={Login} />
          <Route exact path={ROUTES.USER_DASHBOARD} component={UserDashboard} />
          <ProtectedRoute
            exact
            path={ROUTES.ADD_CLOTHING}
            shouldBeAdmin={true}
            render={() => <AddProduct role={"CLOTHING"} />}
          />
          <ProtectedRoute
            exact
            path={ROUTES.ADD_SHOES}
            shouldBeAdmin={true}
            render={() => <AddProduct role={"SHOES"} />}
          />
          <CartContext.Provider value={productsMemo}>
            <Route exact path={ROUTES.HOME} component={Home} />
            <Route
              exact
              path={ROUTES.PRODUCT_DETAILS}
              component={ProductDetailsCategory}
            />
            <ProtectedRoute
              exact
              path={ROUTES.CART}
              shouldBeAdmin={false}
              render={() => (
                <Cart
                  clothing={productsMemo.clothingContext}
                  // shoes={productsMemo.shoesContext}
                  shoes={productsMemo.shoes$}
                />
              )}
            />
          </CartContext.Provider>
          <Route component={NotFound} />
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
