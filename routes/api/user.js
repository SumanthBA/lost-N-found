const User  = require('../../models/user');
const JWT = require('jsonwebtoken');
const signToken = require('../../auth/signtoken');
const { JWT_SECRET } = require('../../auth/configurations');
let logger = require('logger').createLogger('development.log');
module.exports = {
    createUser: async(req, res, next) =>{
        let {email, password} = req.value.body;
        let foundUser = await User.findOne({ "local.email" : email });

        if(foundUser){
           return  res.status(403).send({error: 'email is already in use'});
        } 
        
        let newUser = new User({
            method: 'local',
            local: { 
                email: email, 
                password: password
            }
        });

        await newUser.save();
        const token = signToken(newUser, JWT_SECRET);
        res.status(200).json({ token, redirect: '/home'});
        
        logger.info(`Created User : ${userInstance.email} `);
        
    },
    googleOAuth : async(req, res, next)=>{
        const token = signToken(req.user, JWT_SECRET);
        res.status(200).json({ token, redirect: '/home'});
    },
    facebookOAuth : async(req, res, next)=>{
        const token = signToken(req.user, JWT_SECRET);
        res.status(200).json( {token, redirect: '/home'} );
    },
    signinUser: async(req, res, next) =>{
        const token = signToken(req.user, JWT_SECRET);
        res.status(200).json({ token, redirect: '/home'});
    }
};