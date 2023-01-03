import React, { useEffect, useMemo, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import NotFound from "./components/NotFound";
import PageProducts from "./components/PageProducts";
import CategoryProducts from "./components/CategoryProducts";
import { ProductContextDefault } from "./context/ProductContext";
import Models from "./helpers/Models";
import ProtectedRoute from "./helpers/ProtectedRoute";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import ProductDetails from "./components/ProductDetails";

export const POSTS_PER_PAGE = 9;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  USER_DASHBOARD: "/user-dashboard",
  CART: "/cart",
  ADD_PRODUCT: "/add-product",
  PRODUCT_DETAILS: "/product/:type/:id",
  CATEGORY_PRODUCTS: "/category/:id",
};

export const PROXY = process.env.REACT_APP_PROXY_HOST;

const App: React.FC = () => {
  type Clothing = Models["Clothing"];
  type Shoes = Models["Shoes"];

  const [productContext, setProductContext] = useState<(Clothing | Shoes)[]>([]);
 
  useEffect(() => {
    (async () => {
      const res = await fetch(PROXY + "/clothing");
      const data: Clothing[] = await res.json();
      
      if (data !== null) {
        if (productContext !== undefined) {
          console.log(data);
          setProductContext((prevProductContext) => [...prevProductContext, ...data]);
        } else {
          console.log(data);
          setProductContext(data);
        }
      }
    })();
  }, []);
  
  useEffect(() => {
    (async () => {
      const res = await fetch(PROXY + "/shoes");
      const data: Shoes[] = await res.json();
      
      if (data !== null) {
        if (productContext !== undefined) {
          console.log(data);
          setProductContext((prevProductContext) => [...prevProductContext, ...data]);
        } else {
          console.log(data);
          setProductContext(data);
        }
      }
    })();
  }, []);

  const productsCartMemo = useMemo(
    () => ({
      productContext,
      setProductContext,
    }),
    [productContext]
  );

  const totalPosts = productContext.length;
  let pageNumbers = [];
  if (totalPosts !== 0) {
    for (let i = 1; i <= Math.ceil(totalPosts / POSTS_PER_PAGE); i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <Router>
      <div className="flex-wrapper">
        <Navigation />
        <Switch>
          <Route exact path={ROUTES.LOGIN} component={Login} />
          <Route exact path={ROUTES.USER_DASHBOARD} component={UserDashboard} />
          <ProtectedRoute
            exact
            path={ROUTES.ADD_PRODUCT}
            shouldBeAdmin={true}
            render={() => <AddProduct />}
          />
          <ProtectedRoute
            exact
            path={ROUTES.CART}
            shouldBeAdmin={false}
            render={() => <Cart products={productContext} />}
          />
          <ProductContextDefault.Provider value={productsCartMemo}>
            <Route exact path={ROUTES.HOME} component={Home} />
            {!!pageNumbers.length &&
              pageNumbers.map((number, index) => (
                <Route key={index} exact path={`/page-${number}`} component={PageProducts} />
              ))}
            <Route exact path={ROUTES.PRODUCT_DETAILS} component={ProductDetails} />
            <Route exact path={ROUTES.CATEGORY_PRODUCTS} component={CategoryProducts} />
          </ProductContextDefault.Provider>
          <Route component={NotFound} />
        </Switch>
        <footer>Shopify</footer>
      </div>
    </Router>
  );
};

export default App;
