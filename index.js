const express = require('express');
const bodyParser =  require('body-parser');
const cors = require('cors')
const mysql = require('mysql')
const nodemailer = require('nodemailer');
//const connect = require('./app')


const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function(req, res, next) {
    console.log('request', req.url, req.body, req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-token");
    if(req.method === 'OPTIONS') {
        res.end();
    }
    else {
        next();
    }
});

const pool = mysql.createPool({
    connectionLimit : 30,
    host: "localhost",
    user: "chebs",
    password: "",
    database: 'bewoca'
});




//Get comments 

app.get('/api/get', (req, res) =>{

    const sqlSelect = "SELECT * FROM comments";

    pool.getConnection((err) => {
        if(err){
            console.log("Erro connecting to Db", err);
            return;
        }
        console.log('Connection established');
    pool.query(sqlSelect, (err, rows) => {
        console.log(rows)
    })
    });

})



//post comments

app.post('/api/insert', (req, res) =>{
    const commentAuthor = req.body.commentAuthor
    const commentText = req.body.commentText

    const sqlInsert = "INSERT INTO comments (commentAuthor, commentText) VALUES (?,?);";

    pool.getConnection((err) => {
        if(err){
            console.log("Erro connecting to Db", err);
            return;
        }
        console.log('Connection established');
    pool.query(sqlInsert, [commentAuthor, commentText], (err, rows) => {
        console.log(rows)

        //connection.release()//return the connection to pool

        /////if(!err){
           /// res.send(rows)
//}else{
           // console.log(err)
       // }
    })
    });

})


//get a comment by id

app.get('/:id', (req, res) =>{


    pool.getConnection((err) => {
        if(err){
            console.log("Erro connecting to Db", err);
            return;
        }
        console.log('Connection established');
    pool.query('SELECT * FROM comments WHERE id = ?', [req.params.id], (err, rows) => {

        //connection.release()//return the connection to pool

        if(!err){
            res.send(rows)
        }else{
            console.log(err)
        }
    })
    });

})






app.post('/api/form/', (req, res) => {

    //res.render('/api/success',{htmlEmail: req.body})
    nodemailer.createTestAccount((err, account) =>{

  const htmlEmail =     `
  <h3>Contact Details</h3>

  <ul>

  <li>Title: ${req.body.title}</li>
  <li>Name: ${req.body.name}</li>
  <li>Email: ${req.body.email}</li>
  <li>Subject: ${req.body.subject}</li>

  </ul>
  <h3>Message</h3>

  <p>${req.body.message}</p>
  `

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'bewoca2@gmail.com',
        clientId: '678729998989-dvpl4qsf33t8ehnsijp1aorblm6358tc.apps.googleusercontent.com',
        clientSecret: 'Uhf-U8OsN-Q9_7c6g4iv8o8g',
        refreshToken: '1//04Zjs-J0c3VPICgYIARAAGAQSNwF-L9Irv4HeszMayrWIMB5yfANGFdRMGZY9qhT3-lXW9zX7pgXlwT32CKvqF0Tj8DXh9Hh8BQU',
        accessToken: 'ya29.a0AfH6SMCxUFR3BWI3XHAMsJOnsu1jdGRgx3aOvBVLMwH35KKSpszJI2s-gqrbmdZSEQfwVjOo8mzXd_OrTI4g-bq-udVbDpsL_KEQyS9dtlcll42BF-OiOrfDdLIu1Qd-CKfk5uyU2K-pelbQhE8CCvof2QqKkIp0BrbWR5M9Rqk'
    }
});

let mailOptions = {
    from: 'test@testaccoutn.com',
    to: 'bewoca2@gmail.com',
    replyto: 'test@testaccoutn.com',
    subject: req.body.subject,
    name: req.body.name,
    title: req.body.title,
    text: req.body.message,
    html:htmlEmail
}

transporter.sendMail(mailOptions, (err, info) => {
     if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
})
    })

})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {

    console.log('Server listening on port 5000')
})



