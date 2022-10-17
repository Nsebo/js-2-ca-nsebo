import {getToken} from "./utils/storage";
import {GET_POST_BY_ID_URL, GET_USER_POSTS_URL} from "./settings/api";

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const postId = searchParam.get("post_id");
const accessToken = getToken();
console.log(accessToken)
const postDetails = document.querySelector("#postDetails");
console.log(postDetails);
async function getPostById() {
const response = await fetch(`${GET_POST_BY_ID_URL}/${postId}`, {
    method: "GET",
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
})
    console.log("response: ",response);
    const data = await response.json();
    console.log("data: ",data);
    const title = data.title;
    const body = data.body;
    const id = data.id;
    console.log(title);
    console.log(body);

    postDetails. innerHTML = `
    
    <ul>
  <li>title: ${title}</li>
    <li>body: ${body}</li>
    <li>id: ${id}</li>
   </ul>`

}
getPostById()