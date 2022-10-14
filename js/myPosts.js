import {getToken} from "./utils/storage";
import {GET_POSTS_URL} from "./settings/api";

const myPostsContainer = document.querySelector("#myPostsContainer");
console.log(myPostsContainer);
console.log(GET_POSTS_URL);

const accessToken = getToken()
console.log("accessToken:", accessToken);

(async function getAllPost(){
const response = await fetch(GET_POSTS_URL, {
    method: "GET",
    headers: {
  "Authorization":`Bearer ${accessToken}`
     }
  })
    console.log(response);


  if(response.ok){
    const myPosts = await response.json();
    console.log(myPosts);
}else{
      const error = await response.json();
      throw new Error(error)
  }
})().catch(error =>{
    console.log(error);
    console.log("GET POST FAILED")
});