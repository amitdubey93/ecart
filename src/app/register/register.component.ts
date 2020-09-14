import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router, private authservice: AuthService) {
    console.log("register body", this.userForm);
  }
  ngOnInit() {}
  userForm = new FormGroup({
    fullName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    repeatPassword: new FormControl("", [Validators.required, this.passwordsMatch]),
  });
  passwordsMatch(control: FormControl){
    const password = control.root.get('password');
    return password && control.value !== password.value?
    {
      passwordsMatch:true
    }:null;
  }
  register() {
    const user = this.userForm.getRawValue();
    //console.log(user);
    this.authservice
      .register(user)
      .subscribe((user) => this.router.navigate(["/login"]));
    //this.authservice.register(user).subscribe(user=>console.log("from reg comp",user))
    //window.alert("from reg comp");
  }
  get fullName(){
    return this.userForm.get('fullName');
  }
  get email(){
    return this.userForm.get('email');
  }
  get password(){
    return this.userForm.get('password');
  }
  get repeatPassword(){
    return this.userForm.get('repeatPassword');
  }
}
