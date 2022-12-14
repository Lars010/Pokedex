import { getPokemon, getSpecies } from "./api.js";
import { createChart } from "./charts.js"

const $image = document.querySelector('#image')
export function setImage(image) {
    $image.src = image
}

const $description = document.querySelector('#description')
function setDescription(text) {
    $description.textContent = text

}

const $screen = document.querySelector('#screen')
function loader(isLoading = false) {
    const img = isLoading ? 'url(./images/loading.gif)' : ''
    $screen.style.backgroundImage = img
}
const $light = document.querySelector('#light')
function speech(text) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en'
    speechSynthesis.speak(utterance)
    $light.classList.add('is-animated')
    utterance.addEventListener ('end', () => {
        $light.classList.remove('is-animated')
    })
}


export async function findPokemon(id) {
    
    try {

    const pokemon = await getPokemon(id)
    const species = await getSpecies(id)
    const description = species.flavor_text_entries.find((flavor) => flavor.language.name === 'en')
    const sprites = [pokemon.sprites.front_default]
    const stats = pokemon.stats.map(item => item.base_stat)
    for (const item in pokemon.sprites) {
        if(item !== 'front_default' && item !== 'other' && item !== 'versions' && pokemon.sprites[item]){
            sprites.push(pokemon.sprites[item])
        }
    }
    return {
        sprites,
        description: description.flavor_text,
        id: pokemon.id,
        name: pokemon.name,
        stats,
    };
} catch (e) {
    //solucionar por que no funciona el catch ahora
    return {
        description: 'Pokemon not found'
    }
}
} 

let activeChart = null
export async function setPokemon(id) {
    //prender loader
    loader(true)
    document.getElementById('pokemonNumber').value = id
    const pokemon = await findPokemon(id)
    //apagar loader
    loader(false)
    if (pokemon.sprites && pokemon.sprites.length > 0)
    setImage(pokemon.sprites[0])
    setDescription(pokemon.description)
    speech(`${pokemon.name}. ${pokemon.description}`)
    if (activeChart instanceof Chart) {
        activeChart.destroy()
    }
    activeChart = createChart(pokemon.stats)
    return pokemon
}
