const express = require('express');
const sql = require('mssql');
const cors = require('cors'); // Importa la librería CORS para permitir solicitudes desde un dominio diferente
const app = express();
const PORT = 5000;

// Configura CORS
app.use(cors());

const config = {
   
    user: 'conex',
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
        const result = await sql.query('SELECT * FROM VW_USUARIOS');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).send('Error interno del servidor');
    } finally {
        sql.close();
    }
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});