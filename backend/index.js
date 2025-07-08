import express from "express"
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import cors from 'cors'

const __fileName = fileURLToPath(import.meta.url)  // import.meta.url = gives the url fo the current file and FleURLToPath convert it into convert it into path
const __dirname = path.join(path.dirname(path.dirname(__fileName)), 'UserEnd')  // getting the directry in which file exist


const app = express();
dotenv.config()

import path from "path"

app.use(express.static(__dirname))
app.use(cookieParser())
app.use(cors({
    credentials: true
}
))







// other Created files
import "./databaseConnection.js";
import createUserValidation from "./joi/creatingUserValidation.js"
import { User, Admin } from "./schema/userSchema.js"
import schedule from "./schema/scheduleSchema.js";
import { genToken, revToken } from "./jwt/jsonWebToken.js"
import adminAuthentication from "./auth/adminVerify.js"
import { genrateHashedPassord, comparePassword } from "./hashPassword/hashUtils.js";
import userVerify from "./auth/userverify.js";
import SelectedMeal from "./schema/selectedMealSchema.js";


// middelwares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


// path
// get request
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})
app.get('/isLogin', async (req, res) => {
    const token = req.cookies.messimessCookie; // or req.headers.authorization

    if (!token) {
        return res.status(401).json({ isAuthenticated: false });
    }

    try {
        let result = revToken(req.cookies.messimessCookie)
        if (result.error) {
            return res.status(401).json({ isAuthenticated: false });
        } else {
            let data = result.data
            let userData = await User.findById(data._id)
            if (!userData) {
                return res.status(401).json({ isAuthenticated: false });

            }
            return res.status(200).json({ isAuthenticated: true, userData: userData });
        }
    } catch (err) {
        return res.status(401).json({ isAuthenticated: false });
    }
});
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "logsin.html"))
})
app.get("/logout", (req, res) => {
    res.clearCookie("messimessCookie")
    res.redirect("/")
})
app.get("/adminLogin", (req, res) => {
    res.sendFile(path.join(__dirname, "adminLog.html"))
})
app.get("/loginAdmin", (req, res) => {
    console.log("request came")
    res.sendFile(path.join(__dirname, "adminLog.html"))
})
app.get("/messSchedule", adminAuthentication, (req, res) => {
    res.sendFile(path.join(__dirname, "messSchedule.html"))
})
app.get("/fetchSchedule", async (req, res) => {
    try {
        let { day } = req.query
        let sche = await schedule.find({ day: day })
        res.status(200).json({ success: sche })
        sche
    } catch (error) {
        console.log(error.message)
        // return res.status(404).json({error: })
    }

})
app.get("/todayMealPrefernce",)
// app.get("/admin", adminAuthentication, (req, res) => {
//     res.sendFile(path.join(__dirname, "messSchedule.html"))
// })
// Post Request

