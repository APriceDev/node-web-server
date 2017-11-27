const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
const port = 8000;

app.set('view engine', 'hbs');
hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', txt => txt.toUpperCase());

// middleware functions
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', `${log}\n`, (err) => {
    if (err) {
      console.log('Unable to write to server.log');
    }
  });
  next();
});

// app.use((req, res) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(`${__dirname}/public`));

// register htttp route handlers
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'BPI',
    welcomeMessage: 'Welcome to BPI',
  });
  // send a string
  // res.send('<h1>Hello Express!</h1>');
  // send JSON object
  // res.send({
  //   name: 'BPI',
  //   likes: [
  //     'Biking',
  //     'Code',
  //   ],
  // });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});
app.get('/bad', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.send({
    errorMessage: 'Unable to handle request.',
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
