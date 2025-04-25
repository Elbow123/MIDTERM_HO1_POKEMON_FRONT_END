using System;
using System.Data.OleDb;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using POKEMON_REVISITED.Models;

public class PokedexContext
{
    private readonly string _connectionString;

    public PokedexContext(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("PokedexDB");
    }

    public List<Pokemon> GetPokemons()
    {
        var pokemons = new List<Pokemon>();

        using (OleDbConnection conn = new OleDbConnection(_connectionString))
        {
            conn.Open();

            using (OleDbCommand cmd = new OleDbCommand("SELECT * FROM Pokemons", conn))
            {
                using (OleDbDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        pokemons.Add(new Pokemon
                        {
                            PokemonID = reader.IsDBNull(0) ? 0 : SafeGetInt32(reader, 0),
                            PokemonName = reader.IsDBNull(1) ? string.Empty : SafeGetString(reader, 1),
                            BaseEvolution = reader.IsDBNull(2) ? string.Empty : SafeGetString(reader, 2),
                            NextEvolution = reader.IsDBNull(3) ? string.Empty : SafeGetString(reader, 3),
                            Weight = reader.IsDBNull(4) ? string.Empty : SafeGetString(reader, 4),
                            Height = reader.IsDBNull(5) ? string.Empty : SafeGetString(reader, 5),
                            Generation = reader.IsDBNull(6) ? 0 : SafeGetInt32(reader, 6),
                            Type = reader.IsDBNull(7) ? string.Empty : SafeGetString(reader, 7),
                            Image = reader.IsDBNull(8) ? string.Empty : SafeGetString(reader, 8)
                        });
                    }
                }
            }
        }

        return pokemons;
    }

    private int SafeGetInt32(OleDbDataReader reader, int index)
    {
        try
        {
            if (reader.IsDBNull(index))
                return 0;

            if (int.TryParse(reader.GetValue(index).ToString(), out int result))
                return result;

            return 0;
        }
        catch (Exception)
        {
            return 0;
        }
    }

    private string SafeGetString(OleDbDataReader reader, int index)
    {
        try
        {
            return reader.IsDBNull(index) ? string.Empty : reader.GetString(index);
        }
        catch (InvalidCastException)
        {
            return string.Empty;
        }
    }
}