app.get("/mealPreferences", (req, res) => {
    res.sendFile(path.join(__dirname, "mealPrefrences.html"))

})
app.post("/createUser", async (req, res) => {
    try {
        let { name, password } = req.body;
        let hashedPassword;
        const validate = createUserValidation.validate(req.body)
        if (validate.error) {
            console.log(validate.error.message)
            res.send(validate.error.message)
        }
        else {
            hashedPassword = await genrateHashedPassord(password).then(res => {
                return res
            }).catch(err => {
                throw new Error(err)
            });
            password = hashedPassword
            let newUser = new User({ name, password });
            let save = await newUser.save().then(res => {
                return res
            }).catch(err => {
                let error = Object.values(err.errors)[0].message
                throw new Error(error)
            })
            res.send(save)
            return
        }
    } catch (err) {
        console.log(err)
        res.send(err.message)
    }
})
app.post("/login", async (req, res) => {
    try {
        console.log(req.body)
        let { name, password } = req.body;
        let user = await User.findOne({ name: name })
        if (!user) {
            res.status(401).json({ "error": "invalid credentials" })
        }
        else {
            let passwordCompare = await comparePassword(password, user.password)
            if (passwordCompare) {
                let token = genToken({ _id: user._id, name: user.name, password: user.password });
                res.cookie("messimessCookie", token, {
                    httpOnly: true,   // Ensures the cookie is not accessible via JavaScript
                    secure: false,    // Set to true if using HTTPS
                    sameSite: "Lax",  // Restricts sending cookies in cross-site requests
                    maxAge: 1 * 24 * 60 * 60 * 1000 // Cookie expires after 1 day
                });
                res.status(200).json({ "success": "login Successfull" })
            } else {
                res.status(401).json({ "error": "invalid credentials" })

            }
        }


    } catch (err) {
        res.status(500).json({ "error": "Internal Server Error" })
    }
})
app.post("/createAdmin", async (req, res) => {
    try {
        let { name, password } = req.body;
        let hashedPassword;
        const validate = createUserValidation.validate(req.body)
        if (validate.error) {
            console.log(validate.error.message)
            res.send(validate.error.message)
        }
        else {
            hashedPassword = await genrateHashedPassord(password).then(res => {
                return res
            }).catch(err => {
                throw new Error(err)
            });
            password = hashedPassword
            let newUser = new Admin({ name, password });
            let save = await newUser.save().then(res => {
                return res
            }).catch(err => {
                let error = Object.values(err.errors)[0].message
                throw new Error(error)
            })
            res.send(save)
            return
        }
    } catch (err) {
        console.log(err)
        res.send(err.message)
    }
})
app.post("/loginAdmin", async (req, res) => {
    try {
        console.log('ai')
        let { name, password } = req.body;
        console.log(name + "password is " + password)
        let admin = await Admin.findOne({ name: name })
        console.log(admin)
        if (!admin) {
            res.status(401).json({ "error": "invalid credentials" })
        }
        else {
            let passwordCompare = await comparePassword(password, admin.password)
            if (passwordCompare) {
                let token = genToken({ _id: admin._id, name: admin.name, password: admin.password });

                res.cookie("messimessCookie", token, {
                    httpOnly: true,   // Ensures the cookie is not accessible via JavaScript
                    secure: false,    // Set to true if using HTTPS
                    sameSite: "Lax",  // Restricts sending cookies in cross-site requests
                    maxAge: 24 * 60 * 60 * 1000 // Cookie expires after 1 day
                });
                res.status(200).json({ "success": "login Successfull" })
            } else {
                res.status(401).json({ "error": "invalid credentials" })

            }
        }


    } catch (err) {
        console.log(err)
        res.status(500).json({ "error": "Internal Server Error" })
    }
})
app.post("/createSchedule", async (req, res) => {
    try {
        let { day, mealTime, meals } = req.body;
        // converting values into lowercase
        day = day.toLowerCase()
        mealTime = mealTime.toLowerCase()
        console.log(meals)
        meals.forEach((element, index) => {
            meals[index] = meals[index].toLowerCase()
            console.log(meals[index])
        });

        let sched = new schedule({ day, mealTime, meals });
        let save = await sched.save().then(res => {
            console.log(res)
            return res
        }).catch(err => {
            console.log(err)
            return
        })
        res.send("successful")

    }
    catch (err) {
        console.log(err)
        res.send(err.message)

    }
})
app.post("/getSchedule", userVerify, async (req, res) => {
    try {
        let schedule = req.body.selectedSchedule
        let user = req.user
        schedule.studentId = user._id
        console.log(schedule)
        try {
            let newSchedule = new SelectedMeal(schedule)
            let saved = await newSchedule.save()
            if (saved) {
                res.status(200).json({ "message": "schedule created" })
            }

        }
        catch (error) {
            console.log(error)
            res.status(400).json({ "error": "invalid data" })
        }



    } catch (error) {
        console.log(error)
        res.status(500).json({ "error": "Internal Server Error" })
    }
})
// patch request 
// app.patch("/updateMeal", (req, res) => {

// })


app.listen(process.env.PORT, () => {
    console.log(`this is running on port http://localhost:${process.env.PORT}`);
})