import { Component, OnInit } from '@angular/core';
import { PokemonsService } from '../pokemons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pokemons: { name: string, url: string }[] = [];

  constructor(public pokemonsService: PokemonsService) {}

  ngOnInit(): void {
    this.pokemonsService.pokemonDetailsSubject.subscribe((pokemonList: any[]) => {
      this.pokemons = [];
      pokemonList.forEach(pokemon => {
        this.pokemons.push({ name: pokemon.name, url: pokemon.sprites.front_default });
      });
    });
    this.pokemonsService.fetchPokemonData();
  }
  
  fetchNextPokemons(): void {
    this.pokemonsService.fetchNextPokemons();
  }

  fetchPreviousPokemons(): void {
    this.pokemonsService.fetchPreviousPokemons();
  }

}
