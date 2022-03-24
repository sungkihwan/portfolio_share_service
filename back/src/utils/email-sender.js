import nodemailer from 'nodemailer';

const mailSender = process.env.MAIL_SENDER;
const password = process.env.MAIL_PASSWORD;

// nodemailer 로 gmail transport 생성하기 
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: mailSender,
        pass: password,
    },
});

module.exports = (to, subject, text) => new Promise((resolve, reject) => {
    const message = {
        from: mailSender,
        to,
        subject,
        text,
    };
    
    transport.sendMail(message, (err, info) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(info);
    });
});