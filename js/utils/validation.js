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

export {validateEmail, validatePassword}