const nodemailer = require("nodemailer");
module.exports.sendMail = async (email,Subject,html) => {
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
          user:process.env.EMAIL_USER,
          pass:process.env.EMAIL_PASSWORD
        },
      });
      const emailOptions = {
        from: 'buidinhsang2806@gmail.com', // sender address
        to: email, // list of receivers
        subject: Subject, // Subject line
        html: html, // plain text body
      };
       transporter.sendMail(emailOptions,function(error,info){
        if(error){
            console.log(error)
        }
        else{
            console.log("Email send:"+info.response);
        }
       })

}