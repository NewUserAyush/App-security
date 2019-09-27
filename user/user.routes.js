
const User = require('./user.model');
const tokengen=require('../token-handler/token.generator');
exports.test = function(req, res){
  res.send("Hello, its working! i am from user post controller :)");
}

exports.register = function(req, res){
  let user = new User({
    name : req.body.name,
    password : req.body.password
  });

  user.save(function(err){
    if(err){
      console.log("failed to save user", err);
    }
    res.send("new user createed successfully");
  });
}

exports.getAllUser=function(req,res){
  //console.log(req.cookie.userData,req.cookie.privateData);
  User.find()
  .then(users=>res.send(users))
  .catch(err=>res.send(err));
}

exports.login = function(req, res){
  console.log(req.body.name,req.body.password);
    User.find({name:req.body.name,passowrd:req.body.password}, function(err, user){
        if(err) return next (err);
        res.header("Access-Control-Allow-Headers","*");
res.header('Access-Control-Allow-Credentials', true);
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
       let tokenParts=tokengen.generateToken({name:req.body.name}).split('.');
        res.cookie('userData',tokenParts[0]+'.'+tokenParts[1]);
        res.cookie('privateToken',tokenParts[2],{httpOnly:true,expires:0}).send("done");
    })
}
