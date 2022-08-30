const joi = require('joi');
const database = require('./database');
const fileMgmt = require('../shared/fileMgmt');

const schema = joi.object({
    first_name: joi.string().required().min(2).max(200),
    last_name: joi.string().required().min(2).max(200),
    phone: joi.string().required().regex(/^[0-9]{8,11}$/),
    email: joi.string().required().regex(/^[^@]+@[^@]+$/),
});

module.exports = {

    addCustomer: async function (req, res, next) {
        const reqBody = req.body;



        const { error, value } = schema.validate(reqBody);

        if (error) {
            res.send(`error adding customer: ${error}`);
            return;
        }

        const sql =
            "INSERT INTO customers(first_name, last_name, phone, email)" +
            " VALUES(?,?,?,?);";

        try {
            const result = await database.query(
                sql,
                [value.first_name, value.last_name, value.phone, value.email]
            );

            value.id = result[0].insertId;
            res.json(value);
        }
        catch (err) {
            console.log(err);
            return;
        }


    },

    customersList: async function (req, res, next) {
        // const param = req.query;

        // const schema = joi.object({
        //     column: joi.string().valid('first_name', 'last_name', 'email').default('name'),
        //     sort: joi.string().valid('ASC', 'DESC').default('ASC'),
        // });

        // const { error, value } = schema.validate(param);

        // if (error) {
        //     console.log(error);
        //     res.status(400).send('add failed');
        //     return
        // }

        // const fieldsMap = new Map([
        //     ['first_name', 'customers.first_name'],
        //     ['last_name', 'customers.last_name'],
        //     ['email', 'customers.email'],
        // ]);

        const sql = `SELECT * FROM customers`;

        try {
            const result = await database.query(sql);
            res.json(result[0]);
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    },

    updateCustomer: async function (req, res, next) {
        const reqBody = req.body;
        const { id } = req.params;
        // http://localhost:3000/customers/:id

        const getCustomerSql =
            "SELECT * FROM `customers` WHERE id = ?"



        try {
            const found = await database.query(
                getCustomerSql,
                [id]
            );


            const updatedCustomer = {
                ...found[0][0],
                ...reqBody
            }

            delete updatedCustomer.id

            console.log(updatedCustomer);

            const { error, value } = schema.validate(updatedCustomer);

            if (error) {
                res.send(`error updating customer: ${error}`);
                return;
            }

            const sql =
                "UPDATE `customers` SET first_name = ?, last_name = ?, phone = ?, " +
                "email = ? WHERE id = ?" 

            const result = await database.query(
                sql,
                [value.first_name, value.last_name, value.phone, value.email, id]
            );

            res.json(id);
        }
        catch (err) {
            console.log(err);
            return;
        }
    },

    deleteCustomer: async function (req, res, next) {
        const { id } = req.params;

        try {
            const sql =
                "DELETE FROM `customers` WHERE id = ?" 

            await database.query(
                sql,
                [id]
            );

            res.json(id);
        }
        catch (err) {
            console.log(err);
            return;
        }
    },

    // todo: view more details of a customer
    viewCustomerDetails: async function (req, res, next) { },
}
