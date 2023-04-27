import config from "../dbconfig.js";
import sql from 'mssql'

class PersonajesService{
    getAll = async () => {

        let returnArray = null;
    
        console.log('Estoy en: PizzaService.getAll()');
    
        try {
    
            let pool   = await sql.connect(config);
    
            let result = await pool.request().query("SELECT * from Personajes");
    
            returnArray = result.recordsets[0];
    
        }
    
        catch (error) {
    
            console.log(error);
    
        }
    
        return returnArray;
    
    }
    getById = async (id) => {
        let returnEntity = null;
        console.log('Personajeservice.getbyid');
        try {
            let pool   = await sql.connect(config);
            let result = await pool.request()
                                .input('pId', sql.Int, id)
                                .query('SELECT * FROM Personajes WHERE id = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    deleteById = async (id) => {
        let rowsAffected = 0;
        console.log('Personajeservice.deleteById');
        try {
            let pool   = await sql.connect(config);
            let result = await pool.request()
                                .input('pId', sql.Int, id)
                                .query('DELETE FROM Personajes WHERE id = @pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
    update = async (Personaje) => {
        let rowsAffected = 0;
        console.log('Personajeservice.update');
//error con el varchar
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pImagen', sql.varchar(500) , Personaje?.imagen ?? '')
                .input('pNombre', sql.varchar(50)  , Personaje?.nombre ?? '')
                .input('pEdad'    , sql.Int , Personaje?.edad ?? 0)
                .input('pPeso', sql.Float , Personaje?.peso ?? 0)
                .imput('pHistoria', sql.varchar(500), Personaje?.historia ?? '')
                .input('pId'         , sql.Int   , Personaje?.Id ?? 0)
                .query(`UPDATE Personaje SET Imagen = @pImagen, Nombre = @pNombre, Edad = @pEdad, Peso = @pPeso, Historia = @pHistoria, Id = @pId`);
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}
export default PersonajesService
