const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const sql = require('mssql');
const cors = require('cors'); // Importa la librería CORS para permitir solicitudes desde un dominio diferente
const app = express();
const PORT = 5000;

// Configura CORS
app.use(cors());

// Use body-parser middleware
app.use(bodyParser.json()); // parse application/json

const config = {
   
    user: 'nodejs',
    password: 'adminadmin',
    server: 'localhost', 
    database: 'ibonek',
    stream: false,
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,

    },


};

app.get('/api/obtenerValoresDispositivo', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('EXEC SP_DISPOSITIVO_INSTANTANEO');
        res.json(result.recordset);
        console.log( result.recordset);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).send('Error interno del servidor');
    } finally {
        sql.close();
    }
});

app.get('/api/obtenerInformacionUsuario', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM dbo.Usuarios');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).send('Error interno del servidor');
    } finally {
        sql.close();
    }
});

app.post('/api/register', async (req, res) => {
    const { username, first_name, last_name, password } = req.body;

    try {
        // Connect to the SQL Server using the configured settings
        await sql.connect(config);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Execute an INSERT query to add a new user to the 'Usuarios' table with the hashed password
        const result = await sql.query`
            INSERT INTO dbo.Usuarios (username, first_name, last_name, password)
            OUTPUT INSERTED.user_id
            VALUES (${username}, ${first_name}, ${last_name}, ${hashedPassword});
        `;

        // Check if any rows were affected
        if (result.rowsAffected[0] === 0) {
            return res.status(500).json({ error: 'User registration failed' });
        }

        // Extract the user_id from the result
        const user_id = result.recordset[0].user_id;

        // Send a success response with user_id
        res.status(201).json({ message: 'User registered successfully', user_id });
    } catch (error) {
        // Handle errors, log them, and send a 500 status code as the response
        console.error('Error during user registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        // Ensure to close the SQL connection, whether there was an error or not
        sql.close();
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Connect to the SQL Server using the configured settings
        await sql.connect(config);

        // Execute a SELECT query to retrieve the user with the given username
        const result = await sql.query`
            SELECT user_id, username, password
            FROM dbo.Usuarios
            WHERE username = ${username};
        `;

        // Check if a user with the given username was found
        if (result.recordset.length === 0) {
            return res.status(401).json({ error: 'Invalid username' });
        }

        // Verify the password using bcrypt
        const user = result.recordset[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // If both username and password are valid, you can return a token or other authentication response
        res.status(200).json({ message: 'Login successful', username: user.username });
    } catch (error) {
        // Handle errors, log them, and send a 500 status code as the response
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        // Ensure to close the SQL connection, whether there was an error or not
        sql.close();
    }
});

app.delete('/api/deleteUser', async (req, res) => {
    const { username } = req.body;

    try {
        // Connect to the SQL Server using the configured settings
        await sql.connect(config);

        // Execute a DELETE query to remove the user with the given username
        const result = await sql.query`
            DELETE FROM dbo.Usuarios
            WHERE username = ${username};
        `;

        // Check if any rows were affected
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Send a success response
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        // Handle errors, log them, and send a 500 status code as the response
        console.error('Error during user deletion:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        // Ensure to close the SQL connection, whether there was an error or not
        sql.close();
    }
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});