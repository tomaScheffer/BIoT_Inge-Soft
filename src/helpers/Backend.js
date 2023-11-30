const express = require('express');
const sql = require('mssql');
const app = express();

//const PORT = 5173;

// Configuración de conexión a la base de datos
const config = {
    
    user: 'conex',
    password: 'adminadmin',
    server: 'localhost',
    database: 'ibonek',
};

// Ruta para obtener información del usuario mediante el stored procedure
//app.get('/api/obtenerInformacionUsuario/:nombreUsuario', async (req, res) => {
app.get('/api/obtenerInformacionUsuario', async (req, res) => {
    console.log('exito');
    /*try {
        await sql.connect(config);
        //const result = await sql.query(`EXEC ObtenerInformacionUsuario @NombreUsuario='${req.params.nombreUsuario}'`);
        const result = await sql.query("SELECT * FROM VW_USUARIOS");
        res.json(result.recordset);
        console.log(res);
    } catch (error) {
        console.error('Error al ejecutar el stored procedure:', error);
        res.status(500).send('Error interno del servidor');
    } finally {
        sql.close();
    }*/
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});