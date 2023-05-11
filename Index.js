import PersonajesService from "./Services/personajes-services.js"
import peliculasyseriesservices from "./Services/peliculasyseries-services.js"
import  Express  from "express";
const app = Express();
const port = 5000;
const svc1 = new PersonajesService();
const svc2 = new peliculasyseriesservices()
//principal
app.get('/',async (req,res) =>{
    res.send("pone /characters para mostrar personajes o /movies para mostrar las peliculas")
})
//personajes
app.get('/characters',async (req,res) =>{
    const peliculasyseries = await svc1.getNombreImagenId();
    return res.status(200).json(peliculasyseries);
})
//app.get('/characters/:idpelicula'){
 //   const personaje = await svc1.getPersonajePorCaracteristica();
//}
app.get('/characters/:id',async (req,res) =>{
    const personaje = await svc1.getById(req.params.id);
    return res.status(200).json(personaje)
});
//server
app.listen(port,() =>{
    console.log('ESCUCHANDO PORT 5000')
})