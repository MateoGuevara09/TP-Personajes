import PersonajesService from "./Services/personajes-services.js"
import peliculasyseriesservices from "./Services/peliculasyseries-services.js"

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

await getAll()
await getbyid()