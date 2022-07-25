const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');
dotenv.config();

app.use(cors());
app.use(express.json());

app.listen(process.env.port || 8080, () => {
    console.log("port is ready")
})

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.username,
    password: process.env.password,
    database: process.env.database,
    port: process.env.db_port
})

db.connect((err)=> {
    if(err){
        console.log(err.message)
    }
    console.log("aws sucess")
})

app.get('/products', (req,res) => {
    db.query('select * from products', (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.get('/titlelowtohigh', (req,res) => {
    db.query('select * from products order by title asc', (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.get('/titlehightolow', (req,res) => {
    db.query('select * from products order by title desc', (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})