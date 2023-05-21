const express = require('express')
const app = express()

app.set('view-engine', 'ejs')  //not req i guess 
app.get('/', (req, resp) => {

    resp.render('index.ejs', { name: 'Ketan' })

})

app.get('/login', (req, res) => {
    res.render('login.ejs')

})

app.get('/register', (req, res) => {
    res.render('register.ejs')

})

app.post('/register', (req, res) => {


})

app.listen(3000)



https://www.youtube.com/watch?v=-RCnNyD0L-s&ab_channel=WebDevSimplified