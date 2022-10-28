import { getToken } from "./utils/storage";
import { POST_PAGE_URL } from "./settings/api";

const postPageForm = document.querySelector("#post-page-form");

const postTitle = document.querySelector("#postTitle");
const postTitleError = document.querySelector("#postTitleError");

const editorPost = document.querySelector("#editorPost");
const editorPostError = document.querySelector("#editorPostError");

postPageForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let isPostTitle = false;
  if (postTitle.value.trim().length > 0) {
    postTitleError.classList.add("hidden");
    isPostTitle = true;
  } else {
    postTitleError.classList.remove("hidden");
  }

  let isEditorPost = false;
  if (editorPost.value.trim().length > 0) {
    editorPostError.classList.add("hidden");
    isEditorPost = true;
  } else {
    editorPostError.classList.remove("hidden");
  }

  let isFormValid = isPostTitle && isEditorPost;

  if (isFormValid) {
    const postData = {
      title: postTitle.value,
      body: editorPost.value,
    };

    const accessToken = getToken();
    (async function CreatePost() {
      const response = await fetch(POST_PAGE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        const data = await response.json();
        location.href = "/index.html";
      } else {
        const error = await response.json();
        const message = "creating post failed";
        throw new Error(message);
      }
      postPageForm.reset();
    })().catch((error) => {});
  } else {
  }
});
