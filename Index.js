import PersonajesService from "./Services/personajes-services.js"
import peliculasyseriesservices from "./Services/peliculasyseries-services.js"
//import { Express } from "express";

async function getAll(){
    let svc = new PersonajesService();
    let data = await svc.getAll();
    let svc2 = new peliculasyseriesservices();
    let data2 = await svc2.getAll();
    console.log(data)
    console.log(data2)
}
async function getbyid(){
    let svc = new PersonajesService();
    let data = await svc.getById(1);
    let svc2 = new peliculasyseriesservices();
    let data2 =  await svc2.getById(1);
    console.log(data)
    console.log(data2)
}
async function deleteByIdPersonaje(){
    let svc = new PersonajesService();
    let data = await svc.deleteById(3)
    console.log(data);
}
async function UPDATEPersonaje(){
    let svc = new PersonajesService();
    let data;
    let Personaje;
    Personaje = await svc.getById(3)
    if(Personaje != null){
        data = await svc.update(Personaje)
        console.log(data)
    }else{
        console.log('peronsaje');
        console.log(Personaje);
    }
}
async function deleteByIdPelicula(){
    let svc = new peliculasyseriesservices();
    let data = await svc.deleteById(7)
    console.log(data);
}
async function updatePelicula(){
    let svc = new peliculasyseriesservices();
    let data;
    let peliculasyseries;
    peliculasyseries = await svc.getById(5)

    if(peliculasyseries != null){
        data = await svc.update(peliculasyseries)
        console.log(data)
    }else{
        console.log('pelilculo');
        console.log(peliculasyseries);
    } 
}
await updatePelicula();