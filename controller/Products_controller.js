const shopify_api_key = "1ad82ed2116c803c7f58f9667e7f72bb";
const shopify_token_pass = "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";
const endpoint = 'products'
const product_id = '8540355002668'
const store = "jagpowered"



let get_prod ={
    'method': 'GET',
    'url': `https://${shopify_api_key}:${shopify_token_pass}@${store}.myshopify.com/admin/api/2023-07/${endpoint}.json
    `,
    'headers': {
        'Content-type':'application/json'
    }
};

let create_prod ={
    'method': 'POST',
    'url': `https://${shopify_api_key}:${shopify_token_pass}@${store}.myshopify.com/admin/api/2023-07/${endpoint}.json
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
    'url': `https://${shopify_api_key}:${shopify_token_pass}@${store}.myshopify.com/admin/api/2023-07/${endpoint}/${product_id}.json`,
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
    'url': `https://${shopify_api_key}:${shopify_token_pass}@${store}.myshopify.com/admin/api/2023-07/${endpoint}/${product_id}.json`,
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
