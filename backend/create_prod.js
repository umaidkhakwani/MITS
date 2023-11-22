const express= require('express');
const request = require('request');
const app = express();

const PORT = process.env.port || 5000
const shopify_api_key = '169f5d9abebdf0dfac8ddad34aa6c5bd'
const shopify_token_pass = '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'
const endpoint = 'products'


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

app.get('/new_product', (req, res) => {

    request(create_prod, function(error, response){
        if (error) throw new Error(error);
        res.send(response.body);
        console.log(response.body);
    });
});

app.listen(PORT, () => console.log(`listening on: ${PORT}`))


