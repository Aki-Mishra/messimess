import { response, handleResponse } from "./utilits.js"


let submitBtn = document.querySelector(".submit-btn")
let username = document.querySelector("#user-name")
let password = document.querySelector("#password")

submitBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    let data = {
        password: password.value,
        name: username.value
    }
     
   let result = await response('http://localhost:6969/loginAdmin', "POST", data)
   handleResponse(result, "http://localhost:6969/messSchedule")
})