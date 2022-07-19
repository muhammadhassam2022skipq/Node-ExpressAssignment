const express = require("express");
const app = express();
const fs = require ("fs");
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));

// creating express app


//condition for home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.post("/message", (req,res,next)=> {
   
    // console.log("post message is: "+m);
    fs.writeFileSync('message.txt', req.body.salaray);
    res.send("<h1> your response has been submitted </h1>")
    // res.redirect("/");
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})