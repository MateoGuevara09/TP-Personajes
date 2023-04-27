import config from "../dbconfig.js";
import sql from 'mssql'

class PersonajesService{
    getAll = async() => {
        let returnArray = null
        console.log('Personajeservice.getall')
        try{
            let pool = await sql.connect(config);
            console.log(pool)
            let result = await pool.request().query("SELECT * from Personajes")
            console.log(result)
            returnArray = result.recordesets[0]
        }
        catch(error) {
            console.log(error)
        }
        return returnArray
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
}
export default PersonajesService
