var validator = require('validator');
var users = require('../models').users;
var md5 = require('md5');

signUpMethods = module.exports = {
    create: async (req, res) => {
        try{
            if (req.body.name && req.body.email && req.body.password && req.body.re_enter_password) {
                var emailExists = await users.findAndCountAll({ where: { email: req.body.email}});
                if(emailExists.count == 0) {
                    if(req.body.password == req.body.re_enter_password){
                        const validData = await signUpMethods.validation(req.body);
                        if(validData){
                            var insertData = await users.create({
                                name: req.body.name,
                                email: req.body.email,
                                password: md5(req.body.password)
                            })
                            .catch( error => res.status(404).send({error: true, result: 'Something Went Wrong'}))
                            .then( resp => res.status(201).send({error: false, result: 'Success'}));
                        } else{
                            res.status(404).send({error: true, result: 'Please Enter Valid Details'});
                        }
                    } else {
                        res.status(404).send({error: true, result: 'Passwords are not Matching'});
                    }
                } else {
                    res.status(404).send({error: true, result: 'Email Already Exists'});
                }
            } else {
                res.status(404).send({error: true, result: 'Required Parameters are Missing'});
            }
        } catch (error) {
            res.status(500);
        }
    },

    validation: (body) => {
        return new Promise((resolve, reject) => {
            var nameValidation = validator.isAlpha(body.name.replace(/\s/g,''));
            var emailValidation = validator.isEmail(body.email);
            if(nameValidation && emailValidation){
                resolve(true);
            }else{
                resolve(false);
            }
        });
    }
}