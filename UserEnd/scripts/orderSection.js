
let addedItemSection = document.querySelector(".addedItems");
let foodItems = document.querySelectorAll(".foodItem")
let addToCartBtns = document.querySelectorAll(".addtoCartBtn")
let totalPrice = document.querySelector('.totalPrice span')
let removefoodItemBtn;
addToCartBtns.forEach(btn => {

    btn.addEventListener("click", () => {
        let addedItems = document.querySelectorAll(".addedItem")
        removefoodItemBtn = document.querySelectorAll(".addedItem .removeBtn")

        if (addedItems.length > 10) {
            alert('maximum added lemit reached')
            return

        }
        let foodItem = btn.closest('.foodItem')
        let foodName = foodItem.querySelector('.foodName').innerHTML
        let price = foodItem.querySelector(".foodItemPrice span").innerHTML
        let orderItemHtml = ` <div class="addedItem" price="${price}">
                <p class="addedItemName">${foodName}</p>
                <button class="removeBtn"></button>
            </div>
            `
        addedItemSection.insertAdjacentHTML("beforeend", orderItemHtml)
        totalPrice.innerHTML = Number(totalPrice.innerHTML) + Number(price)
    })

})

addedItemSection.addEventListener('click', (e)=>{
   if(e.target.classList.contains('removeBtn')){
    let removeBtn = e.target
    let addedItem = removeBtn.closest(".addedItem")
   let price = addedItem.getAttribute('price');
   totalPrice.innerHTML = Number(totalPrice.innerHTML) - Number(price)
    addedItem.remove()
   }
})

