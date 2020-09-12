import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router, private authservice:AuthService) { }
  ngOnInit() {
  }
    myGroup = new FormGroup({
    fullName: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
 });
 onClickMe(){
  //console.log(this.myGroup.getRawValue());
  this.authservice.register(this.myGroup.getRawValue()).subscribe(s=>this.router.navigate(['/login']))
  // window.alert(s);
}
}
