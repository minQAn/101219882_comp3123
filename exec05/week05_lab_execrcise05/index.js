const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  const user = require('./user.json');
  res.send(JSON.stringify(user));
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req,res) => {
  const user = require('./user.json');
  let username = req.query.username;
  let password = req.query.password;
  let result = {};

  if(!username){
    res.send("This is login Louter");
    return;
  }

  if(user.username !== username){
    result = {
      status: false,
      message: "User Name is invalid"
    }
    res.send(JSON.stringify(result));
    return;
  }

  if(user.username === username && user.password !== password){
    result = {
      status: false,
      message: "Password is invalid"
    }
    res.send(JSON.stringify(result));
    return;
  }

  if(user.username === username && user.password === password){
    result = {
      status: true,
      message: "User Is Valid"
    };
    res.send(JSON.stringify(result));
    return;
  }

  res.send("SomeThing Wrong");
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req,res) => {
  const user = require('./user.json');
  let username = req.params.username;

  if(user.username === username){
    res.send(
      `<b>${username} successfully logout.</b>`
    );
    // res.end(); is needed when uses res.write();
    return;
  }

  res.send(`There is no '${username}' user`);
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));