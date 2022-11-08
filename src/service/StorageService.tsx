const KEY_TOKEN = "token";
const KEY_USER = "user";
const KEY_CLOTHING = "clothing";
const KEY_SHOES = "shoes";

const destroy = (key: string) => {
  localStorage.removeItem(key);
  sessionStorage.removeItem(key);
};

const get = (key: string): string => {
  let value = localStorage.getItem(key);
  if (!value) {
    value = sessionStorage.getItem(key);
  }
  if (value) return value;
  else return "{}";
};

const setUserLocal = (user: any) => {
  localStorage.setItem(KEY_USER, JSON.stringify(user));
};

const setUserSession = (user: any) => {
  sessionStorage.setItem(KEY_USER, JSON.stringify(user));
};

const setTokenLocal = (token: string) => {
  localStorage.setItem(KEY_TOKEN, token);
};

const setTokenSession = (token: string) => {
  sessionStorage.setItem(KEY_TOKEN, token);
};

const setLocalClothing = (clothing: number[]) => {
  localStorage.setItem(KEY_CLOTHING, JSON.stringify(clothing));
};

const setLocalShoes = (shoes: number[]) => {
  localStorage.setItem(KEY_SHOES, JSON.stringify(shoes));
};

const getUser = () => {
  return get(KEY_USER);
};

const getToken = () => {
  return get(KEY_TOKEN);
};

const getLocalClothing = (): number[] => {
  return JSON.parse(get(KEY_CLOTHING));
};

const getLocalShoes = (): number[] => {
  return JSON.parse(get(KEY_SHOES));
};

const destroyToken = () => {
  destroy(KEY_TOKEN);
};

const destroyUser = () => {
  destroy(KEY_USER);
};

const destroyLocalClothing = () => {
  destroy(KEY_CLOTHING);
};

const destroyLocalShoes = () => {
  destroy(KEY_SHOES);
};

const destroyLocalShoeWithId = (id: number) => {
  const shoesFromStorage = localStorage.getItem("shoes")
  if (shoesFromStorage !== null) {
    const index = shoesFromStorage.indexOf(id.toString());
    shoesFromStorage.slice(index, 1);
    let array: number[] = JSON.parse(shoesFromStorage);
    let filteredArray = array.filter(shoeId => shoeId !== id);
    setLocalShoes(filteredArray);
  }
};

const destroyLocalClothesWithId = (id: number) => {
  const clothesFromStorage = localStorage.getItem("clothing")
  if (clothesFromStorage !== null) {
    const index = clothesFromStorage.indexOf(id.toString());
    clothesFromStorage.slice(index, 1);
    let array: number[] = JSON.parse(clothesFromStorage);
    let filteredArray = array.filter(clothesId => clothesId !== id);
    setLocalClothing(filteredArray);
  }
};

export {
  destroy,
  getToken,
  destroyToken,
  getUser,
  destroyUser,
  setUserSession,
  setUserLocal,
  setTokenSession,
  setTokenLocal,
  setLocalClothing,
  getLocalClothing,
  destroyLocalClothing,
  setLocalShoes,
  getLocalShoes,
  destroyLocalShoes,
  destroyLocalShoeWithId,
  destroyLocalClothesWithId
};
