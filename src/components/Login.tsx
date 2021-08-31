import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useLayoutEffect } from "react";
import Models from "./Models";
import { apiRoot } from "../App";


type User = Models['User'];
type UserAuthentication = Models['UserAuthentication'];

const Login = () => {

    const [user, setUser] = useState<User | null | undefined>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    let allUsers: User[] | null = null;
    let userAuthentication: UserAuthentication;

    useLayoutEffect(() =>{
        
        sessionStorage.getItem("username") == "Lima" ? setRole("Admin") : setRole("User");

    }, [])
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
 
        try{   
            // let res = await axios.get(`${apiRoot}/user`);
            // allUsers = await res.data;

            // console.table(allUsers);

            // let currentUser: User | null | undefined = allUsers!.find(x => x.username === username);

            // setUser(currentUser);

            // console.table(user);

            const resToken = await axios.post(apiRoot + "/api/authenticate", { username, password });
            // setUser(resToken.data);
            userAuthentication = resToken.data;

            sessionStorage.setItem("token", userAuthentication.jwtToken.token);
            sessionStorage.setItem("username", username);
            // sessionStorage.setItem("username", user?.authorities);
            
            // const resUser = await axios.get("http://localhost:8080/api/user/current-user");
            // setUser(resUser.data);
            // console.log(user);
        
        }catch (err){
            console.log(err);
        }
    }

    const logout = () => {
        console.log(sessionStorage.getItem("token"));
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
    }


    return(
        <>
        {sessionStorage.getItem('token') ? (    
                <>
                {/* <button onClick={() => isus()}>klsdfjlksdjflkjsdf</button> */}
                    <p>Welcome <b>{sessionStorage.username}</b> to the <b>{role}</b> dashboard! </p>
                    <button className="btn btn-danger" onClick={logout}>Logout</button>
                    <br />
                    <br />
                    <Link to='/'>Go Back</Link>

                </>
            ): (
                <section className="vh-100" style={{backgroundColor: '#9A616D'}}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{borderRadius: '1rem'}}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                <img
                                    src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/img1.jpg"
                                    alt="login form"
                                    className="img-fluid" style={{borderRadius: '1rem 0 0 1rem'}}
                                />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                <div className="card-body p-4 p-lg-5 text-black">

                                    <form onSubmit={handleSubmit}>

                                    <div className="d-flex align-items-center mb-3 pb-1">
                                        <i className="fa fa-cubes fa-2x me-3" style={{color: '#ff6219'}}></i>
                                        <span className="h1 fw-bold mb-0">Shopify</span>
                                    </div>

                                    <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

                                    <div className="form-outline mb-4">
                                        <input type="text" id="form2Example17" className="form-control form-control-lg" 
                                        onChange={ (e) => setUsername(e.target.value)}  />
                                        <label className="form-label" >Username</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="text" id="form2Example27" className="form-control form-control-lg" 
                                        onChange={ (e) => setPassword(e.target.value)}  />
                                        <label className="form-label">Password</label>
                                    </div>

                                    <div className="pt-1 mb-4">
                                        <button className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                                    </div>

   
                                    </form>

                                 <Link to='/'>Go Back</Link>

                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default Login;