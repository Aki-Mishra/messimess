const input = document.querySelectorAll("input");
const userNameText = document.querySelector(".username-text");
const passwordText = document.querySelector(".password-text");
const elipsse = document.querySelector('.elipse')
const requestBtn = document.querySelector(".request-btn");
const formSection = document.querySelector(".form-section");
const requestForAnAccountSection = document.querySelector(".ask-to-request-for-an-account")
const requestForAccountForm = document.querySelector(".request-account-form-section")
const peopleEatingImage = document.querySelector('.people-eating-image');
const allBtn = document.querySelectorAll("button")
const goToLoginSection = document.querySelector(".go-to-login");
const peopleEatingPizza = document.querySelector(".people-eating-pizza-image")
console.log(peopleEatingPizza)

allBtn.forEach(btn=>{
    btn.addEventListener("click", (e)=>{
        e.preventDefault();
    })
})



// input effects
input.forEach(input=>{
    let text = input.nextElementSibling;
    input.addEventListener('focus', ()=>{
      text.classList.add('focus-username');
    })
    console.log(input.value)
    input.addEventListener('blur', ()=>{
        console.log(input.value === "")
        
        if(input.value === ""){
            console.log("inside if")
            text.classList.remove('focus-username')      
        }
    })
})


// Request button click effect
const requestBtnClicked  = () =>{
    formSection.classList.add("goAway");
    requestForAnAccountSection.classList.add("goAway");
    peopleEatingImage.classList.add("goAway");
    requestForAccountForm.classList.add('requestAccountSectionCome')
    goToLoginSection.classList.add("go-to-login-come");
    peopleEatingPizza.classList.add("people-eating-pizza-image-come");
    elipsse.classList.add("elipseLeft");

    setTimeout(()=>{
        formSection.classList.add("erase");
        requestForAnAccountSection.classList.add("erase");
        peopleEatingImage.classList.add("erase");
    }, 1000)
}
requestBtn.addEventListener("click",requestBtnClicked)
// requestBtnClicked()