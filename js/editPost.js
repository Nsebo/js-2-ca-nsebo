import {getToken} from "./utils/storage";
import {EDIT_POST_URL} from "./settings/api";

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const accessToken = getToken();

const editPostForm = document.querySelector("#edit-post-form");
const postTitle = document.querySelector("#postTitle");
const postTitleError = document.querySelector("#postTitleError");
const postDescription = document.querySelector("#postDescription");
const postDescriptionError = document.querySelector("#postDescriptionError");

const postId = searchParam.get("post_id");

async function getPostById(){
  const response = await fetch(`https://nf-api.onrender.com/api/v1/social/posts/${postId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  });
  console.log(response);
  if (response.status === 200) {
    const data = await response.json();
    const {title, body, created, updated, id} = data;
    postTitle.value = title;
    postDescription.value = body;
  } else {
    const err = await response.json();
    throw err.message;
  }
}
getPostById().catch(err =>{
});

editPostForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let isPostTitle = false;
  if (postTitle.value.trim().length > 0) {
    postTitleError.classList.add("hidden");
    isPostTitle = true;
  } else {
    postTitleError.classList.remove("hidden");
  }

  let isPostDescription = false;
  if (postDescription.value.trim().length > 0) {
    postDescriptionError.classList.add("hidden");
    isPostDescription = true;
  } else {
    postDescriptionError.classList.remove("hidden");
  }

  let isFormValid = isPostTitle && isPostDescription;

  if (isFormValid) {
    const postData = {
      "title": postTitle.value,
      "body": postDescription.value
    };
    const accessToken = getToken();

    (async function editPost() {
      const response = await fetch(`${EDIT_POST_URL}/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(postData)
      })
      if (response.ok) {
        const data = await response.json();
        location.href = `single-post.html?post_id=${postId}`;
      } else {
        const err = await response.json();
        const message = "Editing post failed";
        throw new Error(message)
      }
      editPostForm.reset();
    })().catch(err => {
      console.log(err);
    });
  } else {
    console.log("Validation FAILED!! ");
  }
})