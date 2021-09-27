import { ActionAuthenticateUser, ActionFetchUsers } from "./ActionsUser";
import { ActionType } from "./ActionTypesUser";
import Models from '../helpers/Models'
import { Action } from "rxjs/internal/scheduler/Action";

interface StateFetchUsers {
  loading: boolean,
  users: Models['User'][],
  error: string
}

const initialStateFetchUsers: StateFetchUsers = {
  loading: false,
  users: [],
  error: "",
};

interface StateAuthenticate {
  user: any,
  error: string
}

const initialStateAuthenticate: StateAuthenticate = {
  user: undefined,
  error: '',
};

const reducerFetchusers = (state: StateFetchUsers = initialStateFetchUsers, action: ActionFetchUsers) => {
  switch (action.type) {
    case ActionType.FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionType.FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case ActionType.FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const reducerAuthenticate = (state: StateAuthenticate = initialStateAuthenticate, action: ActionAuthenticateUser) => {
  switch (action.type) {
    case ActionType.AUTHENTICATE_SUCCESS:
      return {
        user: action.payload,
        error: ''
      };
    case ActionType.AUTHENTICATE_FAILURE:
      return {
        user: undefined,
        error: action.payload
      };
    default:
      return state;
  }
};

export { reducerFetchusers, reducerAuthenticate };
