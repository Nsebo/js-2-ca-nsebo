import { getToken } from "./utils/storage";
import { GET_POSTS_URL } from "./settings/api";
import moment from "moment";

let now = moment(new Date());

const myPostsContainer = document.querySelector("#myPostsContainer");

const postsNotification = document.querySelector("#postsNotification");

const accessToken = getToken();
if (!accessToken) {
  location.href = "../index.html";
}

(async function getAllPost(search) {
  const response = await fetch(GET_POSTS_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    const posts = await response.json();
    const listOfHtmlPosts = posts
      .map((item) => {
        const postTitle = item.title;
        const postBody = item.body;
        const createdDate = item.created;
        const mintueSinceCreated = now.diff(createdDate, "minute");
        console.log(createdDate);

        return `
          <li class="relative px-4 py-5 bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50">
  <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full p-4" src="/img/ayo.png" alt="Neil image">
                    </div>
                    <div class="flex justify-between space-x-3">
                        <div class="flex-1 min-w-0">
                            <a href="/single-post.html?post_id=${item.id}" class="block focus:outline-none">
                                <span class="absolute inset-0" aria-hidden="true"></span>
                                 <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
               ${postTitle}
              </p>
                            </a>
                        </div>
                    </div>
                    <div class="mt-1">
                       <p class="text-sm text-gray-500 truncate dark:text-gray-400">
               ${postBody}
              </p>
                    </div>
                  <time datetime="2021-01-27T16:35" class="flex-shrink-0 text-sm text-gray-400 whitespace-nowrap">${mintueSinceCreated} mintues
                            ago
                        </time>
                </li>
        
        
     `;
      })
      .join("");
    myPostsContainer.insertAdjacentHTML("beforeend", listOfHtmlPosts);
  } else {
    const error = await response.json();
    throw new Error(error);
  }
})().catch((error) => {
  console.log(error);
  console.log("GET POST FAILED");
});
