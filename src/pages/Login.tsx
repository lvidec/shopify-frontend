import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Models from "../helpers/Models";
import { API_ROOT } from "../App";
import jwtDecode from "jwt-decode";
import {
  setUserLocal,
  setTokenLocal,
  getToken,
} from "../service/StorageService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/ReducersRedux";
import { connect } from "react-redux";
import { fetchAllUsers } from "../redux/ActionCreatorsUser";
import { fetchAuthenticate } from "../redux/ActionCreatorsUser";
import { timeout } from "rxjs";

type User = Models["User"];
type UserAuthentication = Models["UserAuthentication"];

// interface ILogin {
//   userData: any;
//   fetchAllUsers: any;
//   authenticate: any;
//   fetchAuthenticate: any
// }

const Login: React.FC /* <ILogin> */ = () => {
  // useEffect(() => {
  //     fetchAllUsers()
  //   }, [])
  //   return userData.loading ? (
  //     <h2>Loading</h2>
  //   ) : userData.error ? (
  //     <h2>{userData.error}</h2>
  //   ) : (
  //     <div>
  //       <h2>Users List</h2>
  //       <div>
  //         {userData &&
  //           userData.users &&
  //           userData.users.map((user: User) => <p>{user.username}</p>)}
  //       </div>
  //     </div>
  //   )

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userData = useSelector((state: any) => state.user);
  // const authenticate = useSelector((state: any) => state.authenticate);
  const dispatch = useDispatch();

  const history = useHistory();

  // const [allUsers, setAllUsers] = useState<User[] | null>();
  let userAuthentication: UserAuthentication;
  const errorMessage = useRef<HTMLElement | null>(null);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [getToken()]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const resToken = await axios.post(API_ROOT + "/api/authenticate", {
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
      // console.log('authenticate ', authenticate);
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
    // <>
    // {getToken().length > 2 ? (
    //         // <Route path='/dash' component={UserDashboard} />
    //         <Route path='/dash' render={( props ) => (
    //             <>
    //                 <p>Welcome <b>{JSON.parse(getUser()).sub}</b> to the <b>{JSON.parse(getUser()).auth}</b> dashboard! </p>
    //                 <button className="btn btn-danger" onClick={() => logout()}>Logout</button>
    //                 <br />
    //                 <br />
    //                 <Link to='/'>Go Back</Link>
    //             </>
    //         )}>
    //         </Route>
    //     ): (

    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/img1.jpg"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fa fa-cubes fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        ></i>
                        <span className="h1 fw-bold mb-0">Shopify</span>
                      </div>

                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign into your account
                      </h5>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <span style={{ color: "grey", fontSize: "0.8rem" }}>
                          Edi (User) &nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        <label className="form-label">Username</label>
                        <span style={{ color: "grey", fontSize: "0.8rem" }}>
                          {" "}
                          &nbsp;&nbsp; Lima (Admin)
                        </span>{" "}
                        <br />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <span style={{ color: "grey", fontSize: "0.8rem" }}>
                          Edi &nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        <label className="form-label">Password</label>
                        <span style={{ color: "grey", fontSize: "0.8rem" }}>
                          {" "}
                          &nbsp;&nbsp; Lima{" "}
                        </span>{" "}
                        <br />{" "}
                      </div>

                      <span
                        ref={errorMessage}
                        style={{ color: "red", display: "none", fontSize: '1em'}}
                      >
                        Username or password are incorrect!
                      </span>
                      

                      <div style={ errorMessage ? {marginTop: '20px'} : {}}  className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                    </form>

                    <Link to="/">Go Back</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    //     )}
    // </>
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
