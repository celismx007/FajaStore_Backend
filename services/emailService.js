import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()


let transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

const sendEmail = (email, user) => {
  const mailOptions = {
    to: email,
    subject: "Cuenta Creada",
    html: `<h1>Hola ${user.name}!</h1>
        <p>Bienvenido a MinerApp</p>
        <h3>Tus credenciales son:</h3>
        <h4>Usuario: ${user.username}</h4><h4>Password: ${user.password}</h4>`
  };
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export default sendEmail;