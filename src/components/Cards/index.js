import React from 'react';
import typeColors from '../../helpers/typeColors'

import './styles.css';

function Card({pokemon}) {
  return (
    <div className="card">
      <div className="card-section1">
        <div className="card-img">
          <img src={pokemon.sprites.front_default} alt=""/>
        </div>
        <div className="card-name">
          {pokemon.name}
        </div>
        <div className="card-types">
          {pokemon.types.map(type => {
            return (
              <div 
              className="card-type"
              style={{backgroundColor: typeColors[type.type.name] }}
              >
                {type.type.name}
              </div>
            )
          })}
        </div>
      </div>
      <div className="card-section2">
        <div className="card-data card-data-weight">
          <p className="title">Weight</p>
          <p>{pokemon.weight}</p>
        </div>
        <div className="card-data card-data-height">
          <p className="title">Height</p>
          <p>{pokemon.height}</p>
        </div>
        <div className="card-data card-data-ability">
          <p className="title">Ability</p>
          <p>{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;