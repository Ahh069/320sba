import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonName, setPokemonName] = useState('');

  async function fetchData() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

      if (!response.ok) {
        throw new Error("Cannot get Data");
      }

      const data = await response.json();
      const sprite = data.sprites.front_default;
      const pokemonInfo = {
        name: data.name,
        sprite: sprite,
        height: data.height,
        weight: data.weight,
        types: data.types.map(type => type.type.name)
      };
      setPokemonData(pokemonInfo);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
    <h1>Pokemon Library</h1>

      <input
        type="text"
        id="pokemonName"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
        placeholder="Enter Pokemon Name"
      />
      <button onClick={fetchData}>Fetch Pokemon</button><br />
      {pokemonData && (
        <div>
          <img src={pokemonData.sprite} alt="Pokemon Sprite" style={{ display: 'block' }} />
          <h2>{pokemonData.name}</h2>
          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
          <p>Types: {pokemonData.types.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default App;