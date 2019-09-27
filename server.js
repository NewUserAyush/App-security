const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dbConfig = require('./configs/database.config.js');
const mongoose = require('mongoose');
const cors = require('cors');
const user_route = require('./user/user.routes.config');
let cookieParser = require('cookie-parser'); 
const fs=require('fs')
const tokengen=require('./token-handler/token.generator');
mongoose.Promise = global.Promise;
app.use(cors());
app.use(bodyParser.urlencoded({extende : true}));
app.use(bodyParser.json());
app.use(cookieParser()); 
app.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); 
app.use((req,res,next)=>{
    let notAuthenticatedpath=['/','/login']
    let token=req.cookies.userData+"."+req.cookies.privateToken;
    if(notAuthenticatedpath.indexOf(req.path)==-1 && !tokengen.verifyToken(token)){
        res.send("Invalid users");
        return;
    }
    next();
})
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) =>{
  
    fs.readFile('./UI/index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
});
 app.use('/user', user_route);

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
});