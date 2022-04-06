const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
import pkg from 'pg';

const { Pool } = pkg;

const config = {
    user: 'postgres',
    database: 'forms',
    password: 'salsichao123', //Coloca a senha do seu user do postres
    port: 5432
};
const pool = new Pool(config);

app.get('/getForms', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }

        client.query('SELECT * FROM public.forms ORDER BY id ASC', function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }

            let obj = result.rows;
            res.status(200).send(obj);
        })
    })
})

app.post('/postForms', async function insertCustomer(req, res) {
    const { name, email, phone } = req.body;
    const query = {
        text: 'INSERT INTO public.forms(name, email, phone) VALUES($1, $2, $3)',
        values: [name, email, parseInt(phone)]
    };

    try {
        await pool.query(query);
        res.status(200).send('Form inserted');
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
})

app.put('/putForms', async function updateCustomer(req, res) {
    const { id, name, email, phone } = req.body;
    const query = {
        text: 'UPDATE public.forms SET name = $1, email = $2, phone = $3 WHERE id = $4',
        values: [name, email, parseInt(phone), id]
    };

    try {
    await pool.query(query);
    res.status(200).send('Form updated');
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
})

app.delete('/deleteForms', async function deleteCustomer(req, res) {
    const { id } = req.body;
    const query = {
        text: 'DELETE FROM public.forms WHERE id = $1',
        values: [id]
    };

    try {
    await pool.query(query);
    res.status(200).send('Form deleted');
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
})

app.listen(8000, function () {
    console.log('Example app listening on port 8000!')
})