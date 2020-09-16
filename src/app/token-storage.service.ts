import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  setToken(token:string){
    if(!token){
      return;
    }
    
    this.removeToken();
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  getToken():string{
    return window.localStorage.getItem(TOKEN_KEY);
  }
  
  removeToken(){
    window.localStorage.removeItem(TOKEN_KEY);
  }
}
