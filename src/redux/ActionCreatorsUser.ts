import axios from "axios";
import jwtDecode from "jwt-decode";
import { Dispatch } from "redux";
import { setTokenLocal, setUserLocal } from "../service/StorageService";
import { ActionAuthenticateUser, ActionFetchUsers } from "./ActionsUser";
import { ActionType } from "./ActionTypesUser";

export const fetchAllUsers = () => {
  return (dispatch: Dispatch<ActionFetchUsers>) => {
    // dispatch(fetchUsersRequest())
    dispatch({
      type: ActionType.FETCH_USERS_REQUEST,
    });
    axios
      .get(`/user`)
      .then((response: any) => {
        const users = response.data;
        // dispatch(fetchUsersSuccess(users))
        dispatch({
          type: ActionType.FETCH_USERS_SUCCESS,
          payload: users,
        });
      })
      .catch((error: any) => {
        // dispatch(fetchUsersFailure(error.message))
        dispatch({
          type: ActionType.FETCH_USERS_FAILURE,
          payload: error.message,
        });
      });
  };
};

export const fetchAuthenticate = (username: string, password: string) => {
  return async (dispatch: Dispatch<ActionAuthenticateUser>) => {
    axios
      .post("/api/authenticate", {
        username,
        password,
      })
      .then((response: any) => {
        const userAuthentication = response.data;
        const user = jwtDecode(userAuthentication.jwtToken.token);
        console.log(user);

        setTokenLocal(userAuthentication.jwtToken.token);
        setUserLocal(user);
        dispatch({
          type: ActionType.AUTHENTICATE_SUCCESS,
          payload: user,
        });
      })
      .catch((error: any) => {
        dispatch({
          type: ActionType.AUTHENTICATE_FAILURE,
          payload: error.message,
        });
      });
    // try{
    //     const resToken = await axios.post(PROXY + "/api/authenticate", { username, password });

    //     const userAuthentication = resToken.data;

    //     const userito = jwtDecode(userAuthentication.jwtToken.token);

    //     console.log(userito)

    //     setTokenLocal(userAuthentication.jwtToken.token);
    //     setUserLocal(userito);

    //     // history.push('/user-dashboard');

    //     dispatch({
    //       type: ActionType.AUTHENTICATE_SUCCESS,
    //       payload: userito
    //     });
    //   }catch(error: any){
    //     console.log('error ', error);
    //     dispatch({
    //       type: ActionType.AUTHENTICATE_FAILURE,
    //       payload: error.message
    //     })
    //   }
  };
};

// export const fetchUsersRequest = () => {
//     return (dispatch: Dispatch<Action>) => {
//         dispatch({
//             type: ActionType.FETCH_USERS_REQUEST
//         })
//     }
// }

// export const fetchUsersSuccess = (users: any) => {
//     return (dispatch: Dispatch<Action>) => {
//         dispatch({
//             type: ActionType.FETCH_USERS_SUCCESS,
//             payload: users
//         })
//     }
// }

// export const fetchUsersFailure = (error: any) => {
//     return (dispatch: Dispatch<Action>) => {
//         dispatch({
//             type: ActionType.FETCH_USERS_FAILURE,
//             payload: error
//         })
//     }
// }
