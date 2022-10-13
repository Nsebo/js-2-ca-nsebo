import { getToken } from './utils/storage';
import { POST_PAGE_URL } from './settings/api';

const postPageForm = document.querySelector('#post-page-form');

const postTitle = document.querySelector('#postTitle');
const postTitleError = document.querySelector('#postTitleError');

const editorPost = document.querySelector('#editorPost');
const editorPostError = document.querySelector('#editorPostError');

console.log(postPageForm);
console.log(postTitle);
console.log(postTitleError);
console.log(editorPost);
console.log(editorPostError);

postPageForm.addEventListener('submit', function (event) {
  event.preventDefault();
  let isPostTitle = false;
  if (postTitle.value.trim().length > 0) {
    postTitleError.classList.add('hidden');
    isPostTitle = true;
  } else {
    postTitleError.classList.remove('hidden');
  }

  let isEditorPost = false;
  if (editorPost.value.trim().length > 0) {
    editorPostError.classList.add('hidden');
    isEditorPost = true;
  } else {
    editorPostError.classList.remove('hidden');
  }

  let isFormValid = isPostTitle && isEditorPost;

  if (isFormValid) {
    console.log('Validation SUCCEEDED!!  🥳');
    console.log(postTitle.value);
    console.log(editorPost.value);

    const postData = {
      title: postTitle.value,
      body: editorPost.value,
    };
    console.log(postData);
    const accessToken = getToken();
    console.log('accessToken:', accessToken);
    console.log('POST_PAGE_URL', POST_PAGE_URL);

    (async function CreatePost() {
      const response = await fetch(POST_PAGE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(postData),
      });
      console.log('post creation response:', response);
    })();
  } else {
    console.log('Validation FAILED!! 💩');
  }
});
