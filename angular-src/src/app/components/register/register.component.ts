import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  name!: string;
  username!: string;
  email!: string;
  password!: string;

  constructor(private validateService: ValidateService, private toastr: ToastrService){}

  ngOnInit(): void {
    
  }

  onRegisterSubmit(){
   const user = {
    name : this.name,
    email : this.email,
    username : this.username,
    password: this.password
   }
   if(!this.validateService.validateRegister(user)){
      this.toastr.error("fill all the fields")
      return false;
   }
   if(!this.validateService.validateEmail(user.email)){
    this.toastr.error("use a valid email")
    return false;
  }
  this.toastr.success("The user is registered")
  return true;
 }
}
