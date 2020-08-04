const express = require('express');
const app = express();

app.use(express.json());

//a static array consisting all products
let products = [
    {
        id: '1',
        product: 'milk'
    },
    {
        id: '2',
        product: 'bread'
    },
    {
        id: '3',
        product: 'meat'
    },
];

//'get' entry point to recive all products
app.get('/products', (req, res) => {
    res.send(products);
});

// 'get' entry point to recive an item by it's id
app.get('/products/:productID', (req, res) => {
    products.forEach(product => {
        if(product.id === req.params.productID) {
            res.send(product);
        }
    })
});

// 'post' entry point to add a new product to the list
app.post('/products', (req, res) => {
    let newProduct = {
        id: products.length + 1,
        product: req.body.product
    };
    products.push(newProduct);
    res.send(newProduct);
})

app.put('/products/:productID', (req, res) => {
    products.forEach((product, i) => {
        if(product.id === req.params.productID) {
            products[i] = req.body;
            res.send(req.body);
        }
    });
});

app.delete('/products/:productID', (req, res) => {
    products.forEach((product, i) => {
        if(product.id === req.params.productID) {
            products.splice(i, 1);
            res.send();
        }
    });
});


app.listen(3000);