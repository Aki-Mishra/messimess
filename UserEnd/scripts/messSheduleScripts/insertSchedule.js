import { response } from "../utilits.js"


let mondayScheduleBox = document.querySelector("#monday")
let tuesdayScheduleBox = document.querySelector("#tuesday")
let wednesdayScheduleBox = document.querySelector("#wednesday")
let thurshdayScheduleBox = document.querySelector("#thurshday")
let fridayScheduleBox = document.querySelector("#friday")
let saturdayScheduleBox = document.querySelector("#saturday")
let sundayScheduleBox = document.querySelector("#sunday")





 const handleResponse = (response, scheduleBox)=>{
    if(response.success){
        let arr = response.success
        arr.forEach(element => {
            element.meals.forEach((meal, index)=>{
                let container  = scheduleBox.querySelector(`.${element.mealTime} .meal${index+1}`)
                meal = meal[0].toUpperCase() + meal.slice(1, meal.length)
                container.innerHTML = meal
            })
            
        });
    }
 }

const insert = async () => {
    // try {
       let mondaySchedule = await response("/fetchSchedule?day=", "GET", "monday").then(res => {  return res }).catch(err=>{ console.log(err)})
        let tuesdaySchedule = await response("/fetchSchedule?day=", "GET", "tuesday").then(res => { return res })
        let wednesdaySchedule =await response("/fetchSchedule?day=", "GET", "wednesday").then(res => { return res })
        let thurshdaySched =await response("/fetchSchedule?day=", "GET", "thurshday").then(res => { return res })
        let fridaySchedule = await response("/fetchSchedule?day=", "GET", "friday").then(res => { return res })
        let saturdaySchedule = await response("/fetchSchedule?day=", "GET", "saturday").then(res => { return res })
        let sundaySchedule = await response("/fetchSchedule?day=", "GET", "sunday").then(res => { return res })
    // 
        handleResponse(mondaySchedule, mondayScheduleBox)
        handleResponse(tuesdaySchedule, tuesdayScheduleBox)
        handleResponse(wednesdaySchedule, wednesdayScheduleBox )
        handleResponse(thurshdaySched, thurshdayScheduleBox)
       
        handleResponse(fridaySchedule, fridayScheduleBox)
        handleResponse(saturdaySchedule, saturdayScheduleBox)
        handleResponse(sundaySchedule, sundayScheduleBox)
    // } catch (error) {
    //     console.log(error)
    // }
  

}

insert()


