import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  

  constructor(private httpClient:HttpClient) { }
  user$ = new Subject<User>();
  private apiUrl = '/api/auth';
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
    /* this.setUser(user);
    console.log("from auth",user);
    return of(user); */
    console.log("from auth",user);
    return this.httpClient.post(`${this.apiUrl}/register`, user).pipe
    (
      switchMap(savedUser=>{
        this.setUser(savedUser);
        console.log(`User registered successfully`,savedUser);
        return of(savedUser)
      }),
      catchError(e=>{
        console.log(`server error occured`,e);
        return throwError('Registration Failed. Please contact to admin');
      })
    );
  }

  private setUser(user){
    this.user$.next(user);
  }
}
