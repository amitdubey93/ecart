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
  constructor(private router:Router, private authservice:AuthService) { }

  ngOnInit() {
  }

  myGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
 });

  onClickMe(){
    console.log(this.myGroup.getRawValue());
    this.authservice.login(this.myGroup.get('email').value, this.myGroup.get('password').value).subscribe(s=>this.router.navigate(['/products']))
    // window.alert(s);
  }
}
