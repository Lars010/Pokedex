const BASE_API = 'https://pokeapi.co/api/v2/'


export async function getPokemon(id){
    const response = await fetch(`${BASE_API}pokemon/${id}/`)
    if(response.status === 200) return await response.json();
    // const data = await response.json()
    //TAREA :validar Errores de tarea
    throw await response.text();
    // return data
    
} 
    

   


export async function getSpecies(id) {
    const response = await fetch(`${BASE_API}pokemon-species/${id}/`)
    if(response.status === 200) return await response.json();
    // const data = await response.json()
    //TAREA :validar Errores de tarea
    // return data
    throw await response.text();
}