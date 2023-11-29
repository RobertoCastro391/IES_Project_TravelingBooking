from asyncio import sleep
from flask import Flask, flash, jsonify, render_template, request, redirect, session, url_for
from flask_cors import CORS
import mysql.connector
from mysql.connector import pooling

sleep(10)

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

if __name__ == '__main__':
    get_data()
    get_data2()
    app.run(debug=True)