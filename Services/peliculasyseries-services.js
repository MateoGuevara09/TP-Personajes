import config from "../dbconfig.js";
import sql from 'mssql'

class peliculasyseriesservices {
    getAll = async () => {
        let returnArray = null;
        console.log('***********get all de peliculas *********');

        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query("SELECT * from PeliculasYseries");
            returnArray = result.recordsets[0];
        }

        catch (error) {
            console.log(error);
        }

        return returnArray;

    }
    getById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: PizzaService.getById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('SELECT * FROM PeliculasYseries WHERE id = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    deleteById = async (id) => {
        let rowsAffected = 0;
        console.log('peliculasyseriesservices.deleteById');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('DELETE FROM PeliculasYseries WHERE id = @pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
    //update!!!
    update = async (Personaje) => {
        let rowsAffected = 0;
        console.log('peliculasyseriesservices.update');
        try {
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
export default peliculasyseriesservices