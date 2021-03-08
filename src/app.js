const express = require("express");
const app = express();

const path = require("path");
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials")

//while showing database from register

app.use(express.json());
app.use(express.urlencoded({extended:false}));
// yup
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/register", (req, res)=>{
    res.render("register");
})

app.get("/login", (req, res)=>{
    res.render("login");
})

// create new user in database
app.post("/register", async(req, res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            const registerEmployee = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
            })
        const registered =    await  registerEmployee.save();
        res.status(201).render("login");
        }
        else{
            res.send("Invalid login credentials")
        }
    } 
    catch(error){
        res.status(400).send("Invalid login credentials");
    }
})


// login validation

app.post("/login", async(req,res)=>{
    try {
        const email = req.body.email;
        const password=req.body.password;
        
    const usermail = await Register.findOne({email:email});
    if(usermail.password===password){
        res.status(201).render("juma")
    }
    else{
        res.send("password is not matching");
    }

    } catch (error) {
        res.status(400).send("invalid email")
    } 
})


app.listen(port, ()=>{
    console.log(`server is running at port${port}`);
})

