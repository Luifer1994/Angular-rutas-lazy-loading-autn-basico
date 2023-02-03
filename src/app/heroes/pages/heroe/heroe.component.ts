import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, timeout } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  `
    img {
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(private activatedRaute: ActivatedRoute, private heroeService: HeroesService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.activatedRaute.params.pipe(
        switchMap(({ id }) => this.heroeService.getHeroeById(id))
      ).subscribe(heroe => this.heroe = heroe);
    }
    , 1000);
  }

}
