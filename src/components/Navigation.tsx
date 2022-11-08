import { Link } from "react-router-dom";
import { isAdmin, isAuthenticated } from "../service/AuthService";

const Navigation: React.FC = () => {
  return (
    <>
      <nav className="nav-container">
        <div className="nav-left">
          <Link className="link link-important" to="#">
            Shopify
          </Link>
          <Link className="link" aria-current="page" to="/">
            Home
          </Link>
          {isAuthenticated() ? (
            <Link className="link" to="/user-dashboard">
              Dashboard
            </Link>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
        </div>
        {isAdmin() && <button>ADMIN MODE</button>}
        <div className="nav-right">
          <Link className="link" aria-current="page" to="/add-product">
            Add Product (Admin)
          </Link>
          <Link className="link" aria-current="page" to="/cart">
            <i className="fa fa-shopping-cart fa-2x"></i>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
