import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  

  constructor() { }
  user = new Subject<User>();
  login(email: string, password: string) {
    const loginCredentials = {email,password};
    console.log(loginCredentials);
    return of(loginCredentials);
  }
  register(user: any) {
    this.user.next(user);
    console.log("from auth",user);
    return of(user);
  }
}
