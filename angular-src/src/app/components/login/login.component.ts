import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService){}

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }
    this.authService.autheticateUser(user).subscribe( data=>{
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.toastr.success("You are logged in")
        this.router.navigate(['/dashboard'])
      }else{
        this.toastr.error(data.msg)
        this.router.navigate(['/login'])
      }
    })
  }
}
