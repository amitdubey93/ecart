import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router, private authservice:AuthService) { 
    console.log("register body",this.userForm)
  }
  ngOnInit() {
  }
  userForm = new FormGroup({
    fullName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
 });
  register(){
    const user = this.userForm.getRawValue();
    //console.log(user);
    this.authservice.register(user).subscribe(user=>this.router.navigate(['/products']))
    //this.authservice.register(user).subscribe(user=>console.log("from reg comp",user))
    //window.alert("from reg comp");
}
}
