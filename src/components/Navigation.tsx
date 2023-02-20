import { Link } from "react-router-dom";
import { isAdmin, isAuthenticated } from "../service/AuthService";
import { ROUTES } from "../App";

const Navigation: React.FC = () => {
  return (
    <nav className="nav-container">
      <div className="nav-left">
        <div className="link link-important">Shopify</div>
        <Link className="link" aria-current="page" to={ROUTES.HOME}>
          Home
        </Link>
        {isAuthenticated() ? (
          <Link className="link" to={ROUTES.USER_DASHBOARD}>
            Dashboard
          </Link>
        ) : (
          <Link className="link" to={ROUTES.LOGIN}>
            Login
          </Link>
        )}
      </div>
      {isAdmin() && <button>ADMIN MODE</button>}
      <div className="nav-right">
        <Link className="link" aria-current="page" to={ROUTES.ADD_PRODUCT}>
          <p className={isAdmin() ? "admin-unlock" : "admin-lock"}>Add Product</p>
        </Link>
        <Link className="link" aria-current="page" to={ROUTES.CART}>
          <i className="fa fa-shopping-cart fa-2x"></i>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;