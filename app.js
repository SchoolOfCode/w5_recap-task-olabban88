const path = require('path');
const express = require('express');
const app = express();
const port = 5000;

app.use(express.static('public'));
app.use(express.json());

const cats = [
  {
    name: 'Poppy',
    human: 'Tim',
    hobby: 'screm',
  },
  {
    name: 'Tony',
    human: 'Liz.K',
    hobby: 'cling',
  },
  {
    name: 'Narla',
    human: 'Mell',
    hobby: 'obstruct',
  },
];

app.get('/', function (req, res) {
  res.sendFile(path.join(`${__dirname}/views/index.html`));
});

/* Your tasks for part 2a: 🔻 
- 👉 Add the code that tells your server which port to use (and add a console.log so 
that you know it's working!).
- 👉 Add requests handlers that "hook up" the code on the front end to the server so 
that you can see the cats already in your data above on your front end and add new 
cats from the form on the front end. */
