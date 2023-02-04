import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private route: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login().subscribe(resp => {
      if (resp.id) {
        this.route.navigate(['/heroes'])
      } else {
        this.route.navigate(['/auth'])
      }
    })
  }

}
