import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { LogService } from './core/log.service';
import { TokenStorageService } from './token-storage.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  

  constructor(private httpClient:HttpClient,
     private tokenStorageService:TokenStorageService,
      private logService:LogService)  { }
  user$ = new Subject<User>();
  private apiUrl = '/api/auth';
  login(loginCredentials) {
    //const loginCredentials = {email,password};
    console.log("loginCredentials",loginCredentials);
    return this.httpClient.post(`${this.apiUrl}/login`, loginCredentials).pipe
    (
      switchMap(foundUser=>{
        this.setUser(foundUser);
          console.log(`User found`,foundUser);
          return of(foundUser);
      }),
      catchError(e=>{
        this.logService.log(`Login details could not be verified. Please try again. ${e.error.message}`,e);
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
  register(userToSave: any) {
    //make api call to save user in db
    //update the user subject
    /* this.setUser(user);
    console.log("from auth",user);
    return of(user); */
    console.log("from auth",userToSave);
    return this.httpClient.post<any>(`${this.apiUrl}/register`, userToSave).pipe
    (
      switchMap(({user,token})=>{
        this.setUser(user);
        this.tokenStorageService.setToken(token);
        console.log(`User registered successfully`,user);
        return of(user)
      }),
      catchError(e=>{
        console.log(`server error occured`,e.error);
        return throwError('Registration Failed. Please contact to admin');
      })
    );
  }

  private setUser(user){
    this.user$.next(user);
  }
}
