import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { PROXY } from "../App";
import Models from "../helpers/Models";
import { fetchAllUsers } from "../redux/ActionCreatorsUser";
import { getToken, setTokenLocal, setUserLocal } from "../service/StorageService";

type UserAuthentication = Models["UserAuthentication"];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const authenticate = useSelector((state: any) => state.authenticate);
  const dispatch = useDispatch();

  const history = useHistory();

  let userAuthentication: UserAuthentication;
  const errorMessage = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [getToken(), dispatch]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const resToken = await axios.post(PROXY + "/api/authenticate", {
        username,
        password,
      });

      userAuthentication = resToken.data;

      const userito = jwtDecode(userAuthentication.jwtToken.token);

      console.log(userito);

      setTokenLocal(userAuthentication.jwtToken.token);
      setUserLocal(userito);

      history.push("/user-dashboard");

      // fetchAuthenticate(username, password);
      // dispatch(fetchAuthenticate(username, password));
      // if(authenticate.user && authenticate.user.sub === username){
      //   history.push("/user-dashboard");
      // }
    } catch (err) {
      if (errorMessage.current) {
        errorMessage.current.style.display = "inline";
      }
    }
  };

  return (
    <section className="login-container">
      <div className="card-container">
        <img
          src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/img1.jpg"
          alt="login form"
        />
        <div className="login-info-container">
          <div className="login-info">
            <div className="title">
              <i className="fa fa-cubes me-3"></i>
              &nbsp; <span>Shopify</span>
            </div>
            <form>
              <p>Sign into your account</p>

              <div className="search-bar">
                <input
                  type="text"
                  id="form2Example17"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <label>Username</label>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>Edi (User)</span>
                <span> &nbsp;&nbsp; Lima (Admin)</span> <br />
              </div>

              <div className="search-bar">
                <input
                  type="text"
                  id="form2Example27"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <label>Password&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <span>Edi</span>
                <span> &nbsp;&nbsp; Lima </span> <br />{" "}
              </div>

              <div ref={errorMessage} className="error-message">
                <span>Username or password are incorrect!</span>
                <br />
              </div>

              <br />
              <a href="/#" onClick={handleSubmit} className="login-button">
                Login
              </a>
            </form>

            <Link className="back-button" to="/">
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// const mapStateToProps = (state: any) => {
//   return {
//     userData: state.user,
//     authenticate: state.authenticate
//   };
// };

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     fetchAllUsers: () => dispatch(fetchAllUsers()),
//     fetchAuthenticate: (username: string, password: string) => dispatch(fetchAuthenticate(username, password))
//   };
// };

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     authenticate: (username: string, password: string) => dispatch(authenticate(username, password)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;
