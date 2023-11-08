import React, { useState, useEffect } from 'react';
import axios from 'axios';

const urlPeople = 'http://localhost:9009/api/people';
const urlPlanets = 'http://localhost:9009/api/planets';

function App() {
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [visiblePlanets, setVisiblePlanets] = useState(Array(characters.length).fill(false));

  useEffect(() => {
    // Fetch data from the people API
    axios.get(urlPeople)
      .then(response => {
        // Extract character names from the API response and update the state
        const characterNames = response.data;
        setCharacters(characterNames);
      })
      .catch(error => {
        console.error('Error fetching characters:', error);
      });

    // Fetch data from the planets API
    axios.get(urlPlanets)
      .then(response => {
        // Extract planet names from the API response and update the state
        const planetNames = response.data;
        setPlanets(planetNames);
      })
      .catch(error => {
        console.error('Error fetching planets:', error);
      });
  }, []); // Empty dependency array means this effect runs once after the initial render

  const handleCharacterClick = (index) => {
    // Toggle the visibility state for the clicked character's planet name
    setVisiblePlanets(prevVisiblePlanets => {
      const updatedVisiblePlanets = [...prevVisiblePlanets];
      updatedVisiblePlanets[index] = !updatedVisiblePlanets[index];
      return updatedVisiblePlanets;
    });
  };

  return (
    <div>
      <h2>Star Wars Characters</h2>
      <p>See the README of the project for instructions on completing this challenge</p>
      <div>
        {characters.map((character, index) => (
          <div key={index} className="character-card" onClick={() => handleCharacterClick(index)}>
            <h3 className="character-name">{character.name}</h3>
            {visiblePlanets[index] && (
              <p className="planet-name">
                Planet: <span className="character-planet">{planets.find(planet => planet.id == character.homeworld).name}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App
