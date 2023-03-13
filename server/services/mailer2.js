// var Imap = require('node-imap');


const a =async()=>
{
    const connection = await imaps.connect(READ_MAIL_CONFIG);
    const box = await connection.openBox('INBOX');
    const searchCriteria = ['UNSEEN'];
    const fetchOptions = {
        bodies: ['HEADER', 'TEXT'],
        markSeen: false,
      };
    const results = await connection.search(searchCriteria, fetchOptions);
    console.log(results)
}

READ_MAIL_CONFIG = {
    imap: {
      user: '36214103129@mby.co.il', // email address
      password: 'Student@264', // password
      host: 'smtp.office365.com', // if you are using gmail service
      port: 587, // For gmail service, 465 for others
      authTimeout: 10000, // Stop retrying to read emails
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
    },
};