import {getUserName} from "../utils/storage";

const{name,email}=getUserName();

const API_BASE_URL = 'https://nf-api.onrender.com';
const CREATE_USER_URL = API_BASE_URL + '/api/v1/social/auth/register';
const LOGIN_USER_URL = API_BASE_URL + '/api/v1/social/auth/login';
const POST_PAGE_URL = API_BASE_URL + '/api/v1/social/posts';
const GET_POSTS_URL = API_BASE_URL + '/api/v1/social/posts';
const GET_USER_POSTS_URL = API_BASE_URL + `/api/v1/social/profiles/${name}?_posts=true`;
const DELETE_USER_POST_BY_ID = API_BASE_URL + "/api/v1/social/posts/"

export { API_BASE_URL, CREATE_USER_URL, LOGIN_USER_URL, POST_PAGE_URL, GET_POSTS_URL, GET_USER_POSTS_URL, DELETE_USER_POST_BY_ID };
