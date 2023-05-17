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
    //getIdImagenTituloFecha
    getIdImagenTituloFecha = async() => {
        let returnArray = null;
        console.log('pizzaservicegetIdImagenTituloFecha');

        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query("SELECT Id,imagen,titulo,fechaDeCreacion from PeliculasYseries");
            returnArray = result.recordsets[0];
        }

        catch (error) {
            console.log(error);
        }

        return returnArray;
    }
      //getByNombre
      getByNombre = async (nombre) => {
        let returnEntity = null;
        console.log('Personajeservice.getByNombre');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pNombre', sql.NVarChar(50), nombre)
                .query('SELECT peliculapersonaje.id, PeliculasYseries.titulo, PeliculasYseries.imagen,PeliculasYseries.fechaDeCreacion,PeliculasYseries.calificacion, Personajes.nombre, Personajes.imagen, Personajes.edad, Personajes.peso, Personajes.historia FROM peliculapersonaje JOIN Personajes ON peliculapersonaje.fkPersonaje=Personajes.ID JOIN PeliculasYseries ON peliculapersonaje.fkPelicula=PeliculasYseries.Id where PeliculasYseries.titulo = @pNombre')
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
            var titulonuevo = 'tot'
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pimagen', sql.NVarChar(500), PeliYSerie?.Imagen ?? '')
                .input('ptitulo', sql.NVarChar(50), titulonuevo ?? '')
                .input('pfechaDeCreacion', sql.DateTime, PeliYSerie?.fechaDeCreacion ?? "1753-01-01")
                .input('pcalificacion', sql.Int, PeliYSerie?.Calificacion ?? 0)
                .input('pId', sql.Int, PeliYSerie?.Id ?? 0)
                .query(`UPDATE PeliculasYseries SET imagen = @pimagen, titulo = @ptitulo, fechaDeCreacion = @pfechaDeCreacion, calificacion = @pcalificacion WHERE Id = @pId`);
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}
export default peliculasyseriesservices