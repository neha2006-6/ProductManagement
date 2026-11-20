
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory product array
let products = [];
let nextId = 1;

// GET - Display all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// POST - Add a new product
app.post('/api/products', (req, res) => {
    const { name, price } = req.body;

    if (!name || price === undefined || price === '' || !Number.isFinite(Number(price)) || Number(price) < 0) {
        return res.status(400).json({ message: 'Enter a valid name and price' });
    }

    const product = {
        id: nextId++,
        name,
        price: Number(price)
    };

    products.push(product);
    res.status(201).json(product);
});

// PUT - Update product
app.put('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const { name, price } = req.body;

    if (!name || price === undefined || price === '' || !Number.isFinite(Number(price)) || Number(price) < 0) {
        return res.status(400).json({ message: 'Enter a valid name and price' });
    }

    product.name = name;
    product.price = Number(price);

    res.json(product);
});

// DELETE - Delete product
app.delete('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    products.splice(index, 1);
    res.json({ message: 'Product deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
