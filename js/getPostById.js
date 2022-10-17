import {getToken} from "./utils/storage";
import {GET_POST_BY_ID_URL, GET_USER_POSTS_URL} from "./settings/api";

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const postId = searchParam.get("post_id");
const accessToken = getToken();
const postDetails = document.querySelector("#postDetails");

async function getPostById() {
const response = await fetch(`${GET_POST_BY_ID_URL}/${postId}`, {
    method: "GET",
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
})

    const data = await response.json();
    const title = data.title;
    const body = data.body;
    const id = data.id;
    postDetails. innerHTML = `
    
    <ul>
  <li>Title: ${title}</li>
    <li>Body: ${body}</li>
    <li>Id: ${id}</li>
   </ul>`

}
getPostById()