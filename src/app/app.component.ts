import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'ecart';
  user:User;
  userSubcription:Subscription;
  // public isLoggedIn: boolean = JSON.parse(localStorage.getItem('loggedIn'));
  constructor(private router:Router, private authservice:AuthService) { 
    this.authservice.findMe().subscribe(user=>{
      this.user = user;
    });
    this.authservice.user.subscribe(user=>{
      this.user = user;
    });
  }
  logout(){
    this.authservice.logout();
    this.router.navigate(['/products']);
  }
  ngOnDestroy(): void{
    if(this.userSubcription){
      this.userSubcription.unsubscribe();
    }
    
  }
}
