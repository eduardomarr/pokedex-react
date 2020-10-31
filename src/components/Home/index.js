import React, {useState, useEffect} from 'react'

import './styles.css';

import Card from '../Cards/index';

import { getAllPokemons, getPokemon } from '../../services/api'

import Header from '../Header/index';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pageNext, setPageNext] = useState('');
  const [pagePrevious, setPagePrevious] = useState('');
  const [loading, setLoading] = useState(true);
  const initialURL = 'https://pokeapi.co/api/v2/pokemon/';

  useEffect(() =>{
    async function fetchData() {
      let response = await getAllPokemons(initialURL);
      setPageNext(response.next);
      setPagePrevious(response.previous);
      let pokemon = await loadingPokemon(response.results);
      console.log(pokemon);
      setLoading(false)
    }
    fetchData(); 
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemons(pageNext)
    await loadingPokemon(data.results)
    setPageNext(data.next);
    setPagePrevious(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    setLoading(true);
    let data = await getAllPokemons(pagePrevious)
    await loadingPokemon(data.results)
    setPageNext(data.next);
    setPagePrevious(data.previous);
    setLoading(false);
  }




  const loadingPokemon = async (data) => { 
    let _pokemon = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord
    }))

    setPokemons(_pokemon)
  }

  console.log(pokemons)
  return(
      <div className="home-content">
        <Header />
        <div className="buttons">
          <button onClick={prev}>Previous</button>
          <button onClick={next}>Next</button>
        </div>
        <div className="pokemon-list">
          { loading ? <h1>Loading...</h1> : (
            <> 
              <div className="grid-container">
                {pokemons.map((pokemon, i) => {
                  return <Card key={i} pokemon={pokemon} />
                })}
              </div>
            </>
          )}
        </div>
        <div className="buttons">
          <button onClick={prev}>Previous</button>
          <button onClick={next}>Next</button>
        </div>
      </div>
  )
}

export default Home;