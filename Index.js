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
//buscarporidpelicula
app.get('/buscarpersonajeporidpelicula/:id',async (req,res) =>{
    const personaje = await svc1.getByIdPelicula(req.params.id);
    return res.status(200).json(personaje)
});
//buscarpornombre
app.get('/buscarpersonajepornombre/:nombre',async (req,res) =>{
    const personaje = await svc1.getByNombre(req.params.nombre);
    return res.status(200).json(personaje)
});
//buscarporedad
app.get('/buscarpersonajeporedad/:edad',async (req,res) =>{
    const personaje = await svc1.getByedad(req.params.edad);
    return res.status(200).json(personaje)
});
//server
app.listen(port,() =>{
    console.log('ESCUCHANDO PORT 5000')
})
//peliculas
app.get('/movies',async (req,res) =>{
    const peliculasyseries = await svc2.getIdImagenTituloFecha();
    return res.status(200).json(peliculasyseries);
})
//peliculas
app.get('/buscarpelipornombre/:nombre',async (req,res) =>{
    const peliculasyseries = await svc2.getByNombre(req.params.nombre);
    return res.status(200).json(peliculasyseries);
})