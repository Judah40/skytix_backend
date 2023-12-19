if(process.env.NODE_ENV !== 'production'){
    require('dotenv').toString()
}


const express = require('express');
const app = express();
const path = require('path');  
const cors = require('cors');
const mongoose = require('mongoose');
const bycript =require('bcrypt')
app.use(express.json())



mongoose.connect("mongodb://localhost:27017/SkyTix")
const db = mongoose.connection
db.on('error', err => console.error(err))
db.once('open',()=>console.log("connected"))
app.use(cors())

const User = []
app.get('/login',(req, res)=>{
res.json(User)
})


// resgister user  
app.post('/register',async (req, res) => {

    try {
        const hashedPasswords = await bycript.hash(req.body.password,10)
        console.log(hashedPasswords)
        const user = {email:req.body.email, password:hashedPasswords}
        User.push(user)
        res.status(200).send()
    } catch (error) {
        res.status(500).send()
    }
}
)


// login user
app.post('/login', async (req, res) => {
    const user = User.find(user=>user.email=req.body.email);
    if(user ==null) {
        return res.status(400).send('User does not exist')
    }
    try {
        if(await bycript.compare(req.body.password, user.password)){
            res.send('Sucess')
        }else{
            res.send("email or password mismatch")
        }
    } catch (error) {
        res.status(500).send()
    }
})
// local port 
app.listen(1000, ()=>{
    console.log("port connected")
})