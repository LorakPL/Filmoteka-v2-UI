import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }


  register(user: User) {
    return this.http.post(`http://localhost:8080/filmoteka/users/sign-up`, user);
  }

}
