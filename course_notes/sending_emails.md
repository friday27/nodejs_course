# Sending Emails

Use [SendGrid](https://sendgrid.com/) to complete email sending function.

In the long term, you’ll want to purchase a custom domain and register it with SendGrid. This will increase your sending reliability.

* Install sendgrid npm module

      npm i @sendgrid/mail

* Create src/emails/account.js

      const sgMail = require('@sendgrid/mail');

      const sendgridAPIKey = '...';

      sgMail.setApiKey(sendgridAPIKey);

      sgMail.send({
        to: '...',
        from: '...',
        subject: 'This is my sg mail test',
        text: 'Hope it works!'
      });
