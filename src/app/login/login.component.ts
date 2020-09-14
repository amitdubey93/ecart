import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  error:string;
  constructor(private router:Router, private authservice:AuthService) { }

  ngOnInit() {
  }

  userLoginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
 });

  login(){
    this.error = "";
    console.log("getRawValue",this.userLoginForm.value);
    this.authservice.login(this.userLoginForm.value).subscribe(
      s=>this.router.navigate(['/products']),
      e=> (this.error = e)
    );
    // window.alert(s);
  }
}
