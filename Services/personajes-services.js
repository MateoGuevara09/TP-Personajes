import config from "../dbconfig.js";
import sql from 'mssql'

class PersonajesService{
    getAll = async() => {
        let returnArray = null
        console.log('Personajeservice.getall')
        try{
            let pool = await sql.connect(config);
            let result = await pool.request().query("SELECT * from Personajes")
            returnArray = result.recordesets[0]
        }
        catch(error) {
            console.log(error)
        }
        return returnArray
    }
}
export default PersonajesService
