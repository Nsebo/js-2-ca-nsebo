import moment from "moment";
import {GET_USER_POSTS_URL, DELETE_USER_POST_BY_ID} from "./settings/api";
import {getToken} from "./utils/storage";

let now = moment(new Date())

const myPostsContainer = document.querySelector("#myPostsContainer");
const postsNotification = document.querySelector(".posts__notification");
const accessToken = getToken();

async function userPosts(){
    const response = await fetch(GET_USER_POSTS_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    
    if(response.ok){
        const jsonData = await response.json();
        myPostsContainer.innerHTML = "";
        const myPosts = jsonData.posts;
        if(!myPosts.length){
            postsNotification.innerHTML = "sorry you have no posts, create your first post now"
        }else{
            const numberOfPosts = myPosts.length;
            for(let i = 0; i < numberOfPosts;i++ ){

                myPostsContainer.innerHTML += `
             <li class="relative py-3 sm:py-4 bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50">
     <div class="max-w-2xl mx-auto">
    <div class="p-4 max-w-md bg-white rounded-lg   sm:p-8 dark:bg-gray-800 dark:border-gray-700">
       <div class="flex items-center space-x-4">
           <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full p-4" src="/img/ayo.png" alt="Neil image">
                    </div>
            <div class="flex-1 min-w-0">
            <span class="absolute inset-0" aria-hidden="true">Nsebo</span>
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
               ${myPosts[i].title}
              </p>
                 <div class="mt-1">
                      <p class="text-sm text-gray-500 truncate dark:text-gray-400">
               ${myPosts[i].body}
              </p>
                </div>
               <span>${myPosts[i].id}</span>
              <div class="flex gap-4">
             <button 
             data-id="${myPosts[i].id}"
             class="delete-post-btn  block bg-red-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-red-500 focus:outline-none focus:bg-red-500 focus:text-black focus:border-gray-500">
             Delete
            </button>
            <a href="/edit-post.html?post_id=${myPosts[i].id}" class="block bg-yellow-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-yellow-500 focus:outline-none focus:bg-yellow-500 focus:text-black focus:border-gray-500">Edit</a>
            </div>
          </div>
        
             
        </li>
            `
            }
        }
       // const  createdDate = myPosts.created;
       // const minutesSinceCreated = now.diff(created, "minute");

    }else{
        const error = await response.json();
    }
}
userPosts().then(()=>{
    handleDeleteBtnsEvents();

    })
    .catch((error)=>{

});
function handleDeleteBtnsEvents (){
    const deleteBtns = document.getElementsByClassName("delete-post-btn");
    const totalNumberOfDeleteBtns = deleteBtns.length;
    for(let i = 0; i < deleteBtns.length;i++){

        deleteBtns[i].addEventListener("click", function(){

            handleDeletePostById(this.dataset.id)
        })
    }
}

function handleDeletePostById (id){
    console.log("postId", id);
    const deleteUserById = async () => {
        try{
            let response = await fetch(`${DELETE_USER_POST_BY_ID}/${id}`, {
    method: "DELETE",
    headers:{
        "Authorization": `Bearer ${accessToken}`
    }
});
            if(response.status === 200){
                userPosts().then(()=>{
                    handleDeleteBtnsEvents();
                });
            }else{
                const err = await response.json();
                const errMessage = `something went wring ${err}`
                throw Error(errMessage)
            }
        }
        catch (error){
            console.log(error)

        }
    }
    deleteUserById().then(r => {
    });
}
