import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  private apiUrl = "https://pokeapi.co/api/v2/pokemon";
  public nextUrl: string | null = null;
  public previousUrl: string | null = null;
  pokemonDetailsSubject = new Subject<any>();
  
  constructor(private httpClient: HttpClient) { }

  fetchPokemonData(url?: string): void {
    const apiUrl = url || this.apiUrl;
    this.httpClient.get(apiUrl).subscribe((response: any) => {
      this.nextUrl = response.next;
      this.previousUrl = response.previous;
      const pokemonList = response.results;
      const pokemonDetailsList: { name: any; sprites: { front_default: any; }; }[] = [];
      pokemonList.forEach((pokemon: any) => {
        this.httpClient.get(pokemon.url).subscribe((pokemonResponse: any) => {
          const pokemonDetails = {
            name: pokemonResponse.name,
            sprites: { front_default: pokemonResponse.sprites.front_default }
          };
          pokemonDetailsList.push(pokemonDetails);
          if (pokemonDetailsList.length === pokemonList.length) {
            this.pokemonDetailsSubject.next(pokemonDetailsList);
          }
        });
      });
    });
  }
  
  

  fetchNextPokemons(): void {
    if (this.nextUrl) {
      this.fetchPokemonData(this.nextUrl);
    }
  }

  fetchPreviousPokemons(): void {
    if (this.previousUrl) {
      this.fetchPokemonData(this.previousUrl);
    }
  }
}
