const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()
 
var Publishable_Key = 'pk_test_51L5jUTKDBTdCPTSYBzaCWO0DYlwxh31CmkgCd1JDbOHE7dSzZS1x6lNHbY4nNuFNqyO733lv2yxMQXdSLiNN0ona003BkWhZGH'
var Secret_Key = 'sk_test_51L5jUTKDBTdCPTSYQn51NpbEyHkPv4UOlcsvSogK8MqnLAv0Keep4TOscOJDGMMxcWEGXvrSYTdBShgCGCReEclV00lVGwwgWA'
 
const stripe = require('stripe')(Secret_Key)
 
const port = process.env.PORT || 3000
 
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
 
// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
 
app.get('/', function(req, res){
    res.render('Home', {
    key: Publishable_Key
    })
})
 
app.post('/payment', function(req, res){
 
    // Moreover you can take more details from user
    // like Address, Name, etc from form
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Rabbit mart',
        address: {
            line1: 'Nasr city',
            postal_code: '110092',
            city: 'cairo',
            state: 'cairo',
            country: 'Egypt',
        }
    })
    .then((customer) => {
 
        return stripe.charges.create({
            amount: 70,    // Charing Rs 25
            description: 'Groceries',
            currency: 'USD',
            customer: customer.id
        });
    })
    .then((charge) => {
        res.send("Success") // If no error occurs
    })
    .catch((err) => {
        res.send(err)    // If some error occurs
    });
})
 
app.listen(port, function(error){
    if(error) throw error
    console.log("Server created Successfully")
})