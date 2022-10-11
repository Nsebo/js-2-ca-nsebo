import {LOGIN_USER_URL} from "./settings/api";
import { saveToken} from "./utils/storage";

const loginForm = document.querySelector("#login-form");
const email = document.querySelector("#email");

const emailErrorMessage = document.querySelector("#emailErrorMessage");


const emailErrorNotValid = document.querySelector("#emailErrorNotValid");

const password = document.querySelector("#password");
const passwordErrorMessage = document.querySelector("#passwordErrorMessage");

const formErrorMessage = document.querySelector("#form-error-message");
if(loginForm){
    loginForm.addEventListener("submit", function(event){
        event.preventDefault();

        let isEmail = false;
        if(email.value.trim().length > 0){
            emailErrorMessage.classList.add("hidden");
            isEmail = true;
        }else{
            emailErrorMessage.classList.remove("hidden");
        }

        let isValidEmail = false;
        if (email.value.trim().length && validateEmail(email.value) === true) {
            emailErrorNotValid.classList.add("hidden");
            isValidEmail = true;
        } else if (email.value.trim().length && validateEmail(email.value) !== true) {
            emailErrorNotValid.classList.remove("hidden");
        }

        let isPassword = false;
        if(password.value.trim().length >= 8){
            passwordErrorMessage.classList.add("hidden");
            isPassword = true;
        }else{
            passwordErrorMessage.classList.remove("hidden");
        }

        let isFormValid = isEmail && isValidEmail && isPassword;

        if(isFormValid ){
            const userData = {
                "email": email.value,
                "password": password.value
            }

            // API CALL
            console.log(LOGIN_USER_URL);

            (async  function loginUser(){
                const response = await fetch(LOGIN_USER_URL, {
                    method: "POST",
                    headers: {
                        "content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                });
                if(response.ok){
                    const data = await response.json();

                    location.href = "../index.html";
                }else{
                    const err = await response.json();
                    throw new Error(err)
                }

            })().catch(error =>{
                formErrorMessage.innerHTML = `something went wronf ${error}`;
            });
        }else{
            console.log("validate failed")

        }
    });
}
function validateEmail(email){
    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/ ;
    console.log(regEx)
    if(email.match(regEx)){
        return true;
    }else {
        return false;
    }
}
