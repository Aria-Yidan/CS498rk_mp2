import React, { Component } from "react";
import PokemonList from "../pokemon/PokemonList";
import { Button, Grid, Image } from "semantic-ui-react";
import axios from "axios";

export default class Dashboard extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon/",
    pokemon: null,
    input: "",
    sortBy: "pokemonIndex",
    sequence: "asc",
    attack: ""
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data["results"] });
  }

  onChange = e => {
    this.setState({ input: e.target.value });
  };

  handleNameChecked = e => {
    this.setState({ sortBy: e.target.value });
    console.log("name", this.state.sequence, this.state.sortBy);
    if (this.state.sequence === "asc") {
      this.setState({
        pokemon: this.state.pokemon.sort((a, b) => (a.name < b.name ? -1 : 1))
      });
    } else {
      this.setState({
        pokemon: this.state.pokemon.sort((a, b) => (a.name > b.name ? -1 : 1))
      });
    }
  };

  handleIndexChecked = e => {
    this.setState({ sortBy: e.target.value });
    axios.get(this.state.url).then(res => {
      if (this.state.sequence === "asc") {
        this.setState({
          pokemon: res.data["results"]
        });
      } else {
        let reversedList = res.data["results"];
        reversedList.reverse();
        this.setState({ pokemon: reversedList });
      }
    });
  };

  handleAscendChecked = e => {
    this.setState({ sequence: e.target.value });
    console.log("ascend", this.state.sortBy);
    if (this.state.sortBy === "name") {
      this.setState({
        pokemon: this.state.pokemon.sort((a, b) => (a.name < b.name ? -1 : 1))
      });
    } else {
      axios.get(this.state.url).then(res => {
        this.setState({
          pokemon: res.data["results"]
        });
      });
    }
  };

  handleDescendChecked = e => {
    this.setState({ sequence: e.target.value });
    console.log("descend", this.state.sortBy);
    if (this.state.sortBy === "pokemonIndex") {
      axios.get(this.state.url).then(res => {
        let reversedList = res.data["results"];
        reversedList.reverse();
        this.setState({ pokemon: reversedList });
      });
    } else {
      this.setState({
        pokemon: this.state.pokemon.sort((a, b) => (a.name > b.name ? -1 : 1))
      });
    }
  };

  handleAll = e => {
    axios
      .get(this.state.url)
      .then(response => {
        const pokemon = response.data["results"];
        this.setState({ pokemon });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleLow = e => {
    let pokemon = [];
    axios
      .get(this.state.url)
      .then(response => {
        response.data["results"].map(each => {
          axios
            .get(each.url)
            .then(res => {
              let attack = "";
              res.data.stats.map(stat => {
                if (stat.stat.name === "attack") {
                  attack = stat["base_stat"];
                  if (parseInt(attack) >= 0 && parseInt(attack) <= 40) {
                    pokemon = [...pokemon, each];
                    console.log("current_results", pokemon);
                    this.setState({ pokemon: pokemon });
                  }
                }
              });
            })
            .catch(error => {
              console.log(error);
            });
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleMedium = e => {
    let pokemon = [];
    axios
      .get(this.state.url)
      .then(response => {
        response.data["results"].map(each => {
          axios
            .get(each.url)
            .then(res => {
              let attack = "";
              res.data.stats.map(stat => {
                if (stat.stat.name === "attack") {
                  attack = stat["base_stat"];
                  if (parseInt(attack) >= 41 && parseInt(attack) <= 70) {
                    pokemon = [...pokemon, each];
                    console.log("current_results", pokemon);
                    this.setState({ pokemon: pokemon });
                  }
                }
              });
            })
            .catch(error => {
              console.log(error);
            });
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleHigh = e => {
    let pokemon = [];
    axios
      .get(this.state.url)
      .then(response => {
        response.data["results"].map(each => {
          axios
            .get(each.url)
            .then(res => {
              let attack = "";
              res.data.stats.map(stat => {
                if (stat.stat.name === "attack") {
                  attack = stat["base_stat"];
                  if (parseInt(attack) >= 71 && parseInt(attack) <= 100) {
                    pokemon = [...pokemon, each];
                    console.log("current_results", pokemon);
                    this.setState({ pokemon: pokemon });
                  }
                }
              });
            })
            .catch(error => {
              console.log(error);
            });
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-4" />
          <p />
          <input
            className="form-control form-control-lg"
            type="text"
            name="value"
            placeholder="Pokemon name here!"
            value={this.state.value}
            onChange={this.onChange}
          />
        </div>
        <p />
        <div className="row">
          <div className="col-md-6">
            <input
              type="radio"
              value="name"
              checked={this.state.sortBy === "name"}
              onChange={this.handleNameChecked}
            />
            <span className="badge badge-info badge-pill mr-1">name</span>
          </div>
          <div className="col-md-6">
            <input
              type="radio"
              value="pokemonIndex"
              checked={this.state.sortBy === "pokemonIndex"}
              onChange={this.handleIndexChecked}
            />
            <span className="badge badge-info badge-pill mr-1">index</span>
          </div>
        </div>
        <p />
        <div className="row">
          <div className="col-md-6">
            <input
              type="radio"
              value="asc"
              checked={this.state.sequence === "asc"}
              onChange={this.handleAscendChecked}
            />
            <span className="badge badge-info badge-pill mr-1">ascending</span>
          </div>
          <div className="col-md-6">
            <input
              type="radio"
              value="desc"
              checked={this.state.sequence === "desc"}
              onChange={this.handleDescendChecked}
            />
            <span className="badge badge-info badge-pill mr-1">descending</span>
          </div>
        </div>
        <p />
        <div className="row">
          <Button.Group widths="5">
            <Button size="huge" color="grey" onClick={this.handleAll}>
              All
            </Button>
            <Button size="huge" color="grey" onClick={this.handleLow}>
              Attack: Low (0-40)
            </Button>
            <Button size="huge" color="grey" onClick={this.handleMedium}>
              Attack: Medium (41-70)
            </Button>
            <Button size="huge" color="grey" onClick={this.handleHigh}>
              Attack: High (71-100)
            </Button>
          </Button.Group>
        </div>
        <p />
        <div className="row">
          <div className="col">
            <PokemonList
              url={this.state.url}
              pokemon={this.state.pokemon}
              input={this.state.input}
              sortBy={this.state.sortBy}
              sequence={this.state.sequence}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
