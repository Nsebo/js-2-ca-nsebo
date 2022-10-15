import {GET_USER_POSTS_URL} from "./settings/api";
import {getToken} from "./utils/storage";


console.log("GET_USER_POSTS_URL:", GET_USER_POSTS_URL);

const myPostsContainer = document.querySelector("#myPostsContainer");
const accessToken = getToken();
console.log(myPostsContainer);
console.log(accessToken);

