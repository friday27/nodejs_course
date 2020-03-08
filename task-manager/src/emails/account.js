const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);

sgMail.send({
    to: 'yiyinghahalin@gmail.com',
    from: 'yiyinghahalin@gmail.com',
    subject: 'This is my sg mail test',
    text: 'Hope it works!'
});