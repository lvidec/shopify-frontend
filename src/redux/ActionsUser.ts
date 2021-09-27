import { ActionType } from "./ActionTypesUser";

interface FetchUsersRequest {
  type: ActionType.FETCH_USERS_REQUEST;
}

interface FetchUsersSuccess {
  type: ActionType.FETCH_USERS_SUCCESS;
  payload: any;
}

interface FetchUsersFailure {
  type: ActionType.FETCH_USERS_FAILURE;
  payload: any;
}


interface AuthenticateUserSuccess {
  type: ActionType.AUTHENTICATE_SUCCESS;
  payload: any;
}

interface AuthenticateUserFailure {
  type: ActionType.AUTHENTICATE_FAILURE;
  payload: any;
}



export type ActionAuthenticateUser = AuthenticateUserSuccess | AuthenticateUserFailure;

export type ActionFetchUsers = FetchUsersRequest | FetchUsersSuccess | FetchUsersFailure;
