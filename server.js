const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express()



//Wichtig dies laesst dir teile deiner website zusammenbauen
hbs.registerPartials(__dirname+ '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
    var now = new Date().toString()
    const log = now +": "+ req.method + req.url;
    console.log(log);
    
    fs.appendFile('server.log', log + "\n", (err) => {
        if (err) {
            console.log(err);
            
        }
    })
    next();
})

app.use((req, res, next) => {
    res.render('maintenance.hbs');
})

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'Home Page',
        message: 'Welcome to my Webserver'
    })
})
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
})
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to respond to your request.'
    })
})
app.listen(3000, () => {
    console.log('Server is up');
    
})
