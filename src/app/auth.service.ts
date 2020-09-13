import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  

  constructor() { }
  user$ = new Subject<User>();
  login(email: string, password: string) {
    const loginCredentials = {email,password};
    console.log(loginCredentials);
    return of(loginCredentials);
  }
  get user(){
    return this.user$.asObservable();
  }
  logout(){
    //remove the user from the subject
    this.setUser(null);
    console.log('user logged out');
    return;
  }
  register(user: any) {
    //make api call to save user in db
    //update the user subject
    this.setUser(user);
    console.log("from auth",user);
    return of(user);
  }

  private setUser(user){
    this.user$.next(user);
  }
}
