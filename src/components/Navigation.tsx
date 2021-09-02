import { Link } from "react-router-dom";
import "../App.css";
import { isAdmin, isAuthenticated } from '../service/AuthService';

const Navigation: React.FC = () => {


  return (
    <>
      <nav
        className="navbar navbar-expand-md navbar-dark bg-dark"
        aria-label="Fifth navbar example"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" style={{pointerEvents: 'none'}} to="#">
            Shopify
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample05"
            aria-controls="navbarsExample05"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample05">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                {isAuthenticated() ? 
                  <Link className="nav-link" to="/user-dashboard">
                    Dashboard
                  </Link>
                :
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>}
              </li>
            </ul>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-fill justify-content-center" >
              <li className="nav-item">
                {isAdmin() && <a className="nav-link" style={{color: 'royalblue',pointerEvents: 'none'}} >ADMIN MODE</a>}
              </li>
            </ul>
            {/* <form>
              <input
                className="form-control"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
            </form> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
