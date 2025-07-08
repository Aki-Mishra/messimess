let toggleBtn = document.querySelectorAll('.toggle-btn')
let yes = document.querySelectorAll(".yes")
let no = document.querySelectorAll(".no")
toggleBtn.forEach(toggleBtn => {
    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle("active");
        toggleBtn.classList.toggle("unactive")
       
        toggleBtn.querySelector(".yes").classList.toggle("invisible");
        toggleBtn.querySelector(".no").classList.toggle("invisible");
    })
})
window.print = function () {
    console.log("window.print() is disabled.");
  };