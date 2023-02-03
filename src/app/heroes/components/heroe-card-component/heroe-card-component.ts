import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-card-component',
  templateUrl: './heroe-card-component.html',
  styleUrls: ['./heroe-card-component.css']
})
export class HeroeCardComponent {
  @Input() heroe!: Heroe
}
