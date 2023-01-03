import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { logout } from "../service/AuthService";
import { getUser } from "../service/StorageService";
import { ROUTES } from "../App";

const UserDashboard = () => {
  if (JSON.parse(getUser()).sub)
    return (
      <div className="dashboard-container">
        <img
          src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2017/02/Photoshop-Replace-Background-Featured.jpg"
          alt="girl-staring-into-oblivion"
        />
        <div className="text-on-image">
          <p>
            Welcome <b>{JSON.parse(getUser()).sub}</b> to the <b>{JSON.parse(getUser()).auth}</b>
            &nbsp;dashboard!
          </p>
          <div className="links">
            <Link
              to={ROUTES.HOME}
              onClick={() => {
                window.location.reload();
                logout();
              }}
            >
              Logout
            </Link>
            <Link to={ROUTES.HOME}>Go Home</Link>
          </div>
        </div>
      </div>
    );
  else return <Redirect to={ROUTES.HOME} />;
};

export default UserDashboard;
