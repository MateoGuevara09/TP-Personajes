import config from "../dbconfig.js";
import sql from 'mssql'

class PersonajesService {
    //getall

    getAll = async () => {

        let returnArray = null;

        console.log('Estoy en: PERSONAJESERVIES.getAll()');

        try {

            let pool = await sql.connect(config);

            let result = await pool.request().query("SELECT * from Personajes");

            returnArray = result.recordsets[0];

        }

        catch (error) {

            console.log(error);

        }

        return returnArray;

    }
    //getbyid
    getById = async (id) => {
        let returnEntity = null;
        console.log('Personajeservice.getbyid');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('SELECT * FROM Personajes WHERE id = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    //getByNombre
    getByNombre = async (nombre) => {
        let returnEntity = null;
        console.log('Personajeservice.getByNombre');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pNombre', sql.NVarChar(50), nombre)
                .query('SELECT peliculapersonaje.id, Personajes.nombre, Personajes.imagen, Personajes.edad, Personajes.peso, Personajes.historia, PeliculasYseries.titulo FROM peliculapersonaje JOIN Personajes ON peliculapersonaje.fkPersonaje=Personajes.ID JOIN PeliculasYseries ON peliculapersonaje.fkPelicula=PeliculasYseries.Id where Personajes.Nombre = @pNombre')
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    //getByEdad
    getByedad = async (edad) => {
        let returnEntity = null;
        console.log('Personajeservice.getByNombre');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pEdad', sql.Int, edad)
                .query('SELECT peliculapersonaje.id, Personajes.nombre, Personajes.imagen, Personajes.edad, Personajes.peso, Personajes.historia, PeliculasYseries.titulo FROM peliculapersonaje JOIN Personajes ON peliculapersonaje.fkPersonaje=Personajes.ID JOIN PeliculasYseries ON peliculapersonaje.fkPelicula=PeliculasYseries.Id where Personajes.Edad = @pEdad')
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    //getnombreimagenid
    getNombreImagenId = async () => {
        let returnArray = null;

        console.log('Estoy en: PERSONAJESERVIES.nombreimagenid()');

        try {

            let pool = await sql.connect(config);

            let result = await pool.request().query("SELECT ID,Imagen,Nombre from Personajes");

            returnArray = result.recordsets[0];

        }

        catch (error) {

            console.log(error);

        }

        return returnArray;
    }

    //deletebyid
    deleteById = async (id) => {
        let rowsAffected = 0;
        console.log('Personajeservice.deleteById');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('DELETE FROM Personajes WHERE id = @pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
    //update!!!
    update = async (Personaje) => {
        let rowsAffected = 0;
        console.log('Personajeservice.update');
        try {
            var edad = 2
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pImagen', sql.NVarChar(500), Personaje?.Imagen ?? '')
                .input('pNombre', sql.NVarChar(50), Personaje?.Nombre ?? '')
                .input('pEdad', sql.Int, edad ?? 0)
                .input('pPeso', sql.Float, Personaje?.peso ?? 0)
                .input('pHistoria', sql.NVarChar(500), Personaje?.historia ?? '')
                .input('pId', sql.Int, Personaje?.ID ?? 0)
                .query(`UPDATE Personajes SET Imagen = @pImagen, Nombre = @pNombre, Edad = @pEdad, Peso = @pPeso, Historia = @pHistoria WHERE Id = @pId`);
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}
//getdetallespersonajes

export default PersonajesService
