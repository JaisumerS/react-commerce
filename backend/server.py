from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os

app = Flask ( __name__ )
CORS (app, origins =["http://example.com", "http://localhost:3000"])

def load_products():
    with open ('products.json', 'r') as f:
        return json.load(f)['products']
    
@app.route('/products' , methods =['GET'])
@app.route('/products/<int:product_id>', methods =['GET'])
def get_products (product_id = None):
    products = load_products()
    if product_id is None:
        return jsonify({"products": products})
    else:
        product = next((p for p in products if p ['id'] == product_id), None)
        return jsonify(product) if product else (' ', 404)

@app.route('/products/add', methods=['POST'])
def add_product():
    new_product = request.json
    products = load_products()
    new_product['id'] = len(products) + 1
    products.append(new_product)
    with open ('products.json', 'w') as f:
        json.dump({"products": products}, f)
    return jsonify(new_product), 201

@app.route ('/product-images/<path:filename>')
def get_image (filename):
    return send_from_directory('product-images', filename)

#This is just here to return the new updated json file, it basically rewrites the entire json
def save_products(products):
    with open('products.json', 'w') as f:
        json.dump({"products": products}, f)

@app.route('/products/update/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    updated_product = request.json
    products = load_products()
    for product in products:
        if product['id'] == product_id:
            product.update(updated_product)
            save_products(products)
            return jsonify(product), 200
    return '', 404

@app.route('/products/remove/<int:product_id>', methods=['DELETE'])
def remove_product(product_id):
    products = load_products()
    for i, product in enumerate(products):
        if product['id'] == product_id:
            del products[i]
            save_products(products)
            return '', 204
    return '', 404

if __name__ == '__main__':
    app.run(debug = True)