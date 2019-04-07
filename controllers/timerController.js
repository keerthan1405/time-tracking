var timers = require('../models').timers;
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = {
    create: async (req, res) => {
        if(req.body.user_id && req.body.timer && req.body.description) {
            await timers.create({
                user_id: req.body.user_id,
                timer: req.body.timer,
                description: req.body.description
            })
                .catch( error => res.status(404).send({error: true, result: 'Something Went Wrong'}))
                    .then( resp => res.status(201).send({error: false, result: 'Success'}));
        } else {
            res.status(404).send({ error: true, result: "Required Parameters are Missing" });
        }
    },

    index: async (req, res) => {
        if(req.params.user_id && req.params.from_date && req.params.to_date){
            await timers.findAll({ where: { user_id: req.params.user_id, createdAt: {[Op.between]: [req.params.from_date, req.params.to_date]} }})
                .catch( error => res.status(404).send({error: true, result: 'Something Went Wrong'}))
                    .then( resp => res.status(201).send({error: false, result: resp}));
        } else {
            res.status(404).send({ error: true, result: "Required Parameters are Missing" });
        }
    },

    search: async (req, res) => {
        if(req.params.user_id && req.params.search_description) {
            await timers.findAll({ where: { user_id: req.params.user_id, description: {[Op.like]: '%' + req.params.search_description  + '%'}}})
                .catch( error => res.status(404).send({error: true, result: 'Something Went Wrong'}))
                    .then( resp => res.status(201).send({error: false, result: resp}));
        } else {
            res.status(404).send({ error: true, result: "Required Parameters are Missing" });
        }
    },

    delete: async (req, res) => {
        if(req.params.user_id) {
            var deleteData = await timers.destroy({ where: { user_id: req.params.user_id, id: req.params.timer_id }})
                .catch( error => res.status(404).send({error: true, result: 'Something Went Wrong'}))
                    .then( resp => res.status(201).send({error: false, result: resp}));
        } else {
            res.status(404).send({ error: true, result: "Required Parameters are Missing" });
        }
    }
}