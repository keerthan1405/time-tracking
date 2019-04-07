var users = require('../models').users;
var md5 = require('md5');

module.exports = {
  create: async (req, res) => {
    if (req.body.email && req.body.password) {
        var validuser = await users.findAndCountAll({ where: {email: req.body.email, password: md5(req.body.password)}});
        if(validuser.count == 1){
            res.status(200).send({error: false, result: validuser});
        } else {
            res.status(404).send({ error: true, result: "Email and Password are not matching" });
        }
    } else {
        res.status(404).send({ error: true, result: "Required Parameters are Missing" });
    }
  }
};
