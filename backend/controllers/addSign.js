const nodemailer = require('nodemailer');
//const hbs = require('nodemailer-express-handlebars');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.useremail,                   //this is the mail you have to use
    pass: process.env.userpass
  }
});

// transporter.use('compile',hbs({
//     viewEngine: 'express-handlebars',
//     viewPath: '../views'
//  }));
 
 


 
exports.sendMail = (uniqueId)=>{
        //const uniqueId = uniqueId;
        const url = 'http://localhost:3000/invite/' + uniqueId
        var mailOptions = {
        from: 'harshalb1101@gmail.com',
        to: 'harshalwprof@gmail.com',
        subject: 'Subject of the Mail',
        text: 'Helloo',
        html: `Hello, Please click on the link given to continue with the add sign process <a href= "${url}">${url}</a>`
        // attachments: [
        //     {filename:'Week3_L16.pdf',path:'./Week3_L16.pdf'}
        // ]
      };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}