import config from "../dbconfig.js";
import sql from 'mssql'

class peliculasyseriesservices {
    //getAll
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
    //getById
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
    //delete
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
    update = async (PeliYSerie) => {
        let rowsAffected = 0;
        console.log('peliculasyseriesservices.update');
        try {
            var FechaCreacionmodif = new Date(1995,11,17);
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pimagen', sql.NVarChar(500), PeliYSerie?.Imagen ?? '')
                .input('ptitulo', sql.NVarChar(50), PeliYSerie?.Titulo ?? '')
                .input('pfechaDeCreacion', sql.Date, PeliYSerie?.FechaCreacion ?? null)
                .input('pcalificacion', sql.Int, PeliYSerie?.Calificacion ?? 0)
                .query(`UPDATE PeliculasYseries SET imagen = @pImagen, titulo = @pTitulo, fechaDeCreacion = @pFechaCreacion, calificacion = @pcalificacion WHERE Id = @pId`);
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}
export default peliculasyseriesservices