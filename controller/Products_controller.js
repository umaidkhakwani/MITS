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
                    "sku": "29320",
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

module.exports={
    createProd: create_prod,
    getProd:    get_prod,
    updateProd: update_prod,
    deleteProd: delete_prod
}
