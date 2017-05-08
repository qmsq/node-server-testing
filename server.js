const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    
    console.log(log);
    fs.appendFile('server.log', log+'\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next()
}); //middleware

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');    
// }) //Middleware is setup in the order it is written

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Jesus',
    //     likes: [
    //         'Being Good',
    //         'Not being curcified'
    //     ]

    // })
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: `Somebody once told me the world is gonna roll me.`
    })
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
});

// /bad -send back json
app.get('/bad', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    res.send({
        name: 'Tits',
        likes: [
            'Being Thcik',
            'Bouncing'
        ]

    })
});


app.listen(port, () => {
    console.log(`Server alive is on port ${port}`);
});