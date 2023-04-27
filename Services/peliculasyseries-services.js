import config from "../dbconfig.js";
import sql from 'mssql'

class peliculasyseriesservices{
    getAll = async() => {
        let returnArray = null
        console.log('peliculasyseriesservices.getall')
        try{
            let pool = await sql.connect(config);
            console.log(pool)
            let result = await pool.request().query("SELECT * from PeliculasYseries")
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
        console.log('peliculasyseriesservices.getbyid');
        try {
            let pool   = await sql.connect(config);
            let result = await pool.request()
                                .input('pId', sql.Int, id)
                                .query('SELECT * FROM PeliculasYseries WHERE id = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
}
export default peliculasyseriesservices