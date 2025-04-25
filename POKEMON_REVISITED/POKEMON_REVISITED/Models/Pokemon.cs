namespace POKEMON_REVISITED.Models
{
    public class Pokemon
    {
        public int PokemonID { get; set; }
        public string PokemonName { get; set; }
        public string BaseEvolution { get; set; }
        public string NextEvolution { get; set; }
        public string Weight { get; set; }
        public string Height { get; set; }
        public int Generation { get; set; }
        public string Type { get; set; }
        public string Image { get; set; }
    }
}
