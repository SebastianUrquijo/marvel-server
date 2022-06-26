const express = require("express")
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

const app = express()

const {
    USER_EMAIL, USER_PASSWORD
  } = process.env;

app.name = "MarvelAPI"

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

app.get("/",(req,res)=>{
  res.status(200).send("Server Working")
})


app.post("/login",(req,res)=>{
    const {email,password} = req.body
    if(!email || !password) return res.status(200).send({msg:"Missing data"})
    if(email === USER_EMAIL && password === USER_PASSWORD){return res.status(200).send({msg:"Login success", data:{name:"Pedro",last_name:"Montana",email:"pepomon@mail.com"}},)}
    res.status(200).send({msg:"Email or Password does not match"})
})

app.listen(process.env.PORT || 3001,()=>{
    console.log("server running on Port",3001);
});