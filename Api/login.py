def singin(request, hashlib, connection_pool):
    email = request.form['email']
    password = request.form['password']
    
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    connection = connection_pool.get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT Email, Password FROM User WHERE Email = %s AND Password = %s", (email, hashed_password))
    existing_user = cursor.fetchone()

    cursor.close()
    connection.close()

    if existing_user:
        return True
    else:
        return False