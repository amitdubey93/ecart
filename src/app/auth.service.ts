import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, of, Subject, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { User } from './user';

export interface UserDTO{
  user:User,
  token:string
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  

  constructor(private httpClient:HttpClient,
     private tokenStorageService:TokenStorageService)  { }

  user$ = new Subject<User>();
  private apiUrl = '/api/auth';
  login(loginCredentials) {
    //const loginCredentials = {email,password};
    console.log("loginCredentials",loginCredentials);
    return this.httpClient.post<UserDTO>(`${this.apiUrl}/login`, loginCredentials).pipe
    (
      switchMap(({user, token})=>{
        this.setUser(user);
        this.tokenStorageService.setToken(token);
        console.log(`User found`,user);
        return of(user);
      }),
      catchError(e=>{
        console.log(`Login details could not be verified. Please try again. ${e.error.message}`,e);
        return throwError('Login details could not be verified. Please try again.');
      })
    );
  }
  get user(){
    return this.user$.asObservable();
  }
  findMe(){
    const token = this.tokenStorageService.getToken();
    if(!token){
      return EMPTY;
    }
    return this.httpClient.get<UserDTO>(`${this.apiUrl}/findme`).pipe
    (
      switchMap(({user,token})=>{
        this.setUser(user);
        this.tokenStorageService.setToken(token);
        console.log(`User found on app load`,user);
        return of(user)
      }),
      catchError(e=>{
        console.log(`server error occured. ${e.message}`,e);
        return throwError('Registration Failed. Please contact to admin');
      })
    );
  }
  logout(){
    //remove the user from the subject
    this.setUser(null);
    this.tokenStorageService.removeToken();
    console.log('user logged out');
    return;
  }
  register(userToSave: any) {
    
    console.log("from auth",userToSave);
    return this.httpClient.post<UserDTO>(`${this.apiUrl}/register`, userToSave).pipe
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
