const app = require('express')()
const bodyParser = require('body-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', (req, res) => {
  res.send('This is a tutorial App on creating my first USSD app in 5 mimutes or less')
});

app.post('*', (req, res) => {
  // Logic for 1 level response
  let response
  let { sessionId, serviceCode, phoneNumber, text } = req.body;
  if (text == '') {
    response = `CON What would you want to check
      1. My Account
      2. My Phone Number
    `;
    res.send(response);
  } else if (text === '1') {
    // logic for 1
    response = `CON Choose account information you want to view
    1. Account Number
    2. Account Balance
  `;
  res.send(response);
  } else if (text === '2') {
    // logic for 2
    response = `END Your Phone Number is ${phoneNumber}`;
    res.send(response);
  } else if (text = '1*1') {
    // if the user selected 1 in the first instance
    let accountNumber = 'B45000YT76899';
    response = `END Your Account Number is ${accountNumber}`;
    res.send(response)
  } else if (text == '1*2') {
    // if the user selected 2 in the first instance
    let balance = 'NGN 100,000';
    response = `END Your Account Balance is ${balance}`;
    res.send(response);
  } else {
    res.status(400).send('You No Dey See Well')
  }
});

app.listen(port, () => {
  console.log('Server Running, 3000')
});