function saveToken(token){
    localStorage.setItem("token", token)
}

function saveUser (user){
    localStorage.setItem("user", JSON.stringify(user));
}

function getUserName(){
    const user = localStorage.getItem("user");
    console.log(user);
    if(user){
        return JSON.parse(user)
    }

}

export {saveToken, saveUser, getUserName }
