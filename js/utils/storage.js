const tokenKey = 'token';
const user = 'user';

function saveToken(token) {
  localStorage.setItem('token', token);
}

function getToken() {
  const myToken= getFromStorage('token');
  return myToken;
}

function saveUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function getUserName() {
  const user = localStorage.getItem('user');
  if (user) {
    console.log(user);
    return JSON.parse(user);
  } else return '';
}

function getFromStorage(localStorageKey) {
  const value = localStorage.getItem(localStorageKey);
  if (value) {
    return value;
  } else {
    return [];
  }
}
export { getToken, saveToken, saveUser, getUserName };
