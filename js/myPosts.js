import {getToken} from "./utils/storage";
import {GET_POSTS_URL} from "./settings/api";
import moment from "moment";

let now = moment(new Date());

const myPostsContainer = document.querySelector("#myPostsContainer");
console.log(myPostsContainer);
 console.log(GET_POSTS_URL);



const postsNotification = document.querySelector("#postsNotification");
 console.log(postsNotification)


const accessToken = getToken()
//if (!accessToken) {
  //  location.href = "../index.html";
//}
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
        const posts = await response.json();
        const listOfHtmlPosts = posts.map((item)=>{

            const postTitle = item.title;
            const postBody = item.body;

            return(`
    <li class="relative py-3 sm:py-4 bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50">
     <div class="max-w-2xl mx-auto">
 <div class="p-4 max-w-md bg-white rounded-lg   sm:p-8 dark:bg-gray-800 dark:border-gray-700">
  <div class="flow-root">
   <div class="flex items-center space-x-4">
           <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full p-4" src="/img/ayo.png" alt="Neil image">
                    </div>
            <div class="flex-1 min-w-0">
               <a href="/single-post.html?post_id=${item.id}" class="block focus:outline-none">
            <span class="absolute inset-0" aria-hidden="true"></span>
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
               ${postTitle}
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
               ${postBody}
              </p>
              </a>
            </div>
            
          </div>
        </li>
        
        
     `)
  }).join("");
      myPostsContainer.insertAdjacentHTML("beforeend", listOfHtmlPosts)
}else{
      const error = await response.json();
      throw new Error(error)
  }
})().catch(error =>{
 console.log(error);
 console.log("GET POST FAILED")
});