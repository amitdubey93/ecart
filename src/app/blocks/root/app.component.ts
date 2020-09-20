import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/model/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'ecart';
  user: Observable<User>;
  userSubcription: Subscription;

  constructor(private router: Router, private authservice: AuthService) { }
  ngOnInit(): void {
    this.user = this.authservice.user;
    this.userSubcription = this.authservice
      .findMe()
      .subscribe(user => (this.user = user));
  }
  logout() {
    this.authservice.logout();
    this.router.navigate(['/products']);
  }
  ngOnDestroy(): void {
    if (this.userSubcription) {
      this.userSubcription.unsubscribe();
    }

  }
}
