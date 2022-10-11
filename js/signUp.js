
import {API_BASE_URL, CREATE_USER_URL_ENDPOINT,LOGIN_USER_URL_ENDPOINT} from "./settings/api";


const form = document.querySelector("#signup");

const userName  = document.querySelector("#userName");
const userNameError = document.querySelector("#userNameError");

const email = document.querySelector("#email");
const emailErrorMessage = document.querySelector("#emailErrorMessage");
const emailErrorNotValid = document.querySelector("#emailErrorNotValid");

const password = document.querySelector("#password");
const passwordErrorMessage = document.querySelector("#passwordErrorMessage");

const confirmPassword = document.querySelector("#confirm_password");
const confirmPasswordError = document.querySelector("#confirmPasswordError");

const confirmPasswordErrorMessage = document.querySelector("#confirmPasswordErrorMessage");

const formErrorMessage = document.querySelector("#form-error-message");


form.addEventListener("submit", function(e){
    e.preventDefault();
    let isUserName = false;
    if(userName.value.trim().length > 0){
        userNameError.classList.add("hidden");
        isUserName = true;
    }else{
        userNameError.classList.remove("hidden");
    }

    let isEmail = false;
    if(email.value.trim().length > 0){
        emailErrorMessage.classList.add("hidden");
        isEmail = true;
    }else{
        emailErrorMessage.classList.remove("hidden");
    }

    let isValidEmail = false;
    if(email.value.trim().length && validateEmail(email.value) === true){
        emailErrorNotValid.classList.add("hidden");
        isValidEmail = true;
    }else if(email.value.trim().length && validateEmail(email.value) !== true){
        emailErrorNotValid.classList.remove("hidden");

    }

    let isPassword = false;
    if(password.value.trim().length >= 8){
        passwordErrorMessage.classList.add("hidden");
        isPassword = true;
    }else{
        passwordErrorMessage.classList.remove("hidden");
    }

    let isConfirmPassword = false;
    if (confirmPassword.value.trim().length >= 8) {
        confirmPasswordError.classList.add("hidden");
        isConfirmPassword = true;
    } else {
        confirmPasswordError.classList.remove("hidden");
    }
    let isConfirmPasswordErrorMessage = false;
    isConfirmPasswordErrorMessage = validatePassword();

    let isFormValid = isUserName &&
        isEmail &&
        isValidEmail &&
        isPassword &&
        isConfirmPassword &&
        isConfirmPasswordErrorMessage;
    if( isFormValid){

        console.log("validate SUCCEED ");

        const userData = {
            "name": userName.value,
            "email": email.value,
            "password": password.value,
        }
        console.log(userData);


        // API CALL
        console.log(LOGIN_USER_URL_ENDPOINT);


        (async function createUser() {
            const response = await fetch(`${CREATE_USER_URL_ENDPOINT}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                const data = await response.json();
                location.href = "../login.html";
            } else {
                const err = await response.json();
                const message = `Error: ${err.message}`;
                throw new Error(message);
            }
        })().catch((err) => {
            formErrorMessage.innerHTML = `${err.message}`;
        });
    } else {
        console.log("validation failed");
    }
});




function validateEmail(email){
    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/ ;
    console.log(regEx)
    if(email.match(regEx)){
        return true;
    }else {
        return false;
    }
}

function validatePassword(){
  const passwordValue = password.value;
  const confirmPasswordValue = confirmPassword.value;

    if(!passwordValue){
    return false
   }
   if(!confirmPasswordValue){
    return false;
    }


    if(passwordValue !== confirmPasswordValue){
      confirmPasswordErrorMessage.classList.remove("hidden");
      return false;
  }
  else{
      confirmPasswordErrorMessage.classList.add("hidden");
      return true;
  }
}