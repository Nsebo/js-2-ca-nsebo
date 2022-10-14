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
        console.log("posts", posts);
        const listOfHtmlPosts = posts.map((item)=>{
            console.log(item);
            const postTitle = item.title;
            const postBody = item.body;

            console.log(postTitle);
            console.log(postBody);
            return(`
     <li class="relative px-4 py-5 bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50">
           <div class="flex items-center mx-0 mt-2 mb-4 gap-3">
            <img
              class="h-8 w-8 rounded-lg"
              src="./img/image-jonathan.jpg"
              alt="jonathan"
            />
          </div>
           <div class="flex-1 min-w-0">
            <a href="#" class="block focus:outline-none">
             <span class="absolute inset-0" aria-hidden="true"></span>
              <p class="text-sm font-medium text-gray-900 truncate">${postTitle}</p>
               <p class="text-sm text-gray-500 truncate">${postBody}</p>
               </a>
                </div>
                </div>
               <div class="flex gap-12">
          </div>
        
          </li>
     `)
  }).join("")
      console.log("listOfHtmlPosts:", listOfHtmlPosts)
      myPostsContainer.insertAdjacentHTML("beforeend", listOfHtmlPosts)
}else{
      const error = await response.json();
      throw new Error(error)
  }
})().catch(error =>{
 console.log(error);
 console.log("GET POST FAILED")
});