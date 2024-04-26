import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [pokemonSprite, setPokemonSprite] = useState('');
  const [pokemonName, setPokemonName] = useState('');

  async function fetchData() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

      if (!response.ok) {
        throw new Error("Cannot get Data");
      }

      const data = await response.json();
      const sprite = data.sprites.front_default;
      setPokemonSprite(sprite);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <input
        type="text"
        id="pokemonName"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
        placeholder="Enter Pokemon Name"
      />
      <button onClick={fetchData}>Fetch Pokemon</button><br />
      {pokemonSprite && <img src={pokemonSprite} alt="Pokemon Sprite" style={{ display: 'block' }} />}
    </div>
  );
}

export default App;