
let form = document.querySelector("#edit-meal-form")
let closeBtn = document.querySelector("#editFormCloseBtn")
let blurBackgroundBox = document.querySelector(".blurBackground")
let editBtns = document.querySelectorAll(".editBtn")
editBtns.forEach(editBtn =>{
   
   
    editBtn.addEventListener("click", (e)=>{
        let day= editBtn.previousElementSibling;
    let schedule=   editBtn.nextElementSibling;
    day = day.innerHTML.toLowerCase();
    
       console.log(day)
       console.log(schedule)
    })
})


closeBtn.addEventListener("click", ()=>{
    form.classList.add("invisible")
    blurBackgroundBox.classList.add("invisible")
})
