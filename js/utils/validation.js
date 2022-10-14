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
    let password;
    const passwordValue = password.value;
    let confirmPassword;
    const confirmPasswordValue = confirmPassword.value;

    if(!passwordValue){
        return false
    }
    if(!confirmPasswordValue){
        return false;
    }


    if(passwordValue !== confirmPasswordValue){
        let confirmPasswordErrorMessage;
        confirmPasswordErrorMessage.classList.remove("hidden");
        return false;
    }
    else{
        let confirmPasswordErrorMessage;
        confirmPasswordErrorMessage.classList.add("hidden");
        return true;
    }
}

export {validateEmail, validatePassword}