import React, { Component } from "react";
import PokemonCard from "./PokemonCard";

export default class PokemonList extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.pokemon ? (
          <div className="row">
            {this.props.pokemon.map(pokemon => {
              if (this.props.input === "") {
                return (
                  <PokemonCard
                    key={pokemon.name}
                    name={pokemon.name}
                    url={pokemon.url}
                  />
                );
              } else if (
                pokemon.name.toLowerCase().startsWith(this.props.input)
              ) {
                return (
                  <PokemonCard
                    key={pokemon.name}
                    name={pokemon.name}
                    url={pokemon.url}
                  />
                );
              }
            })}
          </div>
        ) : (
          <h1>Loading Pokemon</h1>
        )}
      </React.Fragment>
    );
  }
}
