import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
      img{
        width: 100%;
        border-radius: 5px;
      }
    `
  ]
})
export class AddComponent implements OnInit {

  publushers = [
    {
      id: "DC Comics",
      description: "DC - Comics"
    },
    {
      id: "Marvel Comics",
      description: "Marvel - Comics"
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alterEgo: '',
    characters: '',
    firstAppearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }
  constructor(private heroeService: HeroesService, private activateRoute: ActivatedRoute, private router: Router, private notify: MatSnackBar, private confirm: MatDialog) { }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;
    }
    this.activateRoute.params.pipe(
      switchMap(({ id }) => this.heroeService.getHeroeById(id))
    ).subscribe(heroe => this.heroe = heroe);
  }

  store() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id) {
      this.heroeService.updateHeroe(this.heroe).subscribe(heroe => this.notifyMessage('Heroe updated successfully'));
    } else {
      this.heroeService.addHeroe(this.heroe).subscribe(heroe => {
        this.notifyMessage('Heroe added successfully');
        this.router.navigate(['/heroes/edit', heroe.id]);
      });
    }
  }

  delete() {

    const confirm = this.confirm.open(ConfirmComponent, {
      width: '250px',
      data: { ...this.heroe }
    });

    confirm.afterClosed().subscribe(result => {
      if (result) {
        this.heroeService.deleteHeroe(this.heroe.id!).subscribe(resp => {
          this.notifyMessage('Heroe deleted successfully');
          this.router.navigate(['/heroes']);
        });
      }
    });
  }

  notifyMessage(message: string) {
    this.notify.open(message, 'Ok', {
      duration: 2500
    });
  }



}
