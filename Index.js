import PersonajesService from "./Services/personajes-services.js"
//import Peliculayserie from "../Models/PeliculasYseries";

async function getAll(){
    let svc = new PersonajesService();
    let data = svc.getAll();
       
}

getAll()