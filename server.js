const express= require('express');
const request = require('request');
const cors = require('cors');


const app = express();
app.use(cors());
const PORT = process.env.port || 5000
const shopify_api_key = '169f5d9abebdf0dfac8ddad34aa6c5bd'
const shopify_token_pass = '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'
const endpoint = 'products'
const product_id = '8540355002668'


let get_prod ={
    'method': 'GET',
    'url': `https://${shopify_api_key}:${shopify_token_pass}@dummy-test-store-001.myshopify.com/admin/api/2023-07/${endpoint}.json
    `,
    'headers': {
        'Content-type':'application/json'
    }
};

let create_prod ={
    'method': 'POST',
    'url': `https://${shopify_api_key}:${shopify_token_pass}@dummy-test-store-001.myshopify.com/admin/api/2023-07/${endpoint}.json
    `,
    'headers': {
        'Content-type':'application/json'
    },
    body: JSON.stringify({
        "product":{
            "title":"Test product 1",
            "vendor": "dummy test store 001",
            "body_html": "<p>This is a test product 1</p>",
            "handle": "orange-snowboard",
            "id": "8527319761738",
            "product_type":"dummy product",
            "vendor":"dummy test store 001",
            "variants": [
                { 
                    "title": "Default Title", 
                    "price": "69.73", 
                    "inventory_quantity": 19,  
                }
            ],
        }
    })
};


let update_prod ={
    'method': 'PUT',
    'url': `https://${shopify_api_key}:${shopify_token_pass}@dummy-test-store-001.myshopify.com/admin/api/2023-07/${endpoint}/${product_id}.json`,
    'headers': {
        'Content-type':'application/json'
    },
    body: JSON.stringify({
        "product":{
            "id" : 8540160852268,
            "title":"Test product 2 updated",
            "vendor": "dummy test store 001",
            "body_html": "<p>This is a test product 2</p>",
        }
    })
};


let delete_prod ={
    'method': 'DELETE',
    'url': `https://${shopify_api_key}:${shopify_token_pass}@dummy-test-store-001.myshopify.com/admin/api/2023-07/${endpoint}/${product_id}.json`,
    'headers': {
        'Content-type':'application/json'
    }
};

app.get('/getdata', (req, res) => {

    request(get_prod, function(error, response){
        if (error) throw new Error(error);
        res.send(response.body);
        console.log(response.body);
    });
});


app.get('/create_product', (req, res) => {

    request(create_prod, function(error, response){
        if (error) throw new Error(error);
        res.send(response.body);
        console.log(response.body);
    });
});

app.get('/update_product', (req, res) => {

    request(update_prod, function(error, response){
        if (error) throw new Error(error);
        res.send(response.body);
        console.log(response.body);
    });
});

app.get('/delete_product', (req, res) => {

    request(delete_prod, function(error, response){
        if (error) throw new Error(error);
        res.send("successfully deleted");
        console.log(response.body);
    });
});



app.listen(PORT, () => console.log(`listening on: ${PORT}`))

// app.get('/', async (req, res) => {
//     const client = new shopify.Client({
//         apikey: shopify_api_key,
//         shopUrl: shopify_store_url,
//     });
//     const products = await shopify.Client.get('admin/products.json');
//     const productIds = [];
//     const quantities = [];
//     for (const product of products){
//         productIds.push(product.id);
//         quantities.push(product.quantity);
//         console.log(`${product}`);
//     }
//     res.json({
//         productIds: productIds,
//         quantities: quantities,
//     })
// })






