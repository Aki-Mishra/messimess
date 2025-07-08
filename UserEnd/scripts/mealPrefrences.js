const nextMealToggleBtn = document.getElementById("next-meal-toggle");
const formItem2 = document.querySelector(".form-item-2")
const formItem3 = document.querySelector(".form-item-3")
const formItem4 = document.querySelector(".form-item-4")
const chapatiInput = document.querySelector("#chapati-input");
const areYouSickToggle = document.querySelector("#are-u-sick-toggle-btn");
const scheduleSubmitButton = document.querySelector("#scheduleSubmitBtn");
const getDayAndTime = () => {
    const date = new Date();
    let day = date.getDay();
    let time = date.getHours()
    time = Number(time)
    switch (day) {
        case 0: day = "sunday"
            break
        case 1: day = "monday"
            break;
        case 2: day = "tuesday"
            break
        case 3: day = "wednesday"
            break
        case 4: day = "thursday"
            break
        case 5: day = "friday"
            break
        case 6: day = "saturday"
            break
    }
    if (time < 9) {
        time = "breakFast"
    }
    else if (time >= 9) {
        time = "lunch"
    }
    else if (time >= 12) {
        time = "snacks"
    }
    else if (time >= 17) {
        time = "dinner"
    }
    return { day, time }
}
const day = getDayAndTime().day
const time = getDayAndTime().time
nextMealToggleBtn.addEventListener("click", async () => {
    let value = await nextMealToggleBtn.classList.contains("active");
    let toggleBtns = document.querySelectorAll(".form-item-2 .toggle-btn");
    if (!value) {
        // Deactivating all the buttons 
        toggleBtns.forEach(btn => {
            let buttonIsAcive = btn.classList.contains("active");
            let yes = btn.querySelector(".yes");
            let no = btn.querySelector(".no");
            if (buttonIsAcive) {
                btn.classList.remove("active");
                btn.classList.add("unactive");
                yes.classList.add("invisible")
                no.classList.remove('invisible')
            }
        })
        // Disabling the section to use
        formItem2.classList.add("disabled-section")
        formItem3.classList.add("disabled-section")
        // formItem4.classList.add("disabled-section")
        chapatiInput.value = ""
    }
    else if (value) {
        formItem2.classList.remove("disabled-section")
        formItem3.classList.remove("disabled-section")
        // formItem4.classList.remove("disabled-section")
    }
})
areYouSickToggle.addEventListener("click", () => {
    let value = areYouSickToggle.classList.contains("active");
    let dishSec = document.querySelectorAll('.dish-sec')
    console.log(value)
    console.log(dishSec);
    if (value) {
        dishSec.forEach(section => {
            section.classList.add("invisible")
        })
    }
    else if (!value) {
        dishSec.forEach(section => {
            section.classList.remove("invisible");
        })
    }
})
scheduleSubmitButton.addEventListener("click", async (e) => {
    e.preventDefault()
    console.log("i am clicked")
    let selectedSchedule = await getSelectedSchedule()
    try {
        let response = await fetch("http://localhost:6969/getSchedule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                selectedSchedule
            }),
            credentials: 'include'
        })
        console.log(response)
    } catch (error) {

    }
})
const fetchSchedule = async (day) => {
    let schedule = await fetch(`http://localhost:6969/fetchSchedule?day=${day}`)
    if (schedule.status === 200) {
        console.log("i am called")
        return schedule.json();
    }
    else if (schedule.status === 401) {
        console.log(error)
    }
}
const setSchedule = async (day, time) => {
    let scheduleArray = await fetchSchedule(day)
    scheduleArray = scheduleArray.success
    scheduleArray.forEach((schedule) => {
        if (schedule.mealTime === time) {
            console.log(schedule)
            if (schedule.mealTime === 'lunch' || schedule.mealTime === 'dinner') {
                console.log(schedule.meals[0])
                console.log(schedule.meals[1])
                let foodItem1 = document.querySelectorAll(`.foodItem1`)
                let foodItem2 = document.querySelectorAll(`.foodItem2`)
                foodItem1.forEach(elem => {
                    elem.textContent = toTitleCase(schedule.meals[0])
                })
                foodItem2.forEach(elem => {
                    elem.textContent = toTitleCase(schedule.meals[1])
                })

            }
            else {
                console.log(schedule.meals[0])
            }
        }

    })
}
setSchedule(day, time)

const getSelectedSchedule = async () => {
    let schedule;
    const isEating = nextMealToggleBtn.classList.contains("active")
    if (isEating) {
        const isSick = areYouSickToggle.classList.contains("active")
        if (!isSick) {
            let scheduleArray = await fetchSchedule(day)
            scheduleArray = scheduleArray.success
            scheduleArray.forEach(scheduleElem => {
                if (scheduleElem.mealTime === time) {
                    if (time === 'lunch' || time === 'dinner') {
                        schedule = {
                            isEating: isEating,
                            isSick: isSick,
                            mealTime: scheduleElem.mealTime,
                            day: day,
                            meals: {
                                meal1: document.getElementById('foodItem1').classList.contains("active"),
                                meal2: document.getElementById('foodItem2').classList.contains("active"),
                                rice: document.getElementById('foodItem3').classList.contains("active"),
                                chapati: Number(document.getElementById('chapati-input').value)
                            }

                        }
                    }
                    else {
                        schedule = {
                            isEating: isEating,
                            isSick: isSick,
                        }
                    }
                }
            })

        }
        else {
            schedule = {
                isEating: isEating,
                isSick: isSick,
                mealTime: time,
                day: day,
                meals: {
                    meal1: false,
                    meal2: false,
                    rice: false,
                    chapati: 0
                }

            }
        }
    }
    else {
         schedule = {
                isEating: isEating,
                isSick: false,
                mealTime: time,
                day: day,
                meals: {
                    meal1: false,
                    meal2: false,
                    rice: false,
                    chapati: 0
                }

            }

    }
    return schedule;
}


//  function for lowercase to capitalize 
function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}