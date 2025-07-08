let hamburgerBtn = document.querySelectorAll(".hamburger-icons img")
let navbaritem = document.querySelector(".navbarUl")
let harmburgerMenuIcon = document.querySelector(".hamburger-menu")
let crossIcon = document.querySelector(".cross")
let loginBtn = document.querySelector("#loginBtn")
let logoutBtn = document.querySelector("#logoutBtn")
console.log(harmburgerMenuIcon)
console.log(crossIcon)
hamburgerBtn.forEach(btn=>{
    btn.addEventListener("click", ()=>{
    navbaritem.classList.toggle("right0")
    harmburgerMenuIcon.classList.toggle("invisible")
    crossIcon.classList.toggle("invisible")

    })
})

logoutBtn.addEventListener("click", ()=>{
   fetch("http://localhost:6969/logout")
})

window.onload = async () => {
    let response = await fetch("http://localhost:6969/isLogin")
    response = await response.json()
    console.log(response)
    if (response.isAuthenticated) {
        loginBtn.classList.add("invisible")
        logoutBtn.classList.remove("invisible")
    }
    else {
        login.classList.remove("invisible")
        logoutBtn.classList.add("invisible")
    }
}