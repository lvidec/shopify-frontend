import Models from "../components/Models";


const KEY_TOKEN = 'token';
const KEY_USER = 'user';

type User = Models['User'];

const destroy = (key: string) => {
  localStorage.removeItem(key);
  sessionStorage.removeItem(key);
}

const get = (key: string): string => {
  let value = localStorage.getItem(key);
  if (!value) {
    value = sessionStorage.getItem(key);
  }
  if(value)
    return value;
  else
    return '{}';
}

const setUserLocal = (user: any) => {
  localStorage.setItem(KEY_USER, JSON.stringify(user));
}

const setUserSession = (user: any) => {
  sessionStorage.setItem(KEY_USER, JSON.stringify(user));
}

const setTokenLocal = (token: string) => {
  localStorage.setItem(KEY_TOKEN, token);
}

const setTokenSession = (token: string) => {
  sessionStorage.setItem(KEY_TOKEN, token);
}

const getUser = () => {
  return get(KEY_USER);
};

const getToken = () => {
  return get(KEY_TOKEN);
};

const destroyToken = () => {
  destroy(KEY_TOKEN);
};

const destroyUser = () => {
  destroy(KEY_USER);
};

export {
  getToken,
  destroyToken,
  getUser,
  destroyUser,
  setUserSession,
  setUserLocal,
  setTokenSession,
  setTokenLocal
};
