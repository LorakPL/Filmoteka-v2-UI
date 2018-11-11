import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  title = 'Logowanie';
  button = 'Zaloguj';
  link = 'Rejestracja';
  hide = true;
  constructor() { }

  ngOnInit() {
  }

  changeState() {
    if (this.hide) {
      this.hide = false;
      this.title = 'Rejestracja';
      this.button = 'Zarejestruj';
      this.link = 'Logowanie';
    } else {
      this.hide = true;
      this.title = 'Logowanie';
      this.button = 'Zaloguj';
      this.link = 'Rejestracja';
    }
  }

}
