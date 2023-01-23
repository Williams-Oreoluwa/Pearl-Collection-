// Ensure we are working in developer mode not production mode

if (process.env.NODE_ENV !== "production") {

  require("dotenv").config();

}

// Paystack valuable keys

const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

const paystackPublicKey = process.env.PAYSTACK_PUBLIC_KEY;

const TestKey = process.env.TEST_KEY;

//Importing express library into our project

const express = require("express");

//Setting express as an instance

const app = express();

//Importing the fs library to read files

const fs = require("fs");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("", function (req, res) {

  fs.readFile("./items.json", "utf-8", function (err, data) {

    if (err) {

      console.log("Error occured");

      return;

    }

    res.render('index.ejs', {

        TestKey:TestKey,

        items:JSON.parse(data)

    })

  });

});

app.listen(3000);

// const express = require('express')

// const app = express()

// const port = 5000

// app.use(express.static('public'))

// app.set('view engine', 'ejs')

// app.get('', function(req, res){
//     res.render('index', {text: "This is ejs"})
// })

// app.listen(port, function(){
//     console.info(`listening for port ${port}`)
// })
