const express = require('express');
const cartItems = express.Router(); 
const database = require('../connection');

cartItems.get('/', (req, res) => {
    database.query('SELECT * FROM shopping_cart').then(result => {
        res.send(result.rows);
    }, (error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

cartItems.get('/:id', (req, res) => {
    database.query(`SELECT * FROM shopping_cart WHERE id = ${req.params.id}`).then(result => {
        if (result.rows[0]) {
            res.send(result.rows);
        } else {
            res.sendStatus(404);
        }
    }, (error) => {
        console.log(error);
        res.sendStatus(500)
    });
});

cartItems.post("/", (req, res) => {
    database.query(
            `INSERT INTO shopping_cart (product, price, quantity) VALUES ('${req.body.product}', ${req.body.price}, ${req.body.quantity})`).then((result) => {
            res.send(result.rows);
        }, (error) => {
            console.log(error);
            res.sendStatus(500);
        });
});


cartItems.put('/:id', (req, res) => {
    database.query(`UPDATE shopping_cart SET product = '${req.body.product}', price = ${req.body.price}, quantity = ${req.body.quantity} WHERE id = ${req.params.id}`).then((result) => {
        if (result.rows) {
            res.send(result.rows)
        } else {
        res.sendStatus(404);
        }
    }, (error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

cartItems.delete('/:id', (req, res) => {
    database.query(`DELETE FROM shopping_cart WHERE id = ${req.params.id}`).then(result => {
        if (result) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});
});

cartItems.get('/:prefix', (req, res) => {
    database.query(`SELECT * FROM shopping_cart WHERE product LIKE '${req.params.prefix}%'`).then((result) => {
        res.send(result.rows) 
    }, (error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

cartItems.get('max-price/:maxPrice', (req, res) => {
    database.query(`SELECT * FROM shopping_cart WHERE price <= ${req.params.maxPrice}`).then((result) => {
        res.send(result.rows) 
    }, (error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

cartItems.get('/page-size/:pageSize', (req, res) => {
    database.query(`SELECT * FROM shopping_cart LIMIT ${req.params.pageSize}`).then((result) => {
        res.send(result.rows)
    }, (error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = cartItems; 