from asyncio import sleep
from flask import Flask, flash, jsonify, render_template, request, redirect, session, url_for
from flask_cors import CORS
import mysql.connector
from register import singup
from login import singin
from mysql.connector import pooling
import hashlib
from register import signup
from login import singin

app = Flask(__name__)
CORS(app)
app.config['MYSQL_HOST'] = 'db'
app.config['MYSQL_USER'] = 'user'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'TravelBookingDB'

dbconfig = {
    "host": app.config['MYSQL_HOST'],
    "user": app.config['MYSQL_USER'],
    "password": app.config['MYSQL_PASSWORD'],
    "database": app.config['MYSQL_DB'],
}
connection_pool = pooling.MySQLConnectionPool(pool_name="mypool", pool_size=5, **dbconfig)

@app.route('/api/data', methods=['GET'])
def get_data():
    # Replace this with actual data fetching logic
    data = {'message': 'Hello from Flask!'}
    return jsonify(data)


@app.route('/api/Airports', methods=['GET'])
def get_airports():
    connection_object = connection_pool.get_connection()
    cursor = connection_object.cursor()
    cursor.execute("SELECT * FROM airports")
    rows = cursor.fetchall()
    for row in rows:
        print(row)
    return jsonify(rows)

def get_data():
    connection_object = connection_pool.get_connection()
    cursor = connection_object.cursor()
    cursor.execute("SELECT * FROM airports")
    rows = cursor.fetchall()
    for row in rows:
        print(row)

def get_data2():
    connection_object = connection_pool.get_connection()
    cursor = connection_object.cursor()
    cursor.execute("SELECT * FROM flights")
    rows = cursor.fetchall()
    for row in rows:
        print(row)

@app.route('/api/signup', methods=['POST'])
def api_signup():
    # Obter os dados da requisição
    data = request.form

    # Processar os dados recebidos e chamar a função 'signup'
    result = signup(
        request, 
        hashlib, 
        connection_pool,
    )

    if result:
        # Cadastro bem-sucedido
        return jsonify({"success": True, "message": "User registered successfully"}), 201
    else:
        # Falha no cadastro
        return jsonify({"success": False, "message": "Registration failed"}), 400
    

@app.route('/api/login', methods=['POST'])
def api_login():
    # Obter os dados da requisição
    data = request.form

    # Chamar a função 'singin' com os dados de e-mail e senha
    login_successful = singin(
        request, 
        hashlib, 
        connection_pool
    )

    if login_successful:
        # Login bem-sucedido
        return jsonify({"success": True, "message": "Login successful"}), 200
    else:
        # Falha no login
        return jsonify({"success": False, "message": "Invalid email or password"}), 401

if __name__ == '__main__':
    get_data()
    get_data2()
    app.run(debug=True)