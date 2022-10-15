import '../style.css'
import {clearStorage} from "./utils/storage";
import createHeader from "./components/createHeader";

createHeader();

const logOutBtn = document.querySelector("#log-out-btn");



if(logOutBtn){
    logOutBtn.addEventListener("click", ()=>{
        console.log("i am clicked")
        clearStorage();
        window.location.replace("/login.html");
    })
}
