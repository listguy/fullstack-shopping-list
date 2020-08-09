const express = require('express');
const app = express();

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

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
    }
];

//'get' entry point to recive all products
// get: nothing
// return: products array
app.get('/products', (req, res) => {
    res.send(products);
});

// 'get' entry point to recive an item by it's id
// get: an id
// return: product object
app.get('/products/:productID', (req, res) => {
    products.forEach(product => {
        if (product.id === req.params.productID) {
            res.send(product);
        }
    })
});

// 'post' entry point to add a new product to the list
// get: json object with one key- product, and a string value(the product you want to add)
// return: new product object
app.post('/products', (req, res) => {
    let newProduct = {
        id: parseInt(products[products.length - 1].id) + 1 + "",
        product: req.body.product
    };
    products.push(newProduct);
    res.send(newProduct);
})

// 'put' entry point to update an existing product by id.
// get: a new product object 
// return: the updated product object
app.put('/products/:productID', (req, res) => {
    let index = FindIndexOfProduct(req.params.productID);
    if (index != undefined) {
        products[index].product = req.body.product;
        res.send(products[index]);
    }
});

// 'delete' entry point to delete an exsisting product by id.
// get: an id
// return: undefined
app.delete('/products/:productID', (req, res) => {
    let index = FindIndexOfProduct(req.params.productID);
    if (index != undefined) {
        products.splice(index, 1);
    }
    res.send();
});

// method finds and returns the index of the object with id of rpId
// get: an id
// return: index of object if it succeed, undefined else  
function FindIndexOfProduct(rpId) {
    let index;
    products.forEach((product, i) => {
        if (product.id === rpId) {
            index = i;
        }
    });
    return index;
};

app.listen(3000);