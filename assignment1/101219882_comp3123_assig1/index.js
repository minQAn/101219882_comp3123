// Name: Min Ku An, Student Number: 101219882

const express = require('express');
const app = express();
const router = express.Router();
const PORT = 3000;
const users = require('./users.json');


// "/" Home
app.get("/", (req, res) => {
    res.send("<h1>Welcome to my Assignment-1</h1></br>\
    <b>Name: Min Ku An, Student Number: 101219882</b>");
});

// "/user?uid=?" 
router.get("/user", (req, res) => {
    let req_uid = req.query.uid;
    let parsed_uid = parseInt(req_uid);
    
    //validations
    if(req_uid === undefined || req_uid.trim() === ""){
        res.send("Hello, Endpoint /user?uid=? (uid query is required)");
        return;
    };
    if(isNaN(parsed_uid)){
        res.send("Only Number Accepted.");
        return;
    };

    // FindById
    let user = users.find(user => user.id === parsed_uid);

    // if not found
    if(!user){
        let message = `No user found`;
        res.send(message);
        return;
    } 

    // to check
    console.log(user);

    // result
    res.send(user);
});

router.get("/users/all", (req, res) => {
    let all_users = users.map(user => user); // return a new array

    // ascending order
    let sorted_users = all_users.sort((a, b) => {
        if(a.username < b.username) return -1;
        if(a.username > b.username) return 1;
        if(a.username === b.username) return 0;
        else return -1; // to compare number and string
    });
        
    // to check
    // console.log(sorted_users);
    console.log(sorted_users.map(user => user.username));

    res.send(sorted_users);
});

// apply
app.use(router);

app.listen(PORT, () => {
    console.log("Server running at port " + PORT);
})