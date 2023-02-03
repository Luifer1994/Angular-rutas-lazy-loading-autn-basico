import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  termine: string = '';
  heroes: Heroe[] = [];
  heroeSelected: Heroe | undefined;

  constructor(private heroeService: HeroesService) { }

  ngOnInit(): void {
  }

  searching() {
    this.heroeService.getSuggestions(this.termine.trim()).subscribe(heroes => this.heroes = heroes);
  }

  heroSelected(event: MatAutocompleteSelectedEvent) {

    if (!event.option.value) {
      this.heroeSelected = undefined
      return;
    }

    const heroe: Heroe = event.option.value;
    this.termine = heroe.superhero;
    this.heroeService.getHeroeById(heroe.id!).subscribe(heroe => this.heroeSelected = heroe);
  }
}
