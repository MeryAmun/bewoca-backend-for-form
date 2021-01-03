const express = require('express');
const bodyParser =  require('body-parser');
const nodemailer = require('nodemailer');


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

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



