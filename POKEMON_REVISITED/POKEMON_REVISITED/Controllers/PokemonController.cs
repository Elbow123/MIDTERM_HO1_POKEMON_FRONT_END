using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using POKEMON_REVISITED.Models;

[Route("api/[controller]")]
[ApiController]
public class PokemonController : ControllerBase
{
    private readonly PokedexContext _context;

    public PokemonController(PokedexContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Pokemon>> GetPokemons()
    {
        var pokemons = _context.GetPokemons();
        return Ok(pokemons);
    }
}