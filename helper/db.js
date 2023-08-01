const mysql = require("mysql2");


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database : "naturalsPOS",
})
connection . connect ((err)=>{
    if(err){
        console.log("Error while Connecting DB",err)
    }
    else{
        console.log("DB Connected Successfully!!!")
    }
})

module.exports = connection;