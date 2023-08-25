
const shopify_api_key = '169f5d9abebdf0dfac8ddad34aa6c5bd'
const shopify_token_pass = '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'
const endpoint = 'orders'
const api_version = '2023-07'
const order_id = "5468910125356"


let get_orders ={
    'method': 'GET',
    'url': `https://${shopify_api_key}:${shopify_token_pass}@dummy-test-store-001.myshopify.com/admin/api/${api_version}/${endpoint}.json
    `,
    'headers': {
        'Content-type':'application/json'
    }
};

let create_order ={
    'method': 'POST',
    'url': `https://${shopify_api_key}:${shopify_token_pass}@dummy-test-store-001.myshopify.com/admin/api/${api_version}/${endpoint}.json
    `,
    'headers': {
        'Content-type':'application/json'
    },
    body: JSON.stringify({    
        "order": {
            "line_items":[
                {
                    "title": "test product order 2",
                    "price": 200,
                    "quantity": 5,
                    "tax_lines": [
                        {
                            "price": 10,
                            "rate": 1,
                            "title":"tax demo",
                        }
                    ]
                }
            ],
            "email": "testorder2@gmail.com",
            "tags":"good, best",
        }
    })
};


let update_order ={
    'method': 'PUT',
    'url': `https://${shopify_api_key}:${shopify_token_pass}@dummy-test-store-001.myshopify.com/admin/api/${api_version}/${endpoint}/${order_id}.json`,
    'headers': {
        'Content-type':'application/json'
    },
    body: JSON.stringify({    
        "order": {
            "id":5468743893292,
            "tags":"New Product, best seller",
        }
    })
};


let cancel_order ={
    'method': 'POST',
    'url': `https://${shopify_api_key}:${shopify_token_pass}@dummy-test-store-001.myshopify.com/admin/api/${api_version}/${endpoint}/${order_id}/cancel.json`,
    'headers': {
        'Content-type':'application/json'
    }
};

let delete_order ={
    'method': 'DELETE',
    'url': `https://${shopify_api_key}:${shopify_token_pass}@dummy-test-store-001.myshopify.com/admin/api/${api_version}/${endpoint}/${order_id}.json`,
    'headers': {
        'Content-type':'application/json'
    }
};


let create_webhook = {
    'method': 'POST',
    'headers':{

    }
}

const scheduled_get_orders = function() {
    return request(get_orders, function(error, response){
      if (error) throw new Error(error);
      return response.body;
    });
    
    request(get_orders, function(error, response){
        if (error) throw new Error(error);
        res.send(response.body);
        console.log(response.body);
    });
  };

module.exports={
    getOrders :get_orders,
    createOrder:create_order,
    updateOrder:update_order,
    deleteOrder:delete_order,
    cancelOrder:cancel_order
}
