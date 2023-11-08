import React, { useState } from 'react';

function Character(props) {
  const [isHomeworldVisible, setIsHomeworldVisible] = useState(false);

  const toggleHomeworld = () => {
    setIsHomeworldVisible(prevState => !prevState);
  };

  return (
    <div className="character-card" onClick={toggleHomeworld}>
      <h3 className="character-name">{props.name}</h3>
      {isHomeworldVisible && (
        <p className="planet-name">Planet: {props.homeworld}</p>
      )}
    </div>
  );
}

export default Character;
