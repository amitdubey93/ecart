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
  login(loginCredentials) {
    //const loginCredentials = {email,password};
    console.log("loginCredentials",loginCredentials);
    return this.httpClient.post(`${this.apiUrl}/login`, loginCredentials).pipe
    (
      switchMap(foundUser=>{
        if(foundUser == null)
        {
          return throwError('User not found. Please try again.');
        }
        //return of(foundUser);
        
        else{
          this.setUser(foundUser);
          console.log(`User found`,foundUser);
          return of(foundUser);
        }
      }),
      catchError(e=>{
        console.log(`Login details could not be verified. Please try again.`,e);
        return throwError('Login details could not be verified. Please try again.');
      })
    );
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
