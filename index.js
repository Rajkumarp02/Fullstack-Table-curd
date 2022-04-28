const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require ("cors");



const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"crud_operation"

});



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded( { extended:false }));

app.get("/api/get", (req,res) => {
    const sql="select *from student_db";
    db.query(sql,(err,result)=>{
        res.send(result);
    });

});
app.post("/api/post",(req,res)=> {
    const{s_firstname,s_lastname,location,email,education} =req.body;
    const sqlInsert="insert into student_db(s_firstname,s_lastname,location,email,education) values(?,?,?,?,?)";
    db.query(sqlInsert,[s_firstname,s_lastname,location,email,education], (err,result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

app.delete("/api/remove/:id",(req,res)=> {
    const{ id } = req.params;
    const sqlRemove = 
            "delete from student_db where id= ?";
    db.query(sqlRemove,id, (err,result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});
 /* app.get("/api/get/:id", (req,res) => {
    
    const sql="select *from student_db where id =?";
    db.query(sql,id,(err,result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });

});  */

app.put("/api/update/:id", (req,res) => {
    
    const{id,s_firstname,s_lastname,location,email,education} = req.body;
    const sqlUpdate=`UPDATE student_db SET s_firstname=${s_firstname},s_lastname=${s_lastname},location=${location},email=${email},education=${education} WHERE id=${id}`;
    db.query(sqlUpdate,[s_firstname,s_lastname,location,email,education],(err,result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });

});




app.get("/",(req,res) => {
     const sql= "insert into student_db(s_firstname,s_lastname,location,email,education) values('Raja','p','madurai','raja22@gmail.com','B.E')"; 
    db.query(sql,(err,result) => {
        console.log(err);
        console.log(result);
        res.send("hi");
        
        
    }) 

    
})

app.listen(5000, () => {
    console.log("hi");
});