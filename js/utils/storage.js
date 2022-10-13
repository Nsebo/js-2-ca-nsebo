const tokenKey = 'token';
const user = 'user';

function saveToken(token) {
  localStorage.setItem('token', token);
}

function getToken() {
  return getFromStorage(tokenKey);
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
function getFromStorage(key) {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value); // convert to JS
  } else {
    return [];
  }
}

export { getToken, saveToken, saveUser, getUserName };
