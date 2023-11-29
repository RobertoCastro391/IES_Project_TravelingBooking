def signup(request, hashlib, connection_pool):
    # Adaptando para capturar os novos campos
    first_name = request.form['firstName']
    last_name = request.form['lastName']
    sex = request.form.get('sex')  # Pode ser nulo
    birth_date = request.form.get('birthDate')  # Pode ser nulo
    passport_number = request.form.get('passportNumber')  # Pode ser nulo
    nationality = request.form.get('nationality')  # Pode ser nulo
    email = request.form['email']
    password = request.form['password']
    locality = request.form['locality']
    street_address = request.form['streetAddress']
    postal_code = request.form['postalCode']
    city = request.form['city']
    country = request.form['country']
    card_number = request.form.get('cardNumber')  # Pode ser nulo
    card_pin = request.form.get('cardPIN')  # Pode ser nulo

    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    # Estabelecendo conexão com o banco de dados
    connection = connection_pool.get_connection()
    cursor = connection.cursor()

    # Verificando se o email já existe
    cursor.execute("SELECT Email FROM Users WHERE Email = %s", (email,))
    existing_user = cursor.fetchone()

    if existing_user:
        cursor.close()
        connection.close()
        return False
    else:
        # Inserindo o novo usuário
        query = """
            INSERT INTO Users (
                FirstName, LastName, Sex, BirthDate, PassportNumber, Nationality, Email, UserPassword,
                Locality, StreetAddress, PostalCode, City, Country, CardNumber, CardPIN
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
            )
        """
        values = (
            first_name, last_name, sex, birth_date, passport_number, nationality, email, hashed_password,
            locality, street_address, postal_code, city, country, card_number, card_pin
        )
        cursor.execute(query, values)
        connection.commit()
        cursor.close()
        connection.close()
        return True
