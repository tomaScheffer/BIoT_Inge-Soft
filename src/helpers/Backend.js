const express = require('express');
const sql = require('mssql');
const app = express();

const PORT = 3000;

// Configuración de conexión a la base de datos
const config = {
    
    user: 'TOMAS',
    password: '',
    server: 'localhost',
    database: 'tu_base_de_datos',
};

// Ruta para obtener información del usuario mediante el stored procedure
app.get('/api/obtenerInformacionUsuario/:nombreUsuario', async (req, res) => {

    try {
        await sql.connect(config);
        const result = await sql.query(`EXEC ObtenerInformacionUsuario @NombreUsuario='${req.params.nombreUsuario}'`);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al ejecutar el stored procedure:', error);
        res.status(500).send('Error interno del servidor');
    } finally {
        sql.close();
    }
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});