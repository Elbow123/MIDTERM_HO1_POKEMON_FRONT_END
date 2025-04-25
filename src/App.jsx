import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [generationFilter, setGenerationFilter] = useState("all");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    axios
      .get("https://localhost:7071/api/Pokemon")
      .then((response) => {
        setPokemons(response.data);
        setSearchResults(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error while loading data:", error);
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const filtered = pokemons.filter(pokemon =>
      pokemon.pokemonName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
    setSelectedPokemon(null);
    setLoading(false);
  };

  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value);
    setSelectedPokemon(null);
  };

  const handleGenerationFilterChange = (event) => {
    setGenerationFilter(event.target.value);
    setSelectedPokemon(null);
  };

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleBack = () => {
    setSelectedPokemon(null);
  };

  const filteredPokemons = searchResults.filter(pokemon => {
    const matchesType = typeFilter === "all" || pokemon.type.includes(typeFilter);
    const matchesGeneration = generationFilter === "all" || pokemon.generation === parseInt(generationFilter);
    return matchesType && matchesGeneration;
  });

  return (
    <div className="container-fluid">
      <h1 className="text-center text-warning py-4">

        Pokédex
    
      </h1>

      {!selectedPokemon && (
        <div className="row mb-4">
        <div className="col-sm-4">
          <div className="filter-section">
            <form onSubmit={handleSearchSubmit}>
              <h3><i className="fa fa-search"></i> Search Pokémon:</h3>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Pokémon..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button type="submit" className="search-btn">
                  <i className="fa fa-search"></i> Search
                </button>
              </div>
            </form>
          </div>
        </div>
      
        <div className="col-sm-4">
          <div className="filter-section">
            <h3><i className="fa fa-filter"></i> Filter by Type:</h3>
            <select
              className="form-control"
              value={typeFilter}
              onChange={handleTypeFilterChange}
            >
              <option value="all">All Types</option>
              <option value="Normal">Normal</option>
              <option value="Bug">Bug</option>
              <option value="Fire">Fire</option>
              <option value="Water">Water</option>
              <option value="Grass">Grass</option>
              <option value="Electric">Electric</option>
              <option value="Flying">Flying</option>
              <option value="Psychic">Psychic</option>
              <option value="Rock">Rock</option>
              <option value="Ground">Ground</option>
            </select>
          </div>
        </div>
      
        <div className="col-sm-4">
          <div className="filter-section">
            <h3><i className="fa fa-filter"></i> Filter by Generation:</h3>
            <select
              className="form-control"
              value={generationFilter}
              onChange={handleGenerationFilterChange}
            >
              <option value="all">Generation 1 and 2</option>
              <option value="1">Generation 1</option>
              <option value="2">Generation 2</option>
            </select>
          </div>
        </div>
      </div>
      )}      
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <div className="row">
        {selectedPokemon ? (
          <div className="col-sm-12 mb-4">
            <div className="card mx-auto" style={{ maxWidth: "400px" }}>
              <h4>{selectedPokemon.pokemonName}</h4>
              <img
                src={selectedPokemon.image || "https://via.placeholder.com/200"}
                alt={selectedPokemon.pokemonName}
                className="img-fluid"
              />
              <p>Base Evolution: {selectedPokemon.baseEvolution || "N/A"}</p>
              <p>Next Evolution: {selectedPokemon.nextEvolution || "N/A"}</p>
              <p>Generation: {selectedPokemon.generation || "N/A"}</p>
              <p>Type: {selectedPokemon.type || "N/A"}</p>
              <p>Height: {selectedPokemon.height || "N/A"}</p>
              <p>Weight: {selectedPokemon.weight || "N/A"}</p>
              <button className="mt-3" onClick={handleBack}>
                ← Back to List
              </button>
            </div>
          </div>
        ) : (
          filteredPokemons.length === 0 ? (
            <div className="col-12 text-center">No Pokémon found</div>
          ) : (
            filteredPokemons.map((pokemon) => (
              <div
                key={pokemon.pokemonID}
                className="col-sm-4 mb-4"
                onClick={() => handlePokemonClick(pokemon)}
                style={{ cursor: "pointer" }}
              >
                <div className="card">
                  <h4>{pokemon.pokemonName || "N/A"}</h4>
                  <img
                    src={pokemon.image || "https://via.placeholder.com/200"}
                    alt={pokemon.pokemonName || "Pokemon"}
                    className="img-fluid"
                  />
                  <p>Type: {pokemon.type || "N/A"}</p>
                  <p>Generation: {pokemon.generation || "N/A"}</p>
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
}

export default App;
