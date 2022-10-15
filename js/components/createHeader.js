import { getUserName } from '../utils/storage';

function createHeader() {
  const { pathname } = document.location;
  const navBar = document.querySelector('#nav-bar');
  console.log(navBar);

  const user = getUserName();
  const { name } = user;
  let authLink;
  if (user) {
    authLink = `
     <li class="p-8">
                <a href="/index.html" class="${
                  pathname === '/index.html'
                    ? 'hover:underline text-blue-600 '
                    : ''}">Home</a></li>
            <li class="p-8"><a href="/post-page.html" class="${
              pathname === '/post-page.html' ? 'hover:underline text-blue-600' : ''
            }">Create post</a></li>
            <li class="p-8"><a href="/single-post.html" class="${
        pathname === '/single-post.html' ? 'hover:underline text-blue-600' : ''
    }">My Posts</a></li> 
       <li class="p-8"> <span>Hello ${name}</span> </li>
`;
  } else {
    authLink = `  <li class="p-8"><a href="/signup.html" class="${
      pathname === '/signup.html' ? 'hover:underline text-blue-600 ' : ''
    }">SignUp</a></li>
            <li class="p-8"><a href="/login.html" class="${
              pathname === '/login.html' ? 'hover:underline text-blue-600' : ''
            }">Log In</a></li>
            `;
  }

  navBar.innerHTML = `
  <ul class="flex gap-x-4">
   ${authLink}
  </ul>  
  `;
}

export default createHeader;
