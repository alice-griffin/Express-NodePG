const express = require('express');
const port = 3000;
const app = express(); 
const cartItems = require('./routes/cart-items');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/cart-items', cartItems);

app.listen(process.env.PORT || 3000, () => console.log(`listening on ${port}`));