const fs   = require('fs');
const jwt  = require('jsonwebtoken');

var privateKEY  = fs.readFileSync(__dirname+'/../keys/private.key', 'utf8');
var publicKEY  = fs.readFileSync(__dirname+'/../keys/public.key', 'utf8');

var i  = 'Ayush corp';          // Issuer 
var s  = 'some@user.com';        // Subject 
var a  = 'http://ayushcorp.in'; // Audience

// SIGNING OPTIONS
var signOptions = {
 issuer:  i,
 subject:  s,
 audience:  a,
 expiresIn:  "2h",
 algorithm:  "RS256"
};

function generateToken(payload){
    var token = jwt.sign(payload, privateKEY, signOptions);
    return token;
}

function verifyToken(token){
       var legit = jwt.verify(token, publicKEY, signOptions);
       return legit;
}


module.exports={verifyToken,generateToken};
